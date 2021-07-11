// Configuration for the remote database
module.exports = {
    HOST: "localhost:8766",
    USER: "user",
    PASSWORD: "password",
    DB: "kzxwxxrt",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
