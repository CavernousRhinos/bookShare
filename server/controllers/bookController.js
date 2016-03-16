var models = require('../models');
var Book = models.Book;

module.exports.addBook= function(req, res){
  Book.create(req.body)
    //FIXME: security: whitelist attributes
    //TODO: look up sequel transaction to deal with the limbo period
  .then(function(book) {
    req.currentUser.addBook(book).then(function(){
      res.status(201).json(book);
    }).catch(function(err){
      return res.status(500).json(err);
    });
  })
  .catch(function(err){
    return res.status(500).json(err);
  });

};

module.exports.viewMyShelf= function(req, res){
// TODO
};

module.exports.viewFriendsBooks= function(req, res){
// TODO
};

module.exports.deleteBook= function(req, res){
// TODO
};
