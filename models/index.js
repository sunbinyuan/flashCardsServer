const Sequelize = require('sequelize');
var sequelize = require('../configs/db.js')
var User = exports.User = require('./user.js')(sequelize, Sequelize);