module.exports = (sequelize, Sequelize) => {

    const question = sequelize.define("question", {
        // title : the title of the question
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        // text: the text of the question
        text: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        // questionedOn: when the question was asked
        questionedOn: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                isDate: true,
            }
        },
        // usersId : the specific user who asked this question
        userId:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    question.prototype.toJSON = function(){
        const temp = {...this.get()};
        if (temp.questionedOn) {
            dateString = `${temp.questionedOn}`;
            temp.questionedOn = dateString.substr(0, 21);
        }
        return temp;
    };
    return question;
};