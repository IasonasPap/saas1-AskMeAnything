const db = require("../../models");
const {question, keyword, questionHasKeyword} = db;
const {Op} = require("sequelize");
const moment = require('moment');

exports.createquestion = (req, res, next) => {

    if (!req.body.title || !req.body.text || !req.body.userId) {
        res.status(400).send({
            message: "You should provide a <title> an some <text> for the new question!"
        });
        return;
    }

    let newQuestion = {
        title: req.body.title,
        text: req.body.text,
        questionedOn: Date.now(),
        userId: req.body.userId
    };


    question.create(newQuestion)
        .then(data => {
            res.send(data);
            const questionId = data.id;

            if (req.body.keywords){

                for (i = 0; i < req.body.keywords.length; i++){

                    let temp_keyword = req.body.keywords[i].toLowerCase();

                    keyword.findOne({where : {word:temp_keyword}})
                        .then(data => {
                            if (data){
                                const keywordId = data.id;

                                let newQuestionHasKeyword = {
                                    keywordId: keywordId,
                                    questionId: questionId
                                }

                                questionHasKeyword.create(newQuestionHasKeyword)
                            }
                            else{
                                let newKeyword = {
                                    word : temp_keyword
                                }

                                keyword.create(newKeyword)
                                    .then(data => {

                                        const keywordId = data.id;

                                        let newQuestionHasKeyword = {
                                            keywordId: keywordId,
                                            questionId: questionId
                                        }

                                        questionHasKeyword.create(newQuestionHasKeyword)
                                    })
                            }
                        })
                }
            }
        })
        .catch(err => {
            res.status(500).send(
                {message: err.parent.sqlMessage || "Some error occurred while creating the question."}
            );
        });


};
exports.deletequestion = (req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: "You should provide <id>!"
        });
        return;
    }

    question.findOne({where: {id: req.body.id}})
        .then(data => {
            if (data) {
                const {id} = data;
                question.destroy({where: {id: id}})
                    .then(result => {
                        if (!result) {
                            return res.status(404).send({error: `The question with id=${req.body.id} wasn't found!`});
                        }
                        else {
                            res.send({message: "Question deleted successfully!"});
                        }
                    });
            }
            else {
                res.status(401).json({message: `The question with id=${req.body.id} wasn't found!`})
            }
        })
        .catch(() => res.status(401).json({
            message: `The question with id=${req.body.id} wasn't found!`
        }));
}

exports.updatequestiontext = (req, res) => {
    if (!req.body.title || !req.body.text) {
        res.status(400).send({
            message: "You should provide new <text>!"
        });
        return;
    }
    question.findOne({where: {title: req.body.title}})
        .then(data => {
            if (data) {
                const {id} = data;
                question.update({text: req.body.text}, {
                    where: {id: id},
                    raw: true
                })
                    .then((result) => {
                        if (result[0] !== 1) {
                            return res.status(404).send({
                                message: `Cannot update Question with id=${id}. Question not found!`
                            });
                        } else {
                            question.findByPk(id)
                                .then(data => {
                                    if (data) {
                                        res.send(data);
                                    } else {
                                        return res.status(404).send({
                                            message: `Not Found Question with id=${id}`
                                        });
                                    }
                                })
                        }
                    })
            }
            else {
                res.status(401).json({message: "Invalid title!"})
            }
        })
        .catch(() => res.status(401).json({
            message: "Invalid title!"
        }));
}

exports.findById = (req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: "You should provide the <id>!"
        });
        return;
    }

    question.findOne({
        where: {id: req.body.id},
        include: [{
            model: answer, required: false,
            attributes: ['text', 'answeredOn']
        }, {
            model: keyword, required: false, attributes: ['word'],
            through: {
                model: questionHasKeyword, attributes: []
            }
        }]
    })
        .then(data => {
            if (data) {
                res.send(data)
            }
            else {
                res.status(401).json({message: "Invalid id!"})
            }
        })
        .catch(() => res.status(401).json({
            message: "Invalid id!"
        }));
};

