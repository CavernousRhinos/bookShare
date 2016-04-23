var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var keys = require('../keys');

module.exports = function(app){
  passport.use(new FacebookStrategy({
    clientID: keys.APP_ID,
    clientSecret: keys.APP_SECRET,
    callbackURL: 'http://localhost:5000/login/facebook/return'
  },
  // function(accessToken, refresh, profile, cb){
  //   //check if email and displayName don't exist
  //     //if not, create new user
  //     //then check friendList, if friends are not in our database
  //       //save new friends and create friendRequest for new friends
  //   console.log(profile);
  //   return cb(null, profile);
  // }));
  // passport.serializeUser(function(user, cb){
  //   cb(null, user);
  // });
  // passport.deserializeUser(function(obj, cb){
  //   cb(null, obj);
  // });
  function(accessToken, refreshToken, profile, done){
    User.findOrCreate(accessToken, refreshToken, profile, function(err, user){
      if(err) {return done(err)}
      done(null, user)  
    });
  }
};