const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const routes = require('./routes/index.routes');

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', routes);

const db = require("../models");
db.sequelize.sync()
    .then(() => {
       console.log("Models synchronized with DB!");
    }).catch(err => {
       console.error(err);
    });

const REDIS_PORT = 6379;
const REDIS_HOST = "localhost";
const TotalConnections = 20;
const pool = require('redis-connection-pool')('myRedisPool', {
    host: REDIS_HOST,
    port: REDIS_PORT,
    max_clients: TotalConnections,
    perform_checks: false,
    database: 0
})

console.log("Connected to redis!");

pool.hget('subscribers', 'authorize', async (err, data) => {
    let currentSubscribers = JSON.parse(data);
    let alreadySubscribed = false;

    let myAddress = 'http://localhost:4000/auth/authorize'; // address to get the messages from esb

    for (let i = 0; i < currentSubscribers.length; i++){
        if (currentSubscribers[i] == myAddress){
            alreadySubscribed = true;
        }
    }

    if (alreadySubscribed == false){
        currentSubscribers.push(myAddress);
        pool.hset('subscribers', 'authorize', JSON.stringify(currentSubscribers), () => {});
        console.log('Subscribed to authorize channel!');
    }
    else {
        console.log('Already subscribed to authorize channel!');
    }

});

app.listen(4000, function () {
        console.log('App listening on port 4000! Go to http://localhost:4000/')
    });


module.exports = app;