exports.findKeywordByQuestionId = (req, res) => {
    if (!req.body.id) {
        res.status(400).send({
            message: "You should provide the <id>!"
        });
        return;
    }

    question.findOne({where: {id: req.body.id}})
        .then(data => {
            if (data) {
                data.getKeywords()
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

exports.findQuestionsByKeyword = (req, res) => {
    if (!req.body.word) {
        res.status(400).send({
            message: "You should provide the keyword!"
        });
        return;
    }

    let temp_keyword = req.body.word.toLowerCase();

    keyword.findOne({
        where: {word: temp_keyword},
        include: [{
            model: question, required: true,
            through: {
                model: questionHasKeyword, attributes: []
            },
            include: [{
                model: answer, required: false,
                attributes: ['text', 'answeredOn']
            }, {
                model: keyword, required: true, attributes: ['word'],
                through: {
                    model: questionHasKeyword, attributes: []
                },
            }]
        }]
    })
        .then(data => {
            res.send(data.dataValues.questions);
        })
        .catch(() => res.status(401).json({
            message: "Something went wrong!"
        }));
};


exports.findOneByDate = (req, res) => {
    if (!req.body.startDate || !req.body.endDate) {
        res.status(400).send({
            message: "You should provide starting and ending date of the period!"
        });
        return;
    }

    if (req.body.startDate > req.body.endDate || !moment(req.body.endDate, 'YYYYMMDD', true).isValid() || !moment(req.body.startDate, 'YYYYMMDD', true).isValid()) {
        res.status(400).send({
            message: 'Invalid dates!'
        });
        return;
    }

    question.findOne({
        where: {questionedOn: {[Op.between]: [req.body.startDate, req.body.endDate]}},
        include: [{
            model: answer, required: false,
            attributes: ['text', 'answeredOn']
        }, {
            model: keyword, required: false, attributes: ['word'],
            through: {
                model: questionHasKeyword, attributes: []
            }
        }]
    })
        .then(data => {
            if (data) {
                res.send(data)
            }
            else {
                res.status(401).json({message: "Invalid dates!"})
            }
        })
        .catch(() => res.status(401).json({
            message: "Invalid dates!"
        }));
};

exports.findAllByDateAndKeyword = (req, res) => {
    if (!req.body.startDate || !req.body.endDate) {
        res.status(400).send({
            message: "You should provide starting and ending date of the period!"
        });
        return;
    }

    if (req.body.startDate > req.body.endDate || !moment(req.body.endDate, 'YYYYMMDD', true).isValid() || !moment(req.body.startDate, 'YYYYMMDD', true).isValid()) {
        res.status(400).send({
            message: 'Invalid dates!'
        });
        return;
    }

    if (!req.body.word) {
        res.status(400).send({
            message: "You should provide the keyword!"
        });
        return;
    }

    let temp_keyword = req.body.word.toLowerCase();

    keyword.findOne({
        where: {word: temp_keyword},
        include: [{
            model: question, required: true,
            where: {questionedOn: {[Op.between]: [req.body.startDate, req.body.endDate]}},
            through: {
                model: questionHasKeyword, attributes: []
            },
            include: [{
                model: answer, required: false,
                attributes: ['text', 'answeredOn']
            }, {
                model: keyword, required: true, attributes: ['word'],
                through: {
                    model: questionHasKeyword, attributes: []
                },
            }]
        }]
    })
        .then(data => {
            res.send(data.dataValues.questions);
        })
        .catch(() => res.status(401).json({
            message: "Something went wrong!"
        }));
};


exports.findAllByDate = (req, res) => {
    if (!req.body.startDate || !req.body.endDate) {
        res.status(400).send({
            message: "You should provide starting and ending date of the period!"
        });
        return;
    }

    if (req.body.startDate > req.body.endDate || !moment(req.body.endDate, 'YYYYMMDD', true).isValid() || !moment(req.body.startDate, 'YYYYMMDD', true).isValid()) {
        res.status(400).send({
            message: 'Invalid dates!'
        });
        return;
    }

    question.findAll({
        where: {questionedOn: {[Op.between]: [req.body.startDate, req.body.endDate]}},
        include: [{
            model: answer, required: false,
            attributes: ['text', 'answeredOn']
        }, {
            model: keyword, required: false, attributes: ['word'],
            through: {
                model: questionHasKeyword, attributes: []
            }
        }]
    })
        .then(data => {
            if (data) {
                res.send(data)
            }
            else {
                res.status(401).json({message: "Invalid dates!"})
            }
        })
        .catch(() => res.status(401).json({
            message: "Invalid dates!"
        }));
};

exports.findQuestionsByUserId = (req, res) => {
    if (!req.body.userid) {
        res.status(400).send({
            message: "You should provide the <userid>!"
        });
        return;
    }

    question.findAll({
        where: {userId: req.body.userid},
        include: [{
            model: answer, required: false,
            attributes: ['text', 'answeredOn']
        }, {
            model: keyword, required: false, attributes: ['word'],
            through: {
                model: questionHasKeyword, attributes: []
            }
        }]
    })
        .then(data => {
            if (data) {
                res.send(data)
            }
            else {
                res.status(401).json({message: "Invalid user id!"})
            }
        })
        .catch(() => res.status(401).json({
            message: "Invalid user id!"
        }));
};

exports.findAll = (req, res) => {
    question.findAll({
        include: [{
            model: answer, required: false,
            attributes: ['text', 'answeredOn']
        }, {
            model: keyword, required: false, attributes: ['word'],
            through: {
                model: questionHasKeyword, attributes: []
            }
        }]
    })
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