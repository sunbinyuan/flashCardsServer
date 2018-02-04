module.exports = function(sequelize, Sequelize) {
 
    var FlashCard = sequelize.define('flashcard', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        question: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        answer: {
            type: Sequelize.TEXT,
        },

        dovalidate: {
            type: Sequelize.BOOLEAN,
        },
 
    });
 
    return FlashCard;
 
}