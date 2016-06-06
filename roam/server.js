var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var apoc = require('apoc');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var yelp = require('./App/Utils/api');
var nodemailer = require('nodemailer');
var gmailKeys = require('./App/Utils/apiKeys').gmailKeys;
var formattedDateHtml = require('./App/Utils/dateFormatter');
var generateEmail = require('./App/Utils/emailGenerator');
var boundingBoxGenerator = require('./App/Utils/boundingBoxGenerator');
var roamOffGenerator = require('./App/Utils/roamOffGenerator');
var saltRounds = 10;


//config for email SMTP for gmail. We are send email notifications to users
var smtpConfig = { 
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL 
  auth: {
    user: 'roamincenterprises@gmail.com',
    pass: 'roamroam'
  }
};

//transport vehicle for nodemailer to send out email
var transporter = nodemailer.createTransport(smtpConfig); 

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

  var userEmail = req.body.userEmail;
  
  var coords = boundingBoxGenerator(req); //bounding box coordinates
  var times = roamOffGenerator(req); //time until roam ends

	apoc.query('MATCH (n:Roam) WHERE n.creatorRoamEnd > %currentDate%  AND n.status = "Pending" AND n.creatorLatitude < %maxLat% AND n.creatorLatitude > %minLat% AND n.creatorLongitude < %maxLong% AND n.creatorLongitude > %minLong% AND n.creatorEmail <> "%userEmail%" RETURN n', {currentDate:dateMS, maxLat: coords.maxLat, minLat: coords.minLat, maxLong: coords.maxLong, minLong: coords.minLong, userEmail: userEmail}).exec().then(function(matchResults) {
    if(matchResults[0].data.length === 0) {
    //if no match found create a pending roam node
    console.log('nomatch');
      var searchParams = {
        term: 'Bars',
        limit: 20,
        sort: 0,
        radius_filter: 3200, //2-mile radius
        bounds: coords.maxLat + ',' + coords.minLong + '|' +  coords.minLat  + ',' + coords.maxLong
      };      

      yelp.searchYelp(searchParams, function(venue) {
        
        var venueName = venue.name;
        var venueAddress = venue.location.display_address.join(' ');

        apoc.query('CREATE (m:Roam {creatorEmail: "%userEmail%", creatorLatitude: %userLatitude%, creatorLongitude: %userLongitude%, creatorRoamStart: %startRoam%, creatorRoamEnd: %roamOffAfter%, status: "Pending", venueName: "%venueName%", venueAddress: "%venueAddress%"})', { email: userEmail, userEmail: userEmail, userLatitude: coords.userLatitude, userLongitude: coords.userLongitude,
      startRoam: times.startRoam, roamOffAfter: times.roamOffAfter, venueName: venueName, venueAddress: venueAddress }).exec().then(function(queryRes) {

          // return as response "Matched"
          apoc.query('MATCH (n:User {email:"%email%"}), (m:Roam {creatorEmail: "%creatorEmail%", creatorRoamStart: %roamStart%}) CREATE (n)-[:CREATED]->(m)', {email:userEmail, creatorEmail: userEmail, roamStart: times.startRoam} ).exec().then(function(relationshipRes) {
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

          var date = formattedDateHtml();

	        var mailOptions = {
	          from: '"Roam" <Roamincenterprises@gmail.com>', // sender address 
	          // to: 'kentqlee@gmail.com', // list of receivers 
	          bcc: roamInfo.creatorEmail + ',' + userEmail,
	          subject: 'Your Roam is Ready!', // Subject line 
	          text: 'Your Roam is at:' + roamInfo.venueName + ' Roam Address: ' + roamInfo.venueAddress, // plaintext body 
	          html: generateEmail(roamInfo.venueName, roamInfo.venueAddress, date)// html body 
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

app.post('/cancel', function(req, res){
  var userEmail = req.body.userEmail;
  console.log('useremail is:', userEmail)
  apoc.query('MATCH (m:Roam {creatorEmail: "%userEmail%"}) WHERE m.status="Pending" SET m.status="Canceled" RETURN m', {userEmail: userEmail}).exec().then(function(cancelRes){

  	console.log('Roam canceled:', cancelRes[0].data[0].row[0]);

    var roamInfo = cancelRes[0].data[0].row[0];

    var mailOptions = {
      from: '"Roam" <Roamincenterprises@gmail.com>', // sender address 
      bcc: roamInfo.creatorEmail + ',' + userEmail,
      subject: 'Your Roam has been canceled!', // Subject line 
      text: 'Your Roam at:' + roamInfo.venueName + ' Roam Address: ' + roamInfo.venueAddress + ' has been canceled.', // plaintext body 
      html: '<div><h3>Roam Venue: <br>' + roamInfo.venueName + '</h3></div><div><h3>Roam Address: ' + roamInfo.venueAddress + ' has been canceled.</h3></div>' // html body 
    };
     
    // send mail with defined transport object 
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });

    res.send("Your Roam has been canceled"); 
  });
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});
