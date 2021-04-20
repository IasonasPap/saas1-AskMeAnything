const db = require("../models");
const user = db.user;
const bcrypt = require('bcrypt');

exports.createuser = (req, res, next) => {

    // Validate request

    if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(400).send({
            message: "You should provide a <username>,a <password> and an <email> to signup!"
        });
        return;
    }

    // Create a newUser object
    let newUser = {
        username: req.body.username,
        password: req.body.password,
        fullName: req.body.fullName || null,
        email: req.body.email
    };

    user.create(newUser)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(
                {message: err.parent.sqlMessage || "Some error occurred while creating the user."}
            );
        });
};

exports.authorize = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "You should provide a <username> and <password> to sign in!"
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
                        res.status(200).send(user);
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

exports.updatepassword = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "You should provide new <password>!"
        });
        return;
    }
    user.findOne({where: {username: req.body.username}})
        .then(data => {
            if (data) {
                const {id} = data;
                user.update({password: req.body.password}, {
                    where: {id: id},
                    raw: true
                })
                    .then((result) => {
                        if (result[0] !== 1) {
                            return res.status(404).send({
                                message: `Cannot update User with id=${id}. User not found!`
                            });
                        } else {
                            user.findByPk(id)
                                .then(data => {
                                    if (data) {
                                        res.send(data);
                                    } else {
                                        return res.status(404).send({
                                            message: "Not Found User with id=" + id
                                        });
                                    }

                                })
                        }
                    })
            }
            else {
                res.status(401).json({message: "Invalid username!"})
            }
        })
        .catch(() => res.status(401).json({
            message: "Invalid username!"
        }));
}

exports.deleteuser = (req, res) => {
    if (!req.body.username) {
        res.status(400).send({
            message: "You should provide <username>!"
        });
        return;
    }

    user.findOne({where: {username: req.body.username}})
        .then(data => {
            if (data) {
                const {id} = data;
                user.destroy({where: {id: id}})
                    .then(result => {
                        if (!result) {
                            return res.status(404).send({error: 'No user with this username!'});
                        }
                        else {
                            res.send({message: "User deleted successfully!"});
                        }
                    });
            }
            else {
                res.status(401).json({message: "Invalid username!"})
            }
        })
        .catch(() => res.status(401).json({
            message: "Invalid username!"
        }));
}

exports.findAll = (req, res) => {
    user.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};