module.exports = (sequelize, Sequelize) => {

    const questionHasKeyword = sequelize.define("questionHasKeyword", {
        // keywordsId : the specific keyword in this relation
        keywordId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: keyword,
                key: 'id'
            }
        },
        // questionsId : the specific question on this relation
        questionId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: question,
                key: 'id'
            }
        }
    }, {
        timestamps: false
    });
    return questionHasKeyword;
};