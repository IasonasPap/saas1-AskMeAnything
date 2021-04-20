const db = require("../models");
const question = db.question;
/*
exports.createquestion = (req, res, next) => {

    // Validate request

    if (!req.body.title || !req.body.text) {
        res.status(400).send({
            message: "You should provide a <title> an some <text> for the new question!"
        });
        return;
    }

    // Create a newUser object
    let newQuestion = {
        title: req.body.title,
        text: req.body.text,
        questionedOn: Date.now(),
        userId: 1
    };

    //res.send(newUser);

    question.create(question)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(
                {message: err.parent.sqlMessage || "Some error occurred while creating the question."}
            );
        });
};
*/
exports.findAll = (req, res) => {
    question.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving questions."
            });
        });
};
