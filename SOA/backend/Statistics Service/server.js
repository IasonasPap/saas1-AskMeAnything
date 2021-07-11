const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const routes = require('./routes/index.routes');

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/stat', routes);

const db = require("../models");
db.sequelize.sync()
    .then(() => {
        console.log("Models synchronized with DB!");
    }).catch(err => {
    console.error(err);
});

    app.listen(5001, function () {
        console.log('App listening on port 5001! Go to http://localhost:5001/')
    });

module.exports = app;