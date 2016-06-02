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

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      data.password = hash;
      apoc.query('CREATE (newUser:User {firstName: "%firstName%", lastName: "%lastName%", password: "%password%", email: "%email%"});', data).exec().then(
        function(res){
        	console.log('saved to database:', res);
    		  res.send('Nice bro');
        },
        function(fail){
        	console.log('issues saving to database:', fail);
        }
      );
    });
});


});

app.listen(3000, function(){
	console.log('Example app listening on port 3000!');
});