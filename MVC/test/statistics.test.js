process.env.NODE_ENV = 'test';

const app = require('../server'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const chai = require('chai');
chai.should();

setTimeout(function() {
    run()
  }, 7000);

describe('Statistics endpoints', () => {
 
    let numberOfQuestions;
    describe('Get Number Of :', () => {
        it('Users',function(done) {
            request.get('/saas1/stat/countusers')
                    .end(function(error,response) {
                        response.body.should.have.property('count');
                        response.status.should.be.equal(200);
                        done();
                    });
        });

        it('Questions',function(done) {
            request.get('/saas1/stat/countquestions')
                    .end(function(error,response) {
                        numberOfQuestions = response.body.count;
                        response.body.should.have.property('count');
                        response.status.should.be.equal(200);
                        done();
                    });
        });

        it('Answers',function(done) {
            request.get('/saas1/stat/countanswers')
                    .end(function(error,response) {
                        response.body.should.have.property('count');
                        response.status.should.be.equal(200);
                        done();
                    });
        });
        
        it('Questions For Each Day',function(done) {
            request.get('/saas1/stat/questionsperdate')
                    .end(function(error,response) {
                        const res = response.body[0];
                        let countQuestions = 0;
                        response.body.forEach(({count}) => countQuestions += parseInt(count))
                        countQuestions.should.be.equal(numberOfQuestions);
                        response.status.should.be.equal(200);
                        res.should.have.property('date');
                        res.should.have.property('count');
                        done();
                    });
        });

        it('Questions For Each Keyword',function(done) {
            request.get('/saas1/stat/questionsperkeyword')
                    .end(function(error,response) {
                        const res = response.body[0];
                        response.status.should.be.equal(200);
                        res.should.have.property('word');
                        res.should.have.property('count');
                        done();
                    });
        });
    });
    
    describe('Count Questions For A Period', () => {
        it('no questions for given period', function(done) {
            request.post('/saas1/stat/countquestionsperperiod')
                    .send("startDate=20051201")
                    .send("endDate=20051212")
                    .end(function(error,response) {
                        response.status.should.be.equal(200);
                        response.body.should.have.property("count").equal(0);
                        done();
                    });
        });

        it('"startDate" after "endDate"',function(done) {
            request.post('/saas1/stat/countquestionsperperiod')
                    .send("startDate=20220501")
                    .send("endDate=20211212")
                    .end(function(error,response) {
                        response.body.should.have.property('message').equal("Invalid dates!");
                        response.status.should.be.equal(400);
                        done();
                    });
        });

        it('one or both dates missing',function(done) {
            request.post('/saas1/stat/countquestionsperperiod')
                    .end(function(error,response) {
                        response.body.should.have.property('message').equal("You should provide starting and ending date of the period!");
                        response.status.should.be.equal(400);
                        done();
                    });
        });
    });

    describe('Count Questions For A Keyword', () => {
        it('give a not existent keyword',function(done) {
            request.post('/saas1/stat/countquestionsperkeyword')
                    .send("word=not existent")
                    .end(function(error,response) {
                        response.body.should.have.property('count').equal(0);
                        response.status.should.be.equal(401);
                        done();
                    });
        });

        it('no keyword given',function(done) {
            request.post('/saas1/stat/countquestionsperkeyword')
                    .end(function(error,response) {
                        response.body.should.have.property('message').equal("You should provide the keyword!");
                        response.status.should.be.equal(400);
                        done();
                    });
        });

        it('give an existent keyword',function(done) {
            request.post('/saas1/stat/countquestionsperkeyword')
                    .send("word=node.js")
                    .end(function(error,response) {
                        response.body.should.have.property('count');
                        response.status.should.be.equal(200);
                        done();
                    });
        });
    });

});