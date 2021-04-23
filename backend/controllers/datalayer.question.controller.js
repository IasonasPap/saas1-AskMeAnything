const db = require("../models");
const {question, keyword, questionHasKeyword} = db;

exports.createquestion = (req, res, next) => {

    // Validate request
    // userId is passed through create question component, such as the id of the user whose token is provided

    if (!req.body.title || !req.body.text || !req.body.userId) {
        res.status(400).send({
            message: "You should provide a <title> an some <text> for the new question!"
        });
        return;
    }

    // Create a newQuestion object
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

                    const temp_keyword = req.body.keywords[i]

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
                                console.log(temp_keyword)
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

    question.findOne({where: {id: req.body.id}})
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

}

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