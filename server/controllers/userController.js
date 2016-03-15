var User = require('../models/user.js');
var helper = require('../config/helpers.js');


module.exports.addUser =function(req, res){
  console.log('in ctrl: addUser');
  User.create(req.body, {fields: ['name', 'email', 'password']})
  .then(function(user) {
    // TODO: error handling
    // if(err) {
    //   return res.status(500).json(err);
    // }
    var token = helper.encode(data);
    res.status(201).json({token: token});
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
// TODO
};

module.exports.viewAllFriends= function(req, res){
// TODO
};

module.exports.viewFriend= function(req, res){
// TODO
};

