var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var apoc = require('apoc');

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('Hello World!');
});

app.post('/', function(req, res){
  console.log('I got it!');
  console.log(req.body);

  // var query = 'CREATE (newUser:User {email: "'.concat(req.body.email).concat('", firstName: "').concat(req.body.firstName).concat('", lastName: "').concat(req.body.lastName).concat('", password: "').concat(req.body.password).concat('"});');

  // console.log(query);
  
  apoc.query('CREATE (newUser:User {firstName: "%firstName%", lastName: "%lastName%", password: "%password%", email: "%email%"});', req.body).exec().then(
    function(res){
    	console.log('saved to database:', res);
		  res.send('Nice bro');
    },
    function(fail){
    	console.log('issues saving to database:', fail);
    }
  );
});

app.listen(3000, function(){
	console.log('Example app listening on port 3000!');
});