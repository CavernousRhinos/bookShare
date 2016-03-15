'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    isbn: DataTypes.STRING,
    author: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    genre: DataTypes.STRING
  });
  // Book.belongsToMany(models.User, {through: UserBooks});
  console.log("BOOKS");
  return Book;
};
