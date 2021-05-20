const db = require("../../models");
const {question, keyword, questionHasKeyword} = db;
const {Op} = require("sequelize");
const moment = require('moment');

exports.countQuestionsPerKeyword = (req, res) => {
    if (!req.body.word) {
        res.status(400).send({
            message: "You should provide the keyword!"
        });
        return;
    }

    keyword.findOne({where: {word: req.body.word}})
        .then(data => {
            if (data) {
                data.getQuestions()
                    .then(data => {
                        let count = Object.keys(data).length;
                        res.send({"count": count});
                    })
            }
            else {
                res.status(401).json({"count": 0})
            }
        })
        .catch(() => res.status(401).json({
            message: "Invalid keyword!"
        }));
};

exports.countQuestionsPerPeriod = (req, res) => {
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

    question.findAll({where: {questionedOn: {[Op.between]: [req.body.startDate, req.body.endDate]}}})
        .then(data => {
            if (data) {
                let count = Object.keys(data).length;
                res.send({"count": count});
            }
            else {
                res.status(401).json({count: 0})
            }
        })
        .catch(() => res.status(401).json({
            message: "Invalid dates!"
        }));
}
