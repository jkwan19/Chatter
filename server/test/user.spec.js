const mongoose = require("mongoose");
const User = require('../models/User');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const registerPath = "/api/users/register";
const loginPath = "/api/users/login";

chai.use(chaiHttp);

describe('Register', () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
        done();
    });
  });
  /* Test the /POST route  */
  describe('/POST signup', () => {
    it('should not POST a registration without username field', (done) => {
    const user = {
      email: "test@gmail.com",
      password: "password"
    }
    chai.request(server)
      .post(registerPath)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.username.should.equal('username field is required' );
        done();
      });
    });
    it('should return 201 response for successful registration POST', (done) => {
      const user = {
        username: "test",
        email: "test@gmail.com",
        password: "password"
      }
      chai.request(server)
        .post(registerPath)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        })
    })
  });
  after((done) => {
    User.remove({}, (err) => {
        done();
    });
  });
});

describe('Login', () => {
  before((done) => {
    const newUser = {
      username: "user",
      email: "sample@gmail.com",
      password: "success"
    };
    chai.request(server)
      .post(registerPath)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(newUser)
      .end(done())
    })
  /* Test the /POST route  */
  describe('/POST login', () => {
    it('should not POST a login without an email field', (done) => {
    const user = {
      password: "password"
    }
    chai.request(server)
      .post(loginPath)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.email.should.equal('Email field is required' );
        done();
      });
    });
    it('should fail login if email is not registered', (done) => {
      const user = {
        email: "wrong@gmail.com",
        password: "password"
      }
      chai.request(server)
        .post(loginPath)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.emailnotfound.should.equal("Email not found")
          done();
        })
    })

    it('should fail login if password is incorrect', (done) => {
      const user = {
        email: "sample@gmail.com",
        password: "fail"
      };
      chai.request(server)
        .post(loginPath)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.passwordincorrect.should.equal("Password incorrect");
          done();
        })
    })

    it('should successfully login', (done) => {
      const user = {
        email: "sample@gmail.com",
        password: "success"
      };
      chai.request(server)
        .post(loginPath)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        })
    })
  });

  after((done) => {
    User.remove({}, (err) => {
        done();
    });
  });
});