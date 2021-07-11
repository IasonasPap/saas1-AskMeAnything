const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const routes = require('./model/routes/index.routes');

//app.use(cors());

// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/saas1', routes);

//https.createServer(options, app)
app.listen(5005, function () {
        console.log('App listening on port 4000! Go to http://localhost:5005/')
    });

module.exports = app;