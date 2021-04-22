module.exports = (sequelize, Sequelize) => {

    const questionHasKeyword = sequelize.define("questionHasKeyword", {
        // keywordsId : the specific keyword in this relation
        keywordId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        // questionsId : the specific question on this relation
        questionId:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return questionHasKeyword;
};