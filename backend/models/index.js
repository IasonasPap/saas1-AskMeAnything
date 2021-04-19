const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

users =  require("./user.model.js")(sequelize, Sequelize);
questions = require("./question.model.js")(sequelize, Sequelize);
answers = require("./answer.model.js")(sequelize, Sequelize);
keywords = require("./keyword.model.js")(sequelize, Sequelize);
questionHasKeyword = require("./questionHasKeyword.model.js")(sequelize, Sequelize);

users.hasMany(questions);
questions.belongsTo(users);

users.hasMany(answers);
answers.belongsTo(users);

questions.hasMany(answers);
answers.belongsTo(questions);

questions.hasMany(questionHasKeyword);
questionHasKeyword.belongsTo(questions);

keywords.hasMany(questionHasKeyword);
questionHasKeyword.belongsTo(keywords);

db.users = users;
db.answers = answers;
db.questions = questions;
db.keywords = keywords;
db.questionHasKeyword = questionHasKeyword;

module.exports = db;