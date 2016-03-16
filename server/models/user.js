'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING
  }, {
    classMethods: {
      signIn: function(){}, //TODO
      logout: function(){}, //TODO
      addFriend: function(){}, //TODO
      viewAllFriends: function(){}, //TODO
      viewFriend: function(){}, //TODO
      associate: function(models){
        User.belongsToMany(models.Book, {through: 'UserBook',  foreignKey: 'User_bookId'});
      }
    }
  });
  return User;
};


//TODO: add validations

