// userController only handles users that sign up with email addresses/username
// TODO: possibly create fbController to handle ALL requests from fb login

var models = require('../models');
var User = models.User;
var FriendRequest = models.FriendRequest;
var Friends = models.Friends;
var helper = require('../config/helpers.js');
var bcrypt = require('bcrypt');
var _ = require('underscore');
var sequelize = require('sequelize');

//Sign In
module.exports.addUser = function(req, res){
  //TODO: check if user already exists
  User.create(req.body, {fields: ['username', 'email', 'password']})
  .then(function(user) {
    user.generateSalt();
    user.save()
    .then(function(){
      user.password = user.hashPassword(user.password);
      return user.save();
    }).then(function(){
      var token = helper.encode(user);
      res.status(201).json({token: token});
    }).catch(function(err) {res.status(500).json(err);});
  }).catch(function(err) {res.status(500).json({message: "User/Email already exists"});});
};

module.exports.facebookSignIn = function(req, res){
  // TODO: remove or move to fbController
};

module.exports.findFriends = function(req, res){
  models.sequelize.query('select f.friendId from Friends as f where f.userId = ?',
  { replacements: [req.currentUser.id.toString()], type: sequelize.QueryTypes.SELECT })
  .then(function (friends) {
    friends = friends.map(function(x) {return x.friendId;});
    friends.push(req.currentUser.id);
    User.findAll({where: {
      id: {
        $notIn: friends
      },
      $or: [
        {
          username: req.params.query
        },
        {
          email: req.params.query
        }
      ]
    }}).then(function(users){
      users = users.map(function(user) {
        return {
          id: user.id,
          name: user.username,
          email: user.email
        };
      });
      res.status(200).json(users);
    }).catch(function(err) {res.status(500).json(err);});
  }).catch(function(err) {res.status(500).json(err);});
};

module.exports.getFriendRequests = function(req, res) {
  models.sequelize.query('SELECT u.id, u.username, u.email, fr.accepted,\
  fr.id AS FriendRequestId FROM FriendRequests as fr INNER\
  JOIN Users AS u ON fr.userId = u.id WHERE fr.friendId = ?',
  { replacements: [req.currentUser.id.toString()], type: sequelize.QueryTypes.SELECT })
  .then(function (requests) {
    res.status(200).json(requests);
  }).catch(function(err) {res.status(500).json(err);});
};

module.exports.signIn = function(req, res){
  User.findOne({where: {$or: [{email: req.body.usernameOrEmail}, {username: req.body.usernameOrEmail}]}} )
    .then(function(user){
      if (!user){ res.status(400).json({message: "Invalid username of email"}); return;}
      user.comparePassword(req.body.password)
      .then(function(isMatch) {
        if(isMatch){
          var token = helper.encode(user);
          res.status(200).json({token: token, username: user.username} );
        } else{
          res.status(401).json({message: "Invaild password"}); return;
        }
      })
      .catch(function(err) {res.status(500).json(err);});
    })
    .catch(function(err) {res.status(500).json(err);});
};

module.exports.addFriend = function(req, res){
  User.findAll({where: {email: req.body.email}})
    .then(function(users){
      FriendRequest.findOrCreate({where: {userId: req.currentUser.id, friendId: users[0].id},
        defaults: {
          userId: req.currentUser.id,
          friendId: users[0].id,
          accepted: false
        }
      })
      .then(function (result) {
        if (result[1]){
          res.status(201).json({message: "Friend request sent!"});
        }
        res.status(400).json({message: "Friend request already exists"});
      }).catch(function(err) {res.status(500).json(err);});
    }).catch(function(err) {res.status(500).json(err);});
};

module.exports.acceptFriendRequest = function(req, res) {
  var id = req.body.id;
  FriendRequest.findById(id)
  .then(function (friendRequest) {
    //req.currentUser.addFriend()
    Friends.create({userId: friendRequest.userId, friendId: friendRequest.friendId})
    .then(function () {
      Friends.create({userId: friendRequest.friendId, friendId: friendRequest.userId})
      .then(function () {
        friendRequest.destroy()
        .then(function () {
          res.status(201).end();
        }).catch(function(err) {res.status(500).json(err);});
      }).catch(function(err) {res.status(500).json(err);});
    }).catch(function(err) {res.status(500).json(err);});
  }).catch(function(err) {res.status(500).json(err);});
};

module.exports.deleteFriendRequest = function(req, res) {
  var id = req.body.id;
  FriendRequest.findById(id)
  .then(function (friendrequest) {
    friendrequest.destroy()
    .then(function () {
      res.status(201).end();
    }).catch(function(err) {res.status(500).json(err);});
  }).catch(function(err) {res.status(500).json(err);});
}

module.exports.viewAllFriends = function(req, res){
  req.currentUser.getFriends().then(function(friends) {
    friends = friends.map(function(friend) {
      return {
        id: friend.id,
        name: friend.username,
        email: friend.email
      };
    });
    res.status(200).json(friends);
  }).catch(function(err) {res.status(500).json(err);});
};

module.exports.getUser = function(req, res){
  User.findById(req.params.id)
  .then(function(user) {
    res.status(200).json(user);
  })
  .catch(function(err) {res.status(500).json(err);});
};

//need to delete friend relationships
module.exports.deleteUser = function(req, res){
  User.destroy({where: {id: req.params.id}}).then(function() {
    res.status(204).end();
  }).catch(function(err) {res.status(500).json(err);});
};

