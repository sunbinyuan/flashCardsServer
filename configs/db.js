const Sequelize = require('sequelize');

const sequelize = new Sequelize('gamedb', null, null, {
  dialect: 'sqlite',

  // SQLite only
  storage: './db.sqlite'
});

module.exports = sequelize;

