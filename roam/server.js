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

app.post('/', function(req, res){
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
              res.send('User created');
            },
            function(fail){
              console.log('issues saving to database:', fail);
            }
          );
        });
      }); //close genssalt
    } else {
      res.send('Email already exists!');
    }



  }); //closing 'then'


}); //close post request

app.listen(3000, function(){
	console.log('Example app listening on port 3000!');
});