var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var apoc = require('apoc');
var bcrypt = require('bcrypt');
var crypto = require('crypto');

var saltRounds = 10;

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('Hello World!');
});

app.post('/signup', function(req, res){
  console.log('I got it!');
  console.log(req.body);
  var data = req.body;

  //Check database to see if incoming email on signup already exists
  apoc.query('MATCH (n:User {email: "%email%"}) RETURN n', { email: data.email }).exec().then(function(queryRes) {
    console.log('RES in SERVER FILE:', queryRes[0].data.length);
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
  console.log('Signing in');

  var data = req.body;
  console.log(data);

  apoc.query('MATCH (n:User {email: "%email%"}) RETURN n.password', {email: data.email}).exec().then(function(queryRes){

      console.log(JSON.stringify(queryRes));
      if(queryRes[0].data.length === 0) {
        res.send(JSON.stringify({message: 'Incorrect email/password combination!'}));
      } else {
        console.log(queryRes[0].data[0].row[0]);
        bcrypt.compare(data.password, queryRes[0].data[0].row[0], function(err, bcryptRes){
         if(err){
          console.log('error in comparing password:', err);
         }
          console.log('response is:', bcryptRes);
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
	console.log('ROAM REQUEST POST>>>>>>>>>>>>>>>>', req.body);

	var dateMS = Date.now();
	var	userLatitude = req.body.coordinates.coords.latitude;
	var	userLongitude = req.body.coordinates.coords.longitude;
	var userEmail = req.body.userEmail;
	var startRoam = Number(req.body.coordinates.timestamp);
	var roamOffAfter = Number(startRoam);


	// console.log('ROAM REQUEST POST Location>>>>>>>>>>>>>>>>', userLocation);
	console.log('ROAM REQUEST POST Time >>>>>>>>>>>>>>>>', startRoam);
	console.log('ROAM REQUEST POST Email >>>>>>>>>>>>>>>>', userEmail);
	console.log('>>>>>>>>>>>>>>>>', typeof roamOffAfter);
	console.log('>>>>>>>>>>>>>>>>>>>>DATE', dateMS);
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

	function createGeoFence(lat, long, distInMiles) {
    
    var dist = distInMiles * 1.60934; //convert to km
    var R = 6371e3;

		var northLat = Math.asin( Math.sin(lat)*Math.cos(d/R) + Math.cos(lat)*Math.sin(dist/R)*Math.cos(0) );
		var northLong = long + Math.atan2(Math.sin(0)*Math.sin(dist/R)*Math.cos(lat), Math.cos(dist/R)-Math.sin(lat)*Math.sin(lat));

		var southLat = Math.asin( Math.sin(lat)*Math.cos(d/R) + Math.cos(lat)*Math.sin(dist/R)*Math.cos(180) );
		var southLong = long + Math.atan2(Math.sin(180)*Math.sin(dist/R)*Math.cos(lat), Math.cos(dist/R)-Math.sin(lat)*Math.sin(lat));

		var eastLat = Math.asin( Math.sin(lat)*Math.cos(d/R) + Math.cos(lat)*Math.sin(dist/R)*Math.cos(90) );
		var eastLong = long + Math.atan2(Math.sin(90)*Math.sin(dist/R)*Math.cos(lat), Math.cos(dist/R)-Math.sin(lat)*Math.sin(lat));

		var westLat = Math.asin( Math.sin(lat)*Math.cos(d/R) + Math.cos(lat)*Math.sin(dist/R)*Math.cos(270) );
		var westLong = long + Math.atan2(Math.sin(270)*Math.sin(dist/R)*Math.cos(lat), Math.cos(dist/R)-Math.sin(lat)*Math.sin(lat));

		return {
			nLat: northLat,
			nLong: northLong,
			sLat: southLat,
			sLong: southLong,
			eLat: eastLat,
			eLong: eastLong,
			wLat: westLat,
			wLong: westLong
		}

	}

	//query based on time
	apoc.query('MATCH (n:Roam) WHERE n.roamOffAfter > %currentDate% RETURN n', {currentDate:dateMS}).exec().then(function(matchResults) {
		console.log(">>>>>>>>>>>>>>>>ROAM MATCHES", matchResults);
		if(matchResults[0].data.length === 0) {//if find matches
			apoc.query('CREATE (n:Roam {creatorEmail: "%userEmail%", creatorLatitute: %userLatitude%, creatorLongitude: %userLongitude%, creatorRoamStart: "%startRoam%", creatorRoamEnd: %roamOffAfter%})', { userEmail: userEmail, userLatitude: userLatitude, userLongitude: userLongitude,
			startRoam: startRoam, roamOffAfter: roamOffAfter }).exec().then(function(queryRes) {
				//return as response "Matched"

			});
		}
	});


});

app.listen(3000, function(){
	console.log('Example app listening on port 3000!');
});
