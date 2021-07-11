process.env.NODE_ENV = 'test';

const app = require('../backend/Statistics Service/server'); // Link to your server file
const app2 = require('../backend/Questions-Answers Management Service/server');
const supertest = require('supertest');
const request = supertest(app);
const request2 = supertest(app2);
const chai = require('chai');

//const mocha = require('mocha');
chai.should();

setTimeout(function() {
    run()
  }, 7000);

describe('Statistics endpoints', () => {
 
    let numberOfQuestions;

    //get the number of users that initially exist in database
    before((done) => {
        request2.get('/qa/question/countquestions')
                .end(function(error,response) {
                    numberOfQuestions = response.body.count;
                    done();
                });
    });
    

    it('Get Number Of Questions Per Day',function(done) {
        request.get('/stat/questionsperdate')
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

    it('Get Number Of Questions Per Keyword',function(done) {
        request.get('/stat/questionsperkeyword')
                .end(function(error,response) {
                    const res = response.body[0];
                    // response.body.forEach(({count,word}) => {
                    //     request2.post("/qa/question/findquestionsbykeyword")
                    //             .send(`word=${word}`)
                    //             .end(function(err,resp) {
                    //                 resp.body.count.should.be.equal(count);
                    //             })
                    // })
                    response.status.should.be.equal(200);
                    res.should.have.property('word');
                    res.should.have.property('count');
                    done();
                });
    });

});