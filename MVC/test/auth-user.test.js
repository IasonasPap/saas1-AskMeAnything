//process.env.NODE_ENV ='test';
const app = require('../server'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const chai = require('chai');
chai.should();


setTimeout(function() {
    run()
  }, 7000);


describe('Authenticator testing', () => {
 
    let numberOfUsers, userToken;
    const newUser = {
        username: "testuser",
        password: "testuserpassword",
        fullName: "user for testing",
        email: "testuser@mail.gr"
    };
    const noEmailUser = {
        username: "testuser1",
        password: "testuser1password",
        fullName: "user1 for testing"
    };
    const noFullNameUser = {
        username: "testuser2",
        password: "testuser2password",
        email: "testuser2@mail.gr"
    };

    //get the number of users that initially exist in database
    before((done) => {
        request.get('/saas1/stat/countusers')
                .end(function(error,response) {
                    numberOfUsers = response.body.count;
                    done();
                });
    });
    
    //if we skip the test for deleting all users
    after((done) => {
        request.get('/saas1/stat/countusers')
                .end(function(error,response) {
                    response.body.count.should.be.equal(numberOfUsers);
                    done();
                });
    });    
    
    it('Get all users', function(done) {
        request.get('/saas1/user/findusers')
                .end(function(error,response) {
                    const res = response.body[0];
                    response.status.should.be.equal(200);
                    response.body.length.should.be.equal(numberOfUsers);
                    res.should.have.property('id');
                    res.should.have.property('username');
                    res.should.have.property('fullName');
                    res.should.have.property('email');
                    done();
                });
        
    });

    describe('Sign up testing', () => {

        it('Don\'t create a user when password is missing',function(done) {
            request.post('/saas1/user/signup')
                    .send({
                        "username": "onemore", 
                        "email": "onemore@gmail.com", 
                        "fullName": "onemore user"
                    })
                    .end(function(error,response) {
                        response.status.should.be.equal(400);
                        response.body.should.have.property('message').equal("You should provide a <username>,a <password> and an <email> for the new user!");
                        done();
                    });
        });

        it('Don\'t create a user when username is missing',function(done) {
            request.post('/saas1/user/signup')
                    .send({
                        "password": "onemore", 
                        "email": "onemore@gmail.com", 
                        "fullName": "onemore user"
                    })
                    .end(function(error,response) {
                        response.status.should.be.equal(400);
                        response.body.should.have.property('message').equal("You should provide a <username>,a <password> and an <email> for the new user!");
                        done();
                    });
        });

        it('Create a user when email not given',function(done) {
            request.post('/saas1/user/signup')
                    .send(noEmailUser)
                    .end(function(error,response) {
                        response.status.should.be.equal(200);
                        response.body.should.have.property('id');
                        response.body.should.have.property('username').equal(noEmailUser.username);
                        response.body.should.have.property('fullName').equal(noEmailUser.fullName);
                        response.body.should.have.property('email').equal(null);
                        done();
                    });
        });

        it('Create a user when fullname not given',function(done) {
            request.post('/saas1/user/signup')
                    .send(noFullNameUser)
                    .end(function(error,response) {
                        response.status.should.be.equal(200);
                        response.body.should.have.property('id');
                        response.body.should.have.property('username').equal(noFullNameUser.username);
                        response.body.should.have.property('email').equal(noFullNameUser.email);
                        response.body.should.have.property('fullName').equal(null);
                        done();
                    });
        });

        it("Don't create user if username already in use",function(done) {
            request.post('/saas1/user/signup')
                    .send({
                        "username": "testuser1",
                        "password": "onemore", 
                        "email": "onemore@gmail.com", 
                        "fullName": "onemore user"
                    })
                    .end(function(error,response) {
                        response.status.should.be.equal(500);
                        response.body.should.have.property('message').equal("Some error occurred while creating the user.");
                        done();
                    });
        });

        it('Create a new user', function(done) {
            request.post('/saas1/user/signup')
                    .send(newUser)
                    .end(function(error,response) {
                        response.status.should.be.equal(200);
                        response.body.should.have.property('id');
                        response.body.should.have.property('username').equal(newUser.username);
                        response.body.should.have.property('fullName').equal(newUser.fullName);
                        response.body.should.have.property('email').equal(newUser.email);
                        //save user's id to delete it after executing necessary tests
                        newUser["id"] = response.body.id;
                        done();
                    });
            
        });
        
    });

    describe('Sign in testing', () => {
        after((done) => {
            request.post('/saas1/user/deleteuser')
                    .set('x-auth-token',userToken)
                    .send(`username=${noEmailUser.username}`)
                    .end(function(error,resp) {
                        resp.status.should.be.equal(200);
                        request.post('/saas1/user/deleteuser')
                                .set('x-auth-token',userToken)
                                .send(`username=${noFullNameUser.username}`)
                                .end(function(error,res) {
                                    res.status.should.be.equal(200);
                                    done();                              
                                });                        
                        
                        });
        });

        it('Fails to log in if username is missing',(done) => {
            request.post('/saas1/auth/signin')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(`password=${newUser.password}`)
                .end(function(error,response) {
                    response.status.should.be.equal(400);
                    response.body.should.have.property('message').equal("You should provide a <username> and <password> to log in!");
                    done();
                });
        });

        it('Fails to log in if password is missing',(done) => {
            request.post('/saas1/auth/signin')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(`username=${newUser.username}`)
                .end(function(error,response) {
                    response.status.should.be.equal(400);
                    response.body.should.have.property('message').equal("You should provide a <username> and <password> to log in!");
                    done();
                });
        });

        it('Fails to log in if both password and username are missing',(done) => {
            request.post('/saas1/auth/signin')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .end(function(error,response) {
                    response.status.should.be.equal(400);
                    response.body.should.have.property('message').equal("You should provide a <username> and <password> to log in!");
                    done();
                });
        });

        it('Fails to log in if user doesn\'t exist',(done) => {
            request.post('/saas1/auth/signin')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send("username=wrongusername")
                .send("password=randompsw")
                .end(function(error,response) {
                    response.status.should.be.equal(401);
                    response.body.should.have.property('message').equal("Invalid username or password!");
                    done();
                });
        });

        it('Fails to log in if password is incorrect',(done) => {
            request.post('/saas1/auth/signin')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(`username=${newUser.username}`)
                .send("password=wrongpassword")
                .end(function(error,response) {
                    response.status.should.be.equal(401);
                    response.body.should.have.property('message').equal("Invalid username or password!");
                    done();
                });
        });

        it('Succefully log in a user',(done) => {
            request.post('/saas1/auth/signin')
                .set('Content-Type','application/x-www-form-urlencoded')
                .send(`username=${newUser.username}`)
                .send(`password=${newUser.password}`)
                .end(function(error,response) {
                    response.status.should.be.equal(200);
                    response.body.should.have.property("token");
                    response.body.should.have.property("user");
                    response.body.user.should.have.property("id");
                    response.body.user.should.have.property("username").equal(newUser.username);
                    response.body.user.should.have.property("fullName").equal(newUser.fullName);
                    response.body.user.should.have.property("email").equal(newUser.email);
                    userToken = response.body.token;
                    done();
                });
        });    
        
    });

    describe('Sign out testing', () => {
        it('Don\'t logout if a user is not logged in',(done) => {
            request.post('/saas1/auth/logout')
                    .set('x-auth-token','678tyghjg86gyug78')
                    .end(function(error,response) {
                        response.status.should.be.equal(401);
                        response.body.should.have.property('message').equal('Invalid token!');
                        done();
                    });
        });

        it('Don\'t logout if token is missing',(done) => {
            request.post('/saas1/auth/logout')
                    .end(function(error,response) {
                        response.status.should.be.equal(401);
                        response.body.should.have.property('message').equal('Missing token!');
                        done();
                    });
        });

        it('Logout a user',(done) => {
            request.post('/saas1/auth/logout')
                    .set('x-auth-token',userToken)
                    .end(function(error,response) {
                        response.body.should.have.property("message").equal("Successfully logged out!");
                        response.status.should.be.equal(200);
                        done();
                    });
        });        
    });

    describe('User endpoints testing', () => {
        let updatedPswUser = {
            username: "testuser",
            password: "updatedpassword"
        }


        describe("Update user's password", () => {
            it('No token given', (done) => {
                request.post('/saas1/user/updatepassword')
                        .send(updatedPswUser)
                        .end(function(error,response) {
                            response.status.should.be.equal(401);
                            response.body.should.have.property('message').equal("Missing token!");
                            done();
                        });
            });

            it('Invalid token given', (done) => {
                request.post('/saas1/user/updatepassword')
                        .set('x-auth-token',"dcdscscdscsd")
                        .send(updatedPswUser)
                        .end(function(error,response) {
                            response.status.should.be.equal(401);
                            response.body.should.have.property('message').equal("Invalid token!");
                            done();
                        });
            });

            it('Doesn\'t make an update if a user with given username doesn\'t exist', (done) => {
                request.post('/saas1/user/updatepassword')
                        .set('x-auth-token',userToken)
                        .send("username=notExistent")
                        .send("password=fwefwe")
                        .end(function(error,response) {
                            response.status.should.be.equal(401);
                            response.body.should.have.property('message').equal("Invalid username!");
                            done();
                        });
            });

            it('Doesn\'t make an update if the username is not given', (done) => {
                request.post('/saas1/user/updatepassword')
                        .set('x-auth-token',userToken)
                        .send("password=nousername")
                        .end(function(error,response) {
                            response.status.should.be.equal(400);
                            response.body.should.have.property('message').equal("You should provide new <password>!");
                            done();
                        });
            });

            it('Doesn\'t make an update if the password is not given',function(done) {
                
                request.post('/saas1/user/updatepassword')
                        .set('x-auth-token',userToken)
                        .send("username=nopassword")
                        .end(function(error,response) {
                            response.status.should.be.equal(400);
                            response.body.should.have.property('message').equal("You should provide new <password>!");
                            done();
                        });
            })

            it('Update a user', (done) => {
                request.post('/saas1/user/updatepassword')
                        .set('x-auth-token',userToken)
                        .send(updatedPswUser)
                        .end(function(error,response) {
                            response.status.should.be.equal(200);
                            response.body.should.have.property('id');
                            response.body.should.have.property('username').equal(updatedPswUser.username);
                            response.body.should.have.property('fullName').equal(newUser.fullName);
                            response.body.should.have.property('email').equal(newUser.email);
                            done();
                        });
            });
        });

        describe("Delete user", () => {
            it('No token given',(done) => {
                request.post('/saas1/user/deleteuser')
                        .end(function(error,response) {
                            response.status.should.be.equal(401);
                            response.body.should.have.property('message').equal('Missing token!');
                        done();
                });
            });

            it('Invalid token given',(done) => {
                request.post('/saas1/user/deleteuser')
                        .set('x-auth-token',"hjkhknjk")
                        .end(function(error,response) {
                            response.status.should.be.equal(401);
                            response.body.should.have.property('message').equal('Invalid token!');
                            done();
                });
            });

            it('Fail to delete a user if username is not existent',(done) => {
                request.post('/saas1/user/deleteuser')
                        .set('x-auth-token',userToken)
                        .send("username=notexistent")
                        .end(function(error,response) {
                            response.status.should.be.equal(401);
                            response.body.should.have.property('message').equal('Invalid username!');
                            done();
                });
            });

            it('Fail to delete a user if no username is given',(done) => {
                request.post('/saas1/user/deleteuser')
                        .set('x-auth-token',userToken)
                        .end(function(error,response) {
                            response.status.should.be.equal(400);
                            response.body.should.have.property('message').equal('You should provide <username>!');
                            done();
                });
            });

            it('Delete a user', (done) => {
                request.post('/saas1/user/deleteuser')
                        .set('x-auth-token',userToken)
                        .send(`username=${newUser.username}`)
                        .end(function(error,response) {
                            response.status.should.be.equal(200);
                            response.body.should.have.property('message').equal('User deleted successfully!');
                            done();
                });
            });
        });
    });

});
