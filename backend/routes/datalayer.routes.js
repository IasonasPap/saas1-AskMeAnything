const express = require('express');
const router = express.Router({mergeParams: true});
const datalayerAuthController = require('../controllers/datalayer.auth.controller');
const datalayerQuestionController = require('../controllers/datalayer.question.controller');

// Authenticator Data Interface

//Signin data interface
router.post("/signin", datalayerAuthController.signin);

//Signup Data Interface
router.post("/signup", datalayerAuthController.signup);

router.get("/users", datalayerAuthController.findAll);

//Create-Question Data Interface
router.post("/createquestion", datalayerQuestionController.createquestion);

router.get("/questions", datalayerQuestionController.findAll);

module.exports = router;