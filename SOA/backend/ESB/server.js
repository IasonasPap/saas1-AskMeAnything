const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(5003, function () {
    console.log('App listening on port 5003! Go to http://localhost:5003/')
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

// initializing channels
pool.hset('bus', 'messages', JSON.stringify([]), () => {});
pool.hset('subscribers', 'authorize', JSON.stringify([]), () => {});
// initializing channels

// pool.hget('bus', 'messages', async(data, err) => {
//     if (!data) {
//         pool.hset('bus', 'messages', JSON.stringify([]), () => {});
//     }
// });
// pool.hget('subscribers', 'authorize', async (err, data) => {
//     if (!data) {
//         pool.hset('subscribers', 'authorize', JSON.stringify([]), () => {});
//     }
// });

//setup esb endpoints and functionalities

app.post("/esb/authorize", async (req, res) => {
    const event = req.body;
    const token = req.headers['x-auth-token'];
    let currentMessages;
    let newMessage = {};
    pool.hget('bus', 'messages', async(err, data) => {
        currentMessages = JSON.parse(data);
        newMessage = {
            "id":currentMessages.length + 1,
            event,
            "timestamp": Date.now()
        }
        currentMessages.push(newMessage);
        pool.hset('bus', 'messages', JSON.stringify(currentMessages), () => {
            pool.hget('subscribers', 'authorize', (err, data) => {
                let subscribers = JSON.parse(data);
                for (let i = 0; i < subscribers.length; i++){
                    axios({
                        "url": subscribers[i],
                        "method": "post",
                        "headers": {'x-auth-token' : token},
                        "data": newMessage
                    })
                        .then(resp => {
                            res.send(resp.data)
                        })
                        .catch(e => {
                            res.status(401).json({
                                message: "A problem with authentication occured!"
                            });
                        });
                }
            })
        })
    })
});


app.get('/esb', (req, res) => {
    res.send('Up and running!')
})

module.exports = app;