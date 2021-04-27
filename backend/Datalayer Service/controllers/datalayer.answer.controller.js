const db = require("../../models");
const {answer, question} = db;

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

exports.findAnswersByQuestionId = (req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: "You should provide the <id>!"
        });
        return;
    }

    question.findOne({where: {id: req.body.id}})
        .then(data => {
            if (data) {
                data.getAnswers()
                    .then(data => {
                        res.send(data);
                    })
            }
            else {
                res.status(401).json({message: "Invalid id!"})
            }
        })
        .catch(() => res.status(401).json({
            message: "Invalid id!"
        }));
}

exports.updateanswertext = (req, res) => {
    if (!req.body.id || !req.body.text) {
        res.status(400).send({
            message: "You should provide new <text>!"
        });
        return;
    }
    answer.findOne({where: {id: req.body.id}})
        .then(data => {
            if (data) {
                const {id} = data;
                answer.update({text: req.body.text}, {
                    where: {id: id},
                    raw: true
                })
                    .then((result) => {
                        if (result[0] !== 1) {
                            return res.status(404).send({
                                message: `Cannot update Answer with id=${id}. Answer not found!`
                            });
                        } else {
                            answer.findByPk(id)
                                .then(data => {
                                    if (data) {
                                        res.send(data);
                                    } else {
                                        return res.status(404).send({
                                            message: `Not Found Answer with id=${id}`
                                        });
                                    }
                                })
                        }
                    })
            }
            else {
                res.status(401).json({message: "Invalid id!"})
            }
        })
        .catch(() => res.status(401).json({
            message: "Invalid id!"
        }));
}

exports.deleteanswer = (req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: "You should provide <id>!"
        });
        return;
    }

    answer.findOne({where: {id: req.body.id}})
        .then(data => {
            if (data) {
                const {id} = data;
                answer.destroy({where: {id: id}})
                    .then(result => {
                        if (!result) {
                            return res.status(404).send({error: `The answer with id=${req.body.id} wasn't found!`});
                        }
                        else {
                            res.send({message: "Answer deleted successfully!"});
                        }
                    });
            }
            else {
                res.status(401).json({message: `The answer with id=${req.body.id} wasn't found!`})
            }
        })
        .catch(() => res.status(401).json({
            message: `The answer with id=${req.body.id} wasn't found!`
        }));
}

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
