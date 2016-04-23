var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var keys = require('../keys');

module.exports = function(app){
  passport.use(new Strategy({
    clientID: keys.APP_ID,
    clientSecret: keys.APP_SECRET,
    callbackURL: 'http://localhost:5000/auth/facebook/callback'
  },
  function(accessToken, refresh, profile, cb){
    //check if email and displayName don't exist
      //if not, create new user
      //then check friendList, if friends are not in our database
        //save new friends and create friendRequest for new friends
    console.log(profile);

    // TODO: continue from here
    
    return cb(null, profile);
  }));
  // passport.serializeUser(function(user, cb){
  //   cb(null, user.id);
  // });
  // passport.deserializeUser(function(obj, cb){
  //   cb(null, obj);
  // });
  
};