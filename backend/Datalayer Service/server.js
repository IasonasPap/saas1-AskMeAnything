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

app.use('/datalayer', routes);

//for future use, when we have set the db
const db = require("../models");
db.sequelize.sync()
    .then(() => {
        console.log("Models synchronized with DB!");
    }).catch(err => {
    console.error(err);
});

const options = {
    key: fs.readFileSync('../server.key'),
    cert: fs.readFileSync('../server.crt')
};

https.createServer(options, app)
    .listen(5000, function () {
        console.log('App listening on port 5000! Go to https://localhost:5000/')
    });

module.exports = app;