process.env.NODE_ENV = 'test';

const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const chai = require('chai');
chai.should();

setTimeout(function() {
    run()
  }, 7000);

describe('Answers management endpoints', () => {
 
    let numberOfAnswers,userToken;
    const newUser = {
      "username": "answerstestuser",
      "password": "testuserpassword",
      "fullName": "user for testing",
      "email": "testuser@mail.gr"
    };
    const newAnswer = {
      "text": "This is a testing answer"
    };
    const newQuestion = {
      "title": "Test question for answer testing",
      "text": "This is a testing question",
      "keywords": ["test"]
    };

    //get the number of users that initially exist in database
    before((done) => {
        request.get('/saas1/stat/countanswers')
                .end(function(error,response) {
                    response.status.should.be.equal(200);
                    numberOfAnswers = response.body.count;
                    //create a user
                    request.post('/saas1/user/signup')
                            .send(newUser)
                            .end(function(error,respo) {
                                respo.status.should.be.equal(200);
                                //sign in the new user
                                request.post('/saas1/auth/signin')
                                        .set('Content-Type','application/x-www-form-urlencoded')
                                        .send(`username=${newUser.username}`)
                                        .send(`password=${newUser.password}`)
                                        .end(function(error,resp) {
                                            resp.status.should.be.equal(200);
                                            userToken = resp.body.token;
                                            newUser["id"] = resp.body.user.id;
                                            newAnswer["userId"] = resp.body.user.id;
                                            newQuestion["userId"] = resp.body.user.id;
                                            //create a question
                                            request.post('/saas1/question/createquestion')
                                                    .set('x-auth-token', userToken)
                                                    .send(newQuestion)
                                                    .end(function(error,res) {
                                                        res.status.should.be.equal(200);
                                                        newAnswer['questionId'] = res.body.id;
                                                        newQuestion['questionId'] = res.body.id;
                                                        done();
                                                    });
                                        });
                            });
                  });
    });
    
    //if we skip the test for deleting all users
    after((done) => {
        request.get('/saas1/stat/countanswers')
                .end(function(error,response) {
                    response.status.should.be.equal(200);
                    response.body.count.should.be.equal(numberOfAnswers);
                    request.post('/saas1/user/deleteuser')
                        .set('x-auth-token',userToken)
                        .send(`username=${newUser.username}`)
                        .end(function(error,resp) {
                            //delete the question created for testing
                            resp.status.should.be.equal(200);
                            done();
                    });
                });
    });
    
    describe('Answer a question', () => {

      it('No token given', (done) => {
        request.post('/saas1/answer/createanswer')
                .send(newAnswer)
                .end(function(error,response) {
                    response.status.should.be.equal(401);
                    response.body.should.have.property('message').equal("Missing token!");
                    done();
                });
      });

      it('Invalid token given', (done) => {
          request.post('/saas1/answer/createanswer')
                  .set('x-auth-token',"dcdscscdscsd")
                  .send(newAnswer)
                  .end(function(error,response) {
                      response.status.should.be.equal(401);
                      response.body.should.have.property('message').equal("Invalid token!");
                      done();
                  });
      });

      it('Do not create answer when text is missing',function(done) {
        request.post('/saas1/answer/createanswer')
                .set('x-auth-token', userToken)
                .send({"questionId":-1,"userId":newUser.id})
                .end(function(error,response) {
                    response.status.should.be.equal(400);
                    response.body.should.have.property('message').equal("You should provide some <text> for the answer!");
                    done();
                });
      });
      
      it('Do not create answer when user id is missing',function(done) {
        request.post('/saas1/answer/createanswer')
                .set('x-auth-token', userToken)
                .send({"questionId":-1,"text":"nouserid"})
                .end(function(error,response) {
                    response.status.should.be.equal(400);
                    response.body.should.have.property('message').equal("You should provide some <text> for the answer!");
                    done();
                });
      });

      it('Do not create answer when question id is missing',function(done) {
        request.post('/saas1/answer/createanswer')
                .set('x-auth-token', userToken)
                .send({"text":"noquestionid","userId":newUser.id})
                .end(function(error,response) {
                    response.status.should.be.equal(400);
                    response.body.should.have.property('message').equal("You should provide some <text> for the answer!");
                    done();
                });
      });
      
      it('Do not create answer if question does not exist (invalid questionId)',function(done) {
        request.post('/saas1/answer/createanswer')
                .set('x-auth-token', userToken)
                .send({"text":"noquestionid","questionId":-1,"userId":newUser.id})
                .end(function(error,response) {
                    response.status.should.be.equal(500);
                    response.body.should.have.property('message').equal("Some error occurred while creating the answer.");
                    done();
                });
      });

      it('Do not create answer if user does not exist (invalid userId)',function(done) {
        request.post('/saas1/answer/createanswer')
                .set('x-auth-token', userToken)
                .send({"text":"noquestionid","questionId":newUser.id,"userId":-1})
                .end(function(error,response) {
                    response.status.should.be.equal(401);
                    response.body.should.have.property('message').equal("Invalid token!");
                    done();
                });
      });

      it('Answer question succesfully',function(done) {
          request.post('/saas1/answer/createanswer')
                  .set('x-auth-token', userToken)
                  .send(newAnswer)
                  .end(function(error,response) {
                      response.status.should.be.equal(200);
                      newAnswer['id'] = response.body.id;
                      response.body.should.have.property('id');
                      response.body.should.have.property('text').equal(newAnswer.text);
                      response.body.should.have.property('answeredOn');
                      response.body.should.have.property('userId').equal(newAnswer.userId);
                      response.body.should.have.property('questionId').equal(newAnswer.questionId);
                      done();
                  });
      });

    });

    describe("Update answer's text", () => {

      it('No token given', (done) => {
        request.post('/saas1/answer/updateanswertext')
                .send({"id":newAnswer.id,"text":"Updated text"})
                .end(function(error,response) {
                    response.status.should.be.equal(401);
                    response.body.should.have.property('message').equal("Missing token!");
                    done();
                });
      });

      it('Invalid token given', (done) => {
          request.post('/saas1/answer/updateanswertext')
                  .set('x-auth-token',"dcdscscdscsd")
                  .send({"id":newAnswer.id,"text":"Updated text"})
                  .end(function(error,response) {
                      response.status.should.be.equal(401);
                      response.body.should.have.property('message').equal("Invalid token!");
                      done();
                  });
      });

      it('Do not update answer when text is missing',function(done) {
        request.post('/saas1/answer/updateanswertext')
                .set('x-auth-token', userToken)
                .send({"id":newAnswer.id})
                .end(function(error,response) {
                    response.status.should.be.equal(400);
                    response.body.should.have.property('message').equal("You should provide new <text>!");
                    done();
                });
      });

      it('Do not update answer id is missing',function(done) {
        request.post('/saas1/answer/updateanswertext')
                .set('x-auth-token', userToken)
                .send({"text":"noanswerid"})
                .end(function(error,response) {
                    response.status.should.be.equal(400);
                    response.body.should.have.property('message').equal("You should provide new <text>!");
                    done();
                });
      });

      it('Do not make an update if a wrong answer id given',function(done) {
        request.post('/saas1/answer/updateanswertext')
                .set('x-auth-token', userToken)
                .send({"id":-1,"text":"Updated text"})
                .end(function(error,response) {
                    response.status.should.be.equal(401);
                    response.body.should.have.property('message').equal("Invalid id!");
                    done();
                });
      });

      it('Update a new answer succesfully',function(done) {
        request.post('/saas1/answer/updateanswertext')
                .set('x-auth-token', userToken)
                .send({"id":newAnswer.id,"text":"Updated text"})
                .end(function(error,response) {
                    response.status.should.be.equal(200);
                    response.body.should.have.property('id').equal(newAnswer.id);
                    response.body.should.have.property('text').equal("Updated text");
                    response.body.should.have.property('answeredOn');
                    response.body.should.have.property('userId').equal(newAnswer.userId);
                    response.body.should.have.property('questionId').equal(newAnswer.questionId);
                    done();
                });
      });
    });

    describe('Find answers:', () => {

      describe('By question id', () => {

        it('No token given', (done) => {
          request.post('/saas1/answer/findanswersbyquestion')
                  .send({"id":newQuestion.questionId})
                  .end(function(error,response) {
                      response.status.should.be.equal(401);
                      response.body.should.have.property('message').equal("Missing token!");
                      done();
                  });
        });
  
        it('Invalid token given', (done) => {
            request.post('/saas1/answer/findanswersbyquestion')
                    .set('x-auth-token',"dcdscscdscsd")
                    .send({"id":newQuestion.questionId})
                    .end(function(error,response) {
                        response.status.should.be.equal(401);
                        response.body.should.have.property('message').equal("Invalid token!");
                        done();
                    });
        });

        it('No question id given', (done) => {
          request.post('/saas1/answer/findanswersbyquestion')
                  .set('x-auth-token',userToken)
                  .end(function(error,response) {
                      response.status.should.be.equal(400);
                      response.body.should.have.property('message').equal("You should provide the <id>!");
                      done();
                  });
        });

        it('Invalid answer id given', (done) => {
          request.post('/saas1/answer/findanswersbyquestion')
                  .set('x-auth-token',userToken)
                  .send({"id":-1})
                  .end(function(error,response) {
                      response.status.should.be.equal(401);
                      response.body.should.have.property('message').equal("Invalid id!");
                      done();
                  });
        });   
    
        it('Valid answer id given', (done) => {
          request.post('/saas1/answer/findanswersbyquestion')
                  .set('x-auth-token',userToken)
                  .send({"id":newQuestion.questionId})
                  .end(function(error,response) {
                      response.status.should.be.equal(200);
                      const res = response.body[0];
                      res.should.have.property("id");
                      res.should.have.property("text");
                      res.should.have.property("answeredOn");
                      res.should.have.property("userId");
                      res.should.have.property("questionId");
                      done();
                  });
        });

      });

      describe('By user id', () => {

        it('No token given', (done) => {
          request.post('/saas1/answer/findanswersbyuserid')
                  .send({"userid":newUser.id})
                  .end(function(error,response) {
                      response.status.should.be.equal(401);
                      response.body.should.have.property('message').equal("Missing token!");
                      done();
                  });
        });
  
        it('Invalid token given', (done) => {
            request.post('/saas1/answer/findanswersbyuserid')
                    .set('x-auth-token',"dcdscscdscsd")
                    .send({"userid":newUser.id})
                    .end(function(error,response) {
                        response.status.should.be.equal(401);
                        response.body.should.have.property('message').equal("Invalid token!");
                        done();
                    });
        });

        it('No user id given', (done) => {
          request.post('/saas1/answer/findanswersbyuserid')
                  .set('x-auth-token',userToken)
                  .end(function(error,response) {
                      response.status.should.be.equal(400);
                      response.body.should.have.property('message').equal("You should provide the <userid>!");
                      done();
                  });
        });

        it('Invalid user id given or user with no answers asked', (done) => {
          request.post('/saas1/answer/findanswersbyuserid')
                  .set('x-auth-token',userToken)
                  .send({"userid":-1})
                  .end(function(error,response) {
                      response.status.should.be.equal(200);
                      response.body.length.should.be.equal(0);
                      done();
                  });
        });   
    
        it('Valid answer id given', (done) => {
          request.post('/saas1/answer/findanswersbyuserid')
                  .set('x-auth-token',userToken)
                  .send({"userid":newUser.id})
                  .end(function(error,response) {
                      const res = response.body[0]; 
                      response.status.should.be.equal(200);
                      res.should.have.property('id')
                      res.should.have.property('text')
                      res.should.have.property('answeredOn');
                      res.should.have.property('userId').equal(newUser.id);
                      res.should.have.property('questionId')
                      res.should.have.property('question');
                      done();
                  });
        });

      });

    });

    describe('Delete answer', () => {

      after("Get all answers",(done) => {
        request.get('/saas1/answer/findanswers')
                .set('x-auth-token',userToken)
                .end(function(error,response) {
                  const res = response.body[0];
                  response.status.should.be.equal(200);
                  res.should.have.property('id');
                  res.should.have.property('text');
                  res.should.have.property('answeredOn');
                  res.should.have.property('userId');
                  res.should.have.property('questionId');
                  response.body.length.should.be.equal(numberOfAnswers);
                  done();
                });
      });

      it('No token given', (done) => {
        request.post('/saas1/answer/deleteanswer')
                .send({"id":newAnswer.id})
                .end(function(error,response) {
                    response.status.should.be.equal(401);
                    response.body.should.have.property('message').equal("Missing token!");
                    done();
                });
      });

      it('Invalid token given', (done) => {
          request.post('/saas1/answer/deleteanswer')
                  .set('x-auth-token',"dcdscscdscsd")
                  .send({"id":newAnswer.id})
                  .end(function(error,response) {
                      response.status.should.be.equal(401);
                      response.body.should.have.property('message').equal("Invalid token!");
                      done();
                  });
      });

      it('Do not delete answer when id is missing',function(done) {
        request.post('/saas1/answer/deleteanswer')
                .set('x-auth-token', userToken)
                .end(function(error,response) {
                    response.status.should.be.equal(400);
                    response.body.should.have.property('message').equal("You should provide <id>!");
                    done();
                });
      });

      it('Do not delete answer when not valid id is given',function(done) {
        request.post('/saas1/answer/deleteanswer')
                .set('x-auth-token', userToken)
                .send({"id":-1})
                .end(function(error,response) {
                    response.status.should.be.equal(401);
                    response.body.should.have.property('message').equal("The answer with id=-1 wasn't found!");
                    done();
                });
      });

      it('Delete a answer succesfully',function(done) {
        request.post('/saas1/answer/deleteanswer')
                .set('x-auth-token', userToken)
                .send({"id":newAnswer.id})
                .end(function(error,response) {
                    response.status.should.be.equal(200);
                    response.body.should.have.property('message').equal("Answer deleted successfully!");
                    done();
                });
      });

    })

});
