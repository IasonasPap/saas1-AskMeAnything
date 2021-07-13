process.env.NODE_ENV = 'test';

const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const chai = require('chai');
chai.should();

setTimeout(function() {
    run()
  }, 7000);

describe('Questions management endpoints', () => {
 
    let numberOfQuestions,userToken;
    const newUser = {
      "username": "questionstestuser",
      "password": "testuserpassword",
      "fullName": "user for testing",
      "email": "testuser@mail.gr"
    };
    const newQuestion = {
      "title": "Test question",
      "text": "This is a testing question",
      "keywords": ["test"]
    };

    const noKeywordsQuestion = {
      "title": "Test question1",
      "text": "This is a testing question1"
    };

    //get the number of users that initially exist in database
    before((done) => {
        request.get('/saas1/stat/countquestions')
                .end(function(error,response) {
                    numberOfQuestions = response.body.count;
                    request.post('/saas1/user/signup')
                            .send(newUser)
                            .end(function(error,response) {
                                response.status.should.be.equal(200);
                                request.post('/saas1/auth/signin')
                                        .set('Content-Type','application/x-www-form-urlencoded')
                                        .send(`username=${newUser.username}`)
                                        .send(`password=${newUser.password}`)
                                        .end(function(error,response) {
                                            response.status.should.be.equal(200);
                                            userToken = response.body.token;
                                            newQuestion["userId"] = response.body.user.id;
                                            noKeywordsQuestion["userId"] = response.body.user.id;
                                            done();
                                        });
                            });
                  });
    });
    
    //if we skip the test for deleting all users
    after((done) => {
        request.get('/saas1/stat/countquestions')
                .end(function(error,response) {
                    response.status.should.be.equal(200);
                    response.body.count.should.be.equal(numberOfQuestions);
                    request.post('/saas1/user/deleteuser')
                        .set('x-auth-token',userToken)
                        .send(`username=${newUser.username}`)
                        .end(function(error,resp) {
                            resp.status.should.be.equal(200);
                            resp.body.should.have.property('message').equal('User deleted successfully!');
                            done();
                    });
                });
    });
    
    describe('Create question', () => {

      it('No token given', (done) => {
        request.post('/saas1/question/createquestion')
                .send(newQuestion)
                .end(function(error,response) {
                    response.status.should.be.equal(401);
                    response.body.should.have.property('message').equal("Missing token!");
                    done();
                });
      });

      it('Invalid token given', (done) => {
          request.post('/saas1/question/createquestion')
                  .set('x-auth-token',"dcdscscdscsd")
                  .send(newQuestion)
                  .end(function(error,response) {
                      response.status.should.be.equal(401);
                      response.body.should.have.property('message').equal("Invalid token!");
                      done();
                  });
      });

      it('Do not create question when title is missing',function(done) {
        request.post('/saas1/question/createquestion')
                .set('x-auth-token', userToken)
                .send({"text":"notitle","userId":newQuestion.userId})
                .end(function(error,response) {
                    response.status.should.be.equal(400);
                    response.body.should.have.property('message').equal("You should provide a <title> an some <text> for the new question!");
                    done();
                });
      });

      it('Do not create question when text is missing',function(done) {
        request.post('/saas1/question/createquestion')
                .set('x-auth-token', userToken)
                .send({"title":"notext","userId":newQuestion.userId})
                .end(function(error,response) {
                    response.status.should.be.equal(400);
                    response.body.should.have.property('message').equal("You should provide a <title> an some <text> for the new question!");
                    done();
                });
      });

      it('Do not create question when userId is missing',function(done) {
        request.post('/saas1/question/createquestion')
                .set('x-auth-token', userToken)
                .send({"title":"notext","text":"notitle"})
                .end(function(error,response) {
                    response.status.should.be.equal(400);
                    response.body.should.have.property('message').equal("You should provide a <title> an some <text> for the new question!");
                    done();
                });
      });

      it('Create a new question when no keywords are given',function(done) {
        request.post('/saas1/question/createquestion')
                .set('x-auth-token', userToken)
                .send(noKeywordsQuestion)
                .end(function(error,response) {
                    response.status.should.be.equal(200);
                    noKeywordsQuestion['questionId'] = response.body.id;
                    response.body.should.have.property('id');
                    response.body.should.have.property('title');
                    response.body.should.have.property('text');
                    response.body.should.have.property('questionedOn');
                    response.body.should.have.property('userId').equal(noKeywordsQuestion.userId);
                    done();
                });
      });

      it('Create a new question succesfully',function(done) {
          request.post('/saas1/question/createquestion')
                  .set('x-auth-token', userToken)
                  .send(newQuestion)
                  .end(function(error,response) {
                      response.status.should.be.equal(200);
                      newQuestion['questionId'] = response.body.id;
                      response.body.should.have.property('id');
                      response.body.should.have.property('title');
                      response.body.should.have.property('text');
                      response.body.should.have.property('questionedOn');
                      response.body.should.have.property('userId').equal(newQuestion.userId);
                      done();
                  });
      });
      
      it('Do not create question if the same title exists',function(done) {
        request.post('/saas1/question/createquestion')
                .set('x-auth-token', userToken)
                .send(newQuestion)
                .end(function(error,response) {
                    response.status.should.be.equal(500);
                    response.body.should.have.property('message').equal("Some error occurred while creating the question.");
                    done();
                });
      });

    });

    describe("Update question's text", () => {

      it('No token given', (done) => {
        request.post('/saas1/question/updatequestiontext')
                .send(newQuestion)
                .end(function(error,response) {
                    response.status.should.be.equal(401);
                    response.body.should.have.property('message').equal("Missing token!");
                    done();
                });
      });

      it('Invalid token given', (done) => {
          request.post('/saas1/question/updatequestiontext')
                  .set('x-auth-token',"dcdscscdscsd")
                  .send(newQuestion)
                  .end(function(error,response) {
                      response.status.should.be.equal(401);
                      response.body.should.have.property('message').equal("Invalid token!");
                      done();
                  });
      });

      it('Do not update question when text is missing',function(done) {
        request.post('/saas1/question/updatequestiontext')
                .set('x-auth-token', userToken)
                .send({"title":"notext"})
                .end(function(error,response) {
                    response.status.should.be.equal(400);
                    response.body.should.have.property('message').equal("You should provide new <text>!");
                    done();
                });
      });

      it('Do not update question when title is missing',function(done) {
        request.post('/saas1/question/updatequestiontext')
                .set('x-auth-token', userToken)
                .send({"text":"notitle"})
                .end(function(error,response) {
                    response.status.should.be.equal(400);
                    response.body.should.have.property('message').equal("You should provide new <text>!");
                    done();
                });
      });

      it('Do not update question when title does not exist',function(done) {
        request.post('/saas1/question/updatequestiontext')
                .set('x-auth-token', userToken)
                .send({"title":"notexistent","text":"notexistenttitle"})
                .end(function(error,response) {
                    response.status.should.be.equal(401);
                    response.body.should.have.property('message').equal("Invalid title!");
                    done();
                });
      });

      it('Update a new question succesfully',function(done) {
        request.post('/saas1/question/updatequestiontext')
                .set('x-auth-token', userToken)
                .send({"title":newQuestion.title,"text":"This is a testing question updated"})
                .end(function(error,response) {
                    response.status.should.be.equal(200);
                    response.body.should.have.property('id');
                    response.body.should.have.property('title');
                    response.body.should.have.property('text');
                    response.body.should.have.property('questionedOn');
                    response.body.should.have.property('userId').equal(newQuestion.userId);
                    done();
                });
      });
    });

    describe('Find question:', () => {

      describe('By question id', () => {

        it('No question id given', (done) => {
          request.post('/saas1/question/findquestionbyid')
                  .set('x-auth-token',userToken)
                  .end(function(error,response) {
                      response.status.should.be.equal(400);
                      response.body.should.have.property('message').equal("You should provide the <id>!");
                      done();
                  });
        });

        it('Invalid question id given', (done) => {
          request.post('/saas1/question/findquestionbyid')
                  .set('x-auth-token',userToken)
                  .send({"id":-1})
                  .end(function(error,response) {
                      response.status.should.be.equal(401);
                      response.body.should.have.property('message').equal("Invalid id!");
                      done();
                  });
        });   
    
        it('Valid question id given', (done) => {
          request.post('/saas1/question/findquestionbyid')
                  .set('x-auth-token',userToken)
                  .send({"id":noKeywordsQuestion.questionId})
                  .end(function(error,response) {
                      response.status.should.be.equal(200);
                      response.body.should.have.property('id').equal(noKeywordsQuestion.questionId);
                      response.body.should.have.property('title').equal(noKeywordsQuestion.title);
                      response.body.should.have.property('text').equal(noKeywordsQuestion.text);
                      response.body.should.have.property('userId').equal(noKeywordsQuestion.userId);
                      response.body.should.have.property('questionedOn');
                      response.body.should.have.property('answers');
                      response.body.should.have.property('keywords');
                      done();
                  });
        });

      });

      describe('By user id', () => {

        it('No token given', (done) => {
          request.post('/saas1/question/findquestionsbyuserid')
                  .send({"userid":newQuestion.userId})
                  .end(function(error,response) {
                      response.status.should.be.equal(401);
                      response.body.should.have.property('message').equal("Missing token!");
                      done();
                  });
        });
  
        it('Invalid token given', (done) => {
            request.post('/saas1/question/findquestionsbyuserid')
                    .set('x-auth-token',"dcdscscdscsd")
                    .send({"userid":newQuestion.userId})
                    .end(function(error,response) {
                        response.status.should.be.equal(401);
                        response.body.should.have.property('message').equal("Invalid token!");
                        done();
                    });
        });

        it('No question id given', (done) => {
          request.post('/saas1/question/findquestionsbyuserid')
                  .set('x-auth-token',userToken)
                  .end(function(error,response) {
                      response.status.should.be.equal(400);
                      response.body.should.have.property('message').equal("You should provide the <userid>!");
                      done();
                  });
        });

        it('Invalid question id given or user with no questions asked', (done) => {
          request.post('/saas1/question/findquestionsbyuserid')
                  .set('x-auth-token',userToken)
                  .send({"userid":-1})
                  .end(function(error,response) {
                      response.status.should.be.equal(200);
                      response.body.length.should.be.equal(0);
                      done();
                  });
        });   
    
        it('Valid question id given', (done) => {
          request.post('/saas1/question/findquestionsbyuserid')
                  .set('x-auth-token',userToken)
                  .send({"userid":noKeywordsQuestion.userId})
                  .end(function(error,response) {
                      const res = response.body[0]; 
                      response.status.should.be.equal(200);
                      res.should.have.property('id')
                      res.should.have.property('title')
                      res.should.have.property('text')
                      res.should.have.property('questionedOn');
                      res.should.have.property('userId').equal(noKeywordsQuestion.userId);
                      res.should.have.property('answers');
                      res.should.have.property('keywords');
                      done();
                  });
        });

      });

      describe('By date', () => {
        it('no questions for given period', function(done) {
          request.post('/saas1/question/findquestionsbydate')
                  .send({"startDate": "20050101", "endDate": "20051212"})
                  .end(function(error,response) { 
                      response.status.should.be.equal(200);
                      response.body.length.should.be.equal(0);
                      done();
                  });
        });

        it('"startDate" after "endDate"',function(done) {
            request.post('/saas1/question/findquestionsbydate')
                    .send({"startDate": "20220101", "endDate": "20211212"})
                    .end(function(error,response) {
                        response.body.should.have.property('message').equal("Invalid dates!");
                        response.status.should.be.equal(400);
                        done();
                    });
        });

        it('one or both dates missing',function(done) {
            request.post('/saas1/question/findquestionsbydate')
                    .end(function(error,response) {
                        response.body.should.have.property('message').equal("You should provide starting and ending date of the period!");
                        response.status.should.be.equal(400);
                        done();
                    });
        });

        it('valid period given', function(done) {
          request.post('/saas1/question/findquestionsbydate')
                  .send({"startDate": "20190101", "endDate": "20221212"})
                  .end(function(error,response) {
                      const res = response.body[0]; 
                      response.status.should.be.equal(200);
                      res.should.have.property("id");
                      res.should.have.property("title");
                      res.should.have.property("text");
                      res.should.have.property("questionedOn");
                      res.should.have.property("userId");
                      res.should.have.property("answers");
                      res.should.have.property("keywords");
                      done();
                  });
        });
      });

      describe('By keyword', () => {
        it('Invalid keyword given', function(done) {
          request.post('/saas1/question/findquestionsbykeyword')
                  .send({"word": "notexistent"})
                  .end(function(error,response) { 
                      response.status.should.be.equal(401);
                      response.body.should.have.property('message').equal("Something went wrong!");
                      done();
                  });
        });

        it('No keyword given',function(done) {
            request.post('/saas1/question/findquestionsbykeyword')
                    .end(function(error,response) {
                        response.body.should.have.property('message').equal("You should provide the keyword!");
                        response.status.should.be.equal(400);
                        done();
                    });
        });

        it('Valid keyword', function(done) {
          request.post('/saas1/question/findquestionsbykeyword')
                  .send({"word":newQuestion.keywords[0]})
                  .end(function(error,response) {
                      const res = response.body[0]; 
                      response.status.should.be.equal(200);
                      res.should.have.property("id");
                      res.should.have.property("title");
                      res.should.have.property("text");
                      res.should.have.property("questionedOn");
                      res.should.have.property("userId");
                      res.should.have.property("answers");
                      res.should.have.property("keywords");
                      done();
                  });
        });

      });

      describe('By date and keyword', () => {

        it('no start date given', function(done) {
          request.post('/saas1/question/findquestionsbydateandkeyword')
                  .send({"endDate": "20200101", "word": "test"})
                  .end(function(error,response) { 
                      response.status.should.be.equal(400);
                      response.body.should.have.property('message').equal("You should provide starting and ending date of the period!");
                      done();
                  });
        });

        it('no end date given', function(done) {
          request.post('/saas1/question/findquestionsbydateandkeyword')
                  .send({"startDate": "20221212", "word": "test"})
                  .end(function(error,response) { 
                    response.status.should.be.equal(400);
                    response.body.should.have.property('message').equal("You should provide starting and ending date of the period!");
                    done();
                  });
        });

        it('no keyword given', function(done) {
          request.post('/saas1/question/findquestionsbydateandkeyword')
                  .send({"startDate": "20200101", "endDate": "20221212"})
                  .end(function(error,response) { 
                    response.status.should.be.equal(400);
                    response.body.should.have.property('message').equal("You should provide the keyword!");
                    done();
                  });
        });

        it('no questions for given period', function(done) {
          request.post('/saas1/question/findquestionsbydateandkeyword')
                  .send({"startDate": "20050101", "endDate": "20051212","word":"test"})
                  .end(function(error,response) { 
                      response.status.should.be.equal(401);
                      response.body.should.have.property('message').equal("Something went wrong!");
                      done();
                  });
        });

        it('no questions for given keyword', function(done) {
          request.post('/saas1/question/findquestionsbydateandkeyword')
                  .send({"startDate": "20200101", "endDate": "20211212", "word": "notexistent"})
                  .end(function(error,response) { 
                      response.status.should.be.equal(401);
                      response.body.should.have.property('message').equal("Something went wrong!");
                      done();
                  });
        });

        it('"startDate" after "endDate"',function(done) {
            request.post('/saas1/question/findquestionsbydateandkeyword')
                    .send({"startDate": "20220101", "endDate": "20211212","word":"test"})
                    .end(function(error,response) {
                        response.body.should.have.property('message').equal("Invalid dates!");
                        response.status.should.be.equal(400);
                        done();
                    });
        });

        it('valid period given', function(done) {
          request.post('/saas1/question/findquestionsbydateandkeyword')
                  .send({"startDate": "20190101", "endDate": "20221212","word":"test"})
                  .end(function(error,response) {
                      const res = response.body[0]; 
                      response.status.should.be.equal(200);
                      res.should.have.property("id");
                      res.should.have.property("title");
                      res.should.have.property("text");
                      res.should.have.property("questionedOn");
                      res.should.have.property("userId");
                      res.should.have.property("answers");
                      res.should.have.property("keywords");
                      done();
                  });
        });

      });

    });

    describe('Delete question', () => {

      after("Get all questions",(done) => {
        request.get('/saas1/question/findquestions')
                .end(function(error,response) {
                  const res = response.body[0];
                  response.status.should.be.equal(200);
                  res.should.have.property('id');
                  res.should.have.property('title');
                  res.should.have.property('text');
                  res.should.have.property('questionedOn');
                  res.should.have.property('userId');
                  res.should.have.property('answers');
                  res.should.have.property('keywords');
                  response.body.length.should.be.equal(numberOfQuestions);
                  done();
                });
      });

      it('No token given', (done) => {
        request.post('/saas1/question/deletequestion')
                .send({"id":newQuestion.questionId})
                .end(function(error,response) {
                    response.status.should.be.equal(401);
                    response.body.should.have.property('message').equal("Missing token!");
                    done();
                });
      });

      it('Invalid token given', (done) => {
          request.post('/saas1/question/deletequestion')
                  .set('x-auth-token',"dcdscscdscsd")
                  .send({"id":newQuestion.questionId})
                  .end(function(error,response) {
                      response.status.should.be.equal(401);
                      response.body.should.have.property('message').equal("Invalid token!");
                      done();
                  });
      });

      it('Do not delete question when id is missing',function(done) {
        request.post('/saas1/question/deletequestion')
                .set('x-auth-token', userToken)
                .end(function(error,response) {
                    response.status.should.be.equal(400);
                    response.body.should.have.property('message').equal("You should provide <id>!");
                    done();
                });
      });

      it('Do not delete question when not valid id is given',function(done) {
        request.post('/saas1/question/deletequestion')
                .set('x-auth-token', userToken)
                .send({"id":-1})
                .end(function(error,response) {
                    response.status.should.be.equal(401);
                    response.body.should.have.property('message').equal("The question with id=-1 wasn't found!");
                    done();
                });
      });

      it('Delete a question succesfully',function(done) {
        request.post('/saas1/question/deletequestion')
                .set('x-auth-token', userToken)
                .send({"id":newQuestion.questionId})
                .end(function(error,response) {
                    response.status.should.be.equal(200);
                    response.body.should.have.property('message').equal("Question deleted successfully!");
                    request.post('/saas1/question/deletequestion')
                            .set('x-auth-token', userToken)
                            .send({"id":noKeywordsQuestion.questionId})
                            .end(function(error,response) {
                                response.status.should.be.equal(200);
                                response.body.should.have.property('message').equal("Question deleted successfully!");
                                done();
                            });
                });
      });

    })

  });
