"use strict";

module.exports = function(sequelize, DataTypes) {
  var Film = sequelize.define("films", {
    id:   { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    release_date: DataTypes.DATE,
    tagline: DataTypes.STRING,
    revenue: DataTypes.BIGINT,
    budget: DataTypes.BIGINT,
    runtime: DataTypes.INTEGER,
    original_language: DataTypes.STRING,
    status: DataTypes.STRING,
    genre_id: DataTypes.INTEGER,
  },
  {timestamps: false}
);

  Film.associate = function(models) {
    Film.belongsTo(models.Genre, {foreignKey: 'genre_id'});
  }
  
  return Film;
};
