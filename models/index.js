"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

var db        = {};

db.Film = sequelize.import(__dirname + "/film");
db.Genre = sequelize.import(__dirname + "/genre");

db.Film.associate(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;