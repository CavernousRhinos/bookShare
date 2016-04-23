var helpers = require('./helpers.js');
var passport = require('passport');
var userController = require('../controllers/userController.js');
var bookController = require('../controllers/bookController.js');
// var facebook = require('../config/facebook.js');

module.exports = function (app, express) {
  /*User Routes*/
  app.post('/api/signUp', userController.addUser);
  app.post('/api/signIn', userController.signIn);

  //TODO: set up routes for viewing friendBooks
  /*Facebook Login Routes*/
  // Redirect the user to Facebook for authentication.  When complete,
  // Facebook will redirect the user back to the application at
  //     /auth/facebook/callback
  app.get('/login/facebook', passport.authenticate('facebook', {scope: 'email'}) );

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/#/signIn' }));

  app.use(helpers.decode);

  /*Friend Routes*/
  app.post('/api/friendRequests', userController.addFriend);
  app.get('/api/friends', userController.viewAllFriends);
  app.get('/api/user/:id', userController.getUser);
  app.get('/api/findFriends/:query', userController.findFriends);
  app.get('/api/friendRequests', userController.getFriendRequests);
  app.post('/api/acceptFriendRequest', userController.acceptFriendRequest);
  app.post('/api/deleteFriendRequest', userController.deleteFriendRequest);

  /*Book Routes*/
  app.get('/api/friends/:id/books', bookController.viewFriendBooks);
  app.post('/api/books', bookController.addBook);
  app.get('/api/books', bookController.viewMyShelf);
  app.delete('/api/books/:id', bookController.deleteBook);
  app.get('/api/friendsBooks/:id', bookController.viewFriendBook);

  app.post('/api/bookRequest', bookController.makeBookRequest);
  app.post('/api/deleteBookRequest', bookController.deleteBookRequest);
  app.post('/api/acceptBookRequest', bookController.acceptBookRequest);
  app.get('/api/myBookRequests', bookController.getRequestedBooksToFriends);
  app.get('/api/myRequestedBooks', bookController.getRequestedBooksToMe);
  app.get('/api/lentBooks', bookController.getLentBooks);
  app.get('/api/borrowedBooks', bookController.getBorrowedBooks);
  app.get('/api/getAllBooksFromFriends', bookController.getAllBooksFromFriends);
  app.post('/api/tradeRequests', bookController.makeTradeRequest);
  app.post('/api/deleteTradeRequest', bookController.deleteTradeRequest);
  app.post('/api/acceptTradeRequest', bookController.acceptTradeRequest);
  app.post('/api/completeTradeRequest', bookController.completeTradeRequest); 
  app.post('/api/viewFriendBooks', bookController.viewFriendBooks);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};
