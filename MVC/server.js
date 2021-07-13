const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const routes = require('./model/routes/index.routes');

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/saas1', routes);

app.listen(5005, function () {
        console.log('App listening on port 5005! Go to http://localhost:5005/')
    });

module.exports = app;