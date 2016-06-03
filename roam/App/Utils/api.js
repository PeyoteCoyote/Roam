var Yelp = require('yelp');

let yelp = new Yelp({
  consumer_key: '',
  consumer_secret: '',
  token: '',
  token_secret: ''
});

let defaultParams = {
  term: 'Bars',
  limit: 10,
  sort: 0,
  radius_filter: 16000, //10-mile radius
  cll: {
    latitude: 37.78825,
    longitude: -122.4324,
  }
};

let apiUrl = '/';

yelp.searchYelp = (searchPreferences, response) => {
  fetch(apiUrl, defaultParams)
  .then((data) => {
    return data.json();
  })
  .then((jsonData) => {
    console.log(jsonData);
    response.send(jsonData);
  })
  .catch((error) => {
    console.log('Error:', error);
  });
};

module.exports = yelp;


//sample Yelp query stringify
  //https://api.yelp.com/v2/search?term=german+food&location=Hayes&cll=37.77493,-122.419415
//Minimal
  //https://api.yelp.com/v2/search?term=food&ll=37.788022,-122.399797
//With geo-bounding
  //https://api.yelp.com/v2/search?term=food&bounds=37.900000,-122.500000|37.788022,-122.399797&limit=3
