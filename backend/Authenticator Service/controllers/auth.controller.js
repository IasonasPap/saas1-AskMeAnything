const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const https = require('https');

const agent = new https.Agent({  
    rejectUnauthorized: false
})

//an valoume sto auth component to sign up
// exports.signup = (req, res) => {
//     axios({
//         "url": "https://localhost:5000/datalayer/user/createuser",
//         "method": "post",
//         httpsAgent: agent,
//         "data": {
//             username: req.body.username,
//             password: req.body.password,
//             fullName: req.body.fullName || null,
//             email: req.body.email
//        
//         }
//     }).then( response => res.status(200).send(response.data))
//       .catch( err => res.status(500).send({message: err.parent.sqlMessage || "Some error occurred while creating the user."});)
// }

exports.login = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "You should provide a <username> and <password> to log in!"
        });
        return;
    }
    
    axios({
        "url": "https://localhost:5000/datalayer/user/authorize",
        "method": "post",
        httpsAgent: agent,
        "data": {
            "username": req.body.username,
            "password": req.body.password
        }
    }).then ((response) => {
        if(response.status === 200 ) {
            bcrypt.compare(req.body.password, response.data.password)
                .then((valid) => {
                    if (!valid) {
                        res.status(401).send({
                            message: "Invalid password!"
                        })
                    } else {
                        let user = JSON.parse(JSON.stringify(response.data));
                        delete user.password;
                        const token = jwt.sign(
                            {userId: user.id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'});
                            res.status(200).json({
                                token: token
                            });
                    }
                })
                .catch(err => res.status(500).json({
                    error: err
                }));
        } else {
            res.status(400).json(response.data);
        }
    }).catch( (err) => {
        res.status(400).send(err.response.data);
    })
}

exports.logout = (req, res) => {
    console.log("succesfully logged out!");
    res.sendStatus(200);
}