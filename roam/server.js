var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var apoc = require('apoc');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var request = require('request');
var saltRounds = 10;
var yelp = require('./App/Utils/api');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var gmailKeys = require('./App/Utils/apiKeys').gmailKeys;

var smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL 
  auth: {
    user: 'roamincenterprises@gmail.com',
    pass: 'roamroam'
  }
};

var transporter = nodemailer.createTransport(smtpConfig);

const offsetToDegrees = 0.02;

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send('Hello World!');
});

app.post('/signup', function(req, res){
  var data = req.body;

  //Check database to see if incoming email on signup already exists
  apoc.query('MATCH (n:User {email: "%email%"}) RETURN n', { email: data.email }).exec().then(function(queryRes) {
    //If there is no matching email in the database
    if (queryRes[0].data.length === 0) {
      //Hash password upon creation of account
      bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) {
          console.log('Error generating salt', err);
        }
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          if (err) {
            console.log('Error hashing password', err);
          }
          data.password = hash;
          apoc.query('CREATE (newUser:User {firstName: "%firstName%", lastName: "%lastName%", password: "%password%", email: "%email%"});', data).exec().then(
            function(dbRes){
              console.log('saved to database:', dbRes);
              res.send(JSON.stringify({message: 'User created'}));
            },
            function(fail){
              console.log('issues saving to database:', fail);
            }
          );
        });
      }); //close genssalt
    } else {
      res.send(JSON.stringify({message: 'Email already exists!'}));
    }
  }); //closing 'then'
}); //close post request

app.post('/signin', function(req, res){
  var data = req.body;
  apoc.query('MATCH (n:User {email: "%email%"}) RETURN n.password', {email: data.email}).exec().then(function(queryRes){
    if(queryRes[0].data.length === 0) {
      res.send(JSON.stringify({message: 'Incorrect email/password combination!'}));
    } else {
      console.log(queryRes[0].data[0].row[0]);
      bcrypt.compare(data.password, queryRes[0].data[0].row[0], function(err, bcryptRes){
       if(err){
        console.log('error in comparing password:', err);
       }
        if(bcryptRes){
          res.send(JSON.stringify({message: 'Password Match'}));
        } else {
          res.send(JSON.stringify({message: 'Incorrect email/password combination!'}));
        }
      });
    }
  });
});


app.post('/roam', function(req, res) {

	var dateMS = Date.now();
	var	userLatitude = Number(req.body.coordinates.coords.latitude);
	var	userLongitude = Number(req.body.coordinates.coords.longitude);
	var userEmail = req.body.userEmail;
	var startRoam = Number(req.body.coordinates.timestamp);
	var roamOffAfter = Number(startRoam);
	
	if(req.body.time === '1 hour') {
		roamOffAfter += 	3600000;
	}
	if(req.body.time === '2 hours') {
		roamOffAfter += 	7200000;
	}
	if(req.body.time === '4 hours') {
		roamOffAfter += 	14400000;
	}
	if(req.body.time === 'Anytime today') {
		var today = new Date();
		var millisecondsUntilMidnight = (24 - today.getHours()) * 3600000;
		roamOffAfter += 	millisecondsUntilMidnight;
	}

	//query based on time
  var maxLat = userLatitude + offsetToDegrees;
  var minLat = userLatitude - offsetToDegrees;
  var maxLong = userLongitude + offsetToDegrees;
  var minLong = userLongitude - offsetToDegrees;

  console.log(maxLat, minLat, maxLong, minLong);

	apoc.query('MATCH (n:Roam) WHERE n.creatorRoamEnd > %currentDate%  AND n.status = "Pending" AND n.creatorLatitude < %maxLat% AND n.creatorLatitude > %minLat% AND n.creatorLongitude < %maxLong% AND n.creatorLongitude > %minLong% RETURN n', {currentDate:dateMS, maxLat: maxLat, minLat: minLat, maxLong: maxLong, minLong: minLong}).exec().then(function(matchResults) {
    if(matchResults[0].data.length === 0) {
    //if no match found create a pending roam node
      var searchParams = {
        term: 'Bars',
        limit: 20,
        sort: 0,
        radius_filter: 3200, //2-mile radius
        bounds: maxLat + ',' + minLong + '|' +  minLat  + ',' + maxLong
      };      

      yelp.searchYelp(searchParams, function(venue) {
        
        var venueName = venue.name;
        var venueAddress = venue.location.display_address.join(' ');

        apoc.query('CREATE (m:Roam {creatorEmail: "%userEmail%", creatorLatitude: %userLatitude%, creatorLongitude: %userLongitude%, creatorRoamStart: %startRoam%, creatorRoamEnd: %roamOffAfter%, status: "Pending", venueName: "%venueName%", venueAddress: "%venueAddress%"})', { email: userEmail, userEmail: userEmail, userLatitude: userLatitude, userLongitude: userLongitude,
      startRoam: startRoam, roamOffAfter: roamOffAfter, venueName: venueName, venueAddress: venueAddress }).exec().then(function(queryRes) {

          // return as response "Matched"
          apoc.query('MATCH (n:User {email:"%email%"}), (m:Roam {creatorEmail: "%creatorEmail%", creatorRoamStart: %roamStart%}) CREATE (n)-[:CREATED]->(m)', {email:userEmail, creatorEmail: userEmail, roamStart: startRoam} ).exec().then(function(relationshipRes) {
             console.log('Relationship created', relationshipRes); 
          });
        });
      });
		} else {
      console.log('Found a match', matchResults[0].data[0].meta[0].id);

      var id = matchResults[0].data[0].meta[0].id;
      apoc.query('MATCH (n:User {email:"%email%"}), (m:Roam) WHERE id(m) = %id% SET m.status="Active" CREATE (n)-[:CREATED]->(m) RETURN m', {email:userEmail, id:id} ).exec().then(function(roamRes) {
           console.log('Relationship created b/w Users created', roamRes[0].data[0].row[0]);
           var roamInfo = roamRes[0].data[0].row[0];

          var date = new Date();
          var hour = Number(date.getHours());
          var minute = date.getMinutes();
          var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDay(), (hour + 1), minute);

        var mailOptions = {
          from: '"Roam" <Roamincenterprises@gmail.com>', // sender address 
          to: 'kentqlee@gmail.com', // list of receivers 
          bcc: roamInfo.creatorEmail + ',' + userEmail,
          subject: 'Your Roam is Ready!', // Subject line 
          text: 'Your Roam is at:' + roamInfo.venueName + ' Roam Address: ' + roamInfo.venueAddress, // plaintext body 
          html: '<div><h3>Your Roam is at: ' + roamInfo.venueName + '</h3></div><div><h3>Roam Address: ' + roamInfo.venueAddress + '</h3></div><div>Please arrive at the venue by ' + newDate // html body 
        };
         
        // send mail with defined transport object 
        transporter.sendMail(mailOptions, function(error, info){
          if(error){
            return console.log(error);
          }
          console.log('Message sent: ' + info.response);
        });

           res.send("You have been matched"); 
        })
    }
	});
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});
