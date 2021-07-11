module.exports = (sequelize, Sequelize) => {
    const bcrypt = require('bcrypt');

    const user= sequelize.define("user", {
        // username: the username of the system user
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        // password: the password of the system user
        password: {

            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            set(value) {
                const hash = bcrypt.hashSync(value, 10);
                this.setDataValue('password', hash);
            },
        },
        // fullName: the name and surname of the system user
        fullName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        // email: the email of the system user
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true
            }
        }
    }, {
        timestamps: false
    });
    return user;
};