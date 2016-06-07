var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(3000, function(){
  console.log('Roam listening on port 3000!');
});

module.exports = app;
