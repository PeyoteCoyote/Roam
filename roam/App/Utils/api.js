var Yelp = require('yelp');

let yelp = new Yelp({
  consumer_key: '',
  consumer_secret: '',
  token: '',
  token_secret: ''
});

let defaultParams = {
  location: 'San Francisco',
  term: '',
  limit: 20,
  sort: 0,
  radius_filter: 1600 //1-mile radius
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