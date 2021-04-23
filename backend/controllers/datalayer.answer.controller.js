const db = require("../models");
const {answer} = db;

exports.createanswer = (req, res, next) => {

    // Validate request
    // userId is passed through create answer component, such as the id of the user whose token is provided

    if (!req.body.text || !req.body.userId || !req.body.questionId) {
        res.status(400).send({
            message: "You should provide some <text> for the answer!"
        });
        return;
    }

    // Create a newQuestion object
    let newAnswer = {
        text: req.body.text,
        answeredOn: Date.now(),
        userId: req.body.userId,
        questionId: req.body.questionId
    };


    answer.create(newAnswer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(
                {message: err.parent.sqlMessage || "Some error occurred while creating the answer."}
            );
        });
};

exports.findAll = (req, res) => {
    answer.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving answers."
            });
        });
};
