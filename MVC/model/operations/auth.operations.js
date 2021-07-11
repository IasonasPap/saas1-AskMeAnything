const db = require("../db.models");
const user = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signin = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "You should provide a <username> and <password> to log in!"
        });
        return;
    }

    user.findOne({where: {username: req.body.username}})
        .then(data => {
            bcrypt.compare(req.body.password, data.password)
                .then((valid) => {
                    if (!valid) {
                        res.status(401).send({
                            message: "Invalid username or password!"
                        })
                    } else {
                        let user = JSON.parse(JSON.stringify(data));
                        delete user.password;
                        const token = jwt.sign(
                            {userId: user.id, isAdmin: user.isAdmin},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'});
                        res.status(200).json({
                            token: token,
                            user: user
                        });
                    }
                })
                .catch(err => res.status(500).json({
                    error: err
                }));
        })
        .catch(() => res.status(401).json({
            message: "Invalid username or password!"
        }));
}

exports.authorize = (req, res) => {
    res.status(200).send({
        message: "User authorized successfully!"
    })
}

exports.logout = (req, res) => {
    res.status(200).send({
        message: "Successfully logged out!"
    })
}