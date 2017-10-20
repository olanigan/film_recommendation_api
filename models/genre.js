"use strict";

module.exports = function(sequelize, DataTypes) {
  var Genre = sequelize.define("genres", {
    id:  { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING
  },
  {timestamps: false});

  Genre.associate = function(models) {
    Genre.hasMany(models.Film);
  }
  
  return Genre;
};
