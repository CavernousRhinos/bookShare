var helpers = require('./helpers.js');
var userController = require('../controllers/userController.js');
var bookController = require('../controllers/bookController.js');

module.exports = function (app, express) {
  /*User Routes*/
  app.post('/api/signup', userController.addUser);
  app.post('/api/signIn', userController.signIn);
  app.post('/api/logout', userController.logout);

  /*Friend Routes?*/
  app.post('/api/friends', userController.addFriend);
  app.get('/api/friends', userController.viewAllFriends);
  app.get('api/friend/:id',userController.viewFriend);

  /*Book Routes*/
  app.post('/api/books', bookController.addBook);
  app.get('/api/books', bookController.viewMyShelf);
  app.get('/api/friends/books', bookController.viewFriendsBooks); //??
  app.delete('/api/books/:id', bookController.deleteBook);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};
