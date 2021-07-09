const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const https = require('https');
const fs = require('fs');

const app = express();
const routes = require('./routes/index.routes');

app.use(cors());

// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/qa', routes);

//for future use, when we have set the db
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

pool.hget('subscribers', 'authorizedQA', async (err, data) => {
    let currentSubscribers = JSON.parse(data);
    let alreadySubscribed = false;

    let myAddress = 'https://localhost:5000/authorizedESB'; // address to get the messages from esb

    for (let i = 0; i < currentSubscribers.length; i++){
        if (currentSubscribers[i] == myAddress){
            alreadySubscribed = true;
        }
    }

    if (alreadySubscribed == false){
        currentSubscribers.push(myAddress);
        pool.hset('subscribers', 'authorizedQA', JSON.stringify(currentSubscribers), () => {});
        console.log('Subscribed to authorizedQA channel!');
    }
    else {
        console.log('Already subscribed to authorizedQA channel!');
    }

});

// const options = {
//     key: fs.readFileSync('../server.key'),
//     cert: fs.readFileSync('../server.crt')
// };


//https.createServer(options, app)
app.listen(5000, function () {
        console.log('App listening on port 5000! Go to https://localhost:5000/')
    });

module.exports = app;