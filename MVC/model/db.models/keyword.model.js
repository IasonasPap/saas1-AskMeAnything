module.exports = (sequelize, Sequelize) => {
    const bcrypt = require('bcrypt');

    const keyword = sequelize.define("keyword", {
        // word: the keyword
        word: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        }
    }, {
        timestamps: false
    });
    return keyword;
};