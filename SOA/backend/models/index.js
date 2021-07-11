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

user =  require("./user.model.js")(sequelize, Sequelize);
question = require("./question.model.js")(sequelize, Sequelize);
answer = require("./answer.model.js")(sequelize, Sequelize);
keyword = require("./keyword.model.js")(sequelize, Sequelize);
questionHasKeyword = require("./questionHasKeyword.model.js")(sequelize, Sequelize);

user.hasMany(question);
question.belongsTo(user);

user.hasMany(answer);
answer.belongsTo(user);

question.hasMany(answer);
answer.belongsTo(question);

question.belongsToMany(keyword, {through: questionHasKeyword});
keyword.belongsToMany(question, {through: questionHasKeyword});

keyword.hasMany(questionHasKeyword);

db.user = user;
db.answer = answer;
db.question = question;
db.keyword = keyword;
db.questionHasKeyword = questionHasKeyword;

module.exports = db;