const db = require("../../models");
const {question, keyword, questionHasKeyword} = db;
const {Op, fn, col} = require("sequelize");
const moment = require('moment');

exports.countQuestionsPerKeyword = (req, res) => {
    if (!req.body.word) {
        res.status(400).send({
            message: "You should provide the keyword!"
        });
        return;
    }

    let temp_keyword = req.body.word.toLowerCase();

    keyword.findOne({where: {word: temp_keyword}})
        .then(data => {
            if (data) {
                data.getQuestions()
                    .then(data => {
                        let count = Object.keys(data).length;
                        res.send({count: count});
                    })
            }
            else {
                res.status(401).json({count: 0})
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
                res.send({count: count});
            }
            else {
                res.status(401).json({count: 0})
            }
        })
        .catch(() => res.status(401).json({
            message: "Invalid dates!"
        }));
};

exports.questionsPerDay = (req, res) => {
    question.findAll({
        attributes: [[fn('date', col('questionedOn')), 'date'], [fn('count', col('id')), 'count']],
        group: ['date']
    })
        .then(data => {
            res.status(200).json(data);
        })
};

exports.questionsPerKeyword = (req, res) => {
    keyword.findAll({
        attributes: ['word', [fn('count', col('questionId')), 'count']],
        include: [{
            model: questionHasKeyword, attributes: []
        }],
        group: ['keyword.id']
    })
        .then(data => {
            res.status(200).json(data);
        })
};