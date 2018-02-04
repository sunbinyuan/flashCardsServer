const Sequelize = require('sequelize');
var sequelize = require('../configs/db.js')
var User = exports.User = require('./user.js')(sequelize, Sequelize);
var FlashCard = exports.FlashCard = require('./flashcard.js')(sequelize, Sequelize);
var Subject = exports.Subject = require('./subject.js')(sequelize, Sequelize);

User.hasMany(FlashCard);
User.hasMany(Subject);
Subject.hasMany(FlashCard);
Subject.belongsTo(User);
FlashCard.belongsTo(Subject);
FlashCard.belongsTo(User);