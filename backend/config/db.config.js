// Configuration for the remote database
module.exports = {
    HOST: "rogue.db.elephantsql.com",
    USER: "kzxwxxrt",
    PASSWORD: "8gRgT3YI_C7V_YYAdfejXZ3By7f4bXXr",
    DB: "kzxwxxrt",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};