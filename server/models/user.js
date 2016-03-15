'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING
  });
  console.log("USER");
  // User.belongsToMany(models.UserBook, {through: UserBooks});
  return User;
};





