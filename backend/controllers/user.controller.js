const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {

    // Validate request 
    
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "You should provide a <username>,a <password> and an <email> for the new user!"
        });
        return;
    }

    // Create a newUser object
    let newUser = {
        username: req.body.username,
        password: req.body.password,
        fullName: req.body.fullName || null,
        email: req.body.email || null
    };

    //Insert the newUser into the users table (when db is ready)
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

// Retrieve all Users from the database.
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