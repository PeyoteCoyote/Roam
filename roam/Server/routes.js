var controller = require('./controller.js');

module.exports = function (app, express) {
  app.post('/signup', controller.signup);
  app.post('/signin', controller.signin);
  // app.post('/roam', );
  // app.post('/cancel', );
};