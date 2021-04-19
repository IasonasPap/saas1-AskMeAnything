module.exports = (sequelize, Sequelize) => {

    const questionHasKeyword = sequelize.define("questionHasKeyword", {
        // keywordsId : the specific keyword in this relation
        keywordsId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        // questionsId : the specific question on this relation
        questionsId:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return questionHasKeyword;
};