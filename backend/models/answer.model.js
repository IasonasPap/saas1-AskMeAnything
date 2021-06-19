module.exports = (sequelize, Sequelize) => {

    const answer = sequelize.define("answer", {
        // text: the text of the answer
        text: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        // answeredOn: when the answer was posted
        answeredOn: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                isDate: true,
            }
        },
        // usersId : the specific user who posted this answer
        userId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        // questionsId : the specific questioned on which this answer was posted
        questionId:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    answer.prototype.toJSON = function(){
        const temp = {...this.get()};
        dateString = `${temp.answeredOn}`;
        temp.answeredOn = dateString.substr(0,21);
        return temp;
    };

    return answer;
};