module.exports = function(sequelize, Sequelize) {
 
    var Subject = sequelize.define('subject', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        subject: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
    });
 
    return Subject;
 
}