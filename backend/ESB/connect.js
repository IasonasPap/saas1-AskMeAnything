const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const https = require('https');
const fs = require('fs');

const app = express();
const routes = require('./index.routes');

app.use(cors());

// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/esb', routes);

const options = {
    key: fs.readFileSync('../server.key'),
    cert: fs.readFileSync('../server.crt')
};

//https.createServer(options, app)
app.listen(5003, function () {
    console.log('App listening on port 4000! Go to https://localhost:5003/')
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

module.exports = app;