var models = require('../models');
var User = models.User;
var helper = require('../config/helpers.js');


module.exports.addUser =function(req, res){
  User.create(req.body, {fields: ['name', 'email', 'password']})
  .then(function(user) {
    var token = helper.encode(user);
    res.status(201).json({token: token});
  })
  .catch(function(err){
    return res.status(500).json(err);
  });
};

module.exports.signIn = function(req, res){
    User.signIn(req.body.email, req.body.password, function(err, data){

      if(err){
        return res.status(500).json(err);
      } else {
        var token = helper.encode(data);
        res.status(200).json({token: token});
      }
   });
};

module.exports.logout = function(req, res){
// TODO
};

module.exports.addFriend= function(req, res){
  // after-update hook for when friend request is accepted
// TODO
};

module.exports.viewAllFriends= function(req, res){
// TODO
};

module.exports.viewFriend= function(req, res){
// TODO
};

module.exports.deleteUser= function(req, res){
  User.destroy({where: {id: req.params.id}}).then(function() {
    res.status(204).end();
  }).catch(function(err) {
    res.status(500).json(err);
  });
};