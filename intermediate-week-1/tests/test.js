const { assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../models/User');

chai.use(chaiHttp);

const USER = {
  firstName: 'Osemudiamen',
  lastName: 'Itua',
  email: 'testemail@gmail.com',
  password: 'testPassword789##',
  passwordConfirm: 'testPassword789##',
};

let accessToken;
let refreshToken;

describe('Tests for the endpoints', () => {
  before(async () => {
    //delete al occurences of the test user from the db
    await User.deleteMany({ email: USER.email });
  });

  after(async () => {
    //delete al occurences of the test user from the db
    await User.deleteMany({ email: USER.email });
  });

  it('Sign up with proper details should work properly', (done) => {
    chai
      .request(server)
      .post('/auth/signup')
      .send(USER)
      .end((err, res) => {
        assert.property(res.body, 'message', 'sign up endpoint response should have message property');
        assert.equal(res.status, 201, 'signup endpoint should have a 201 reponse');
        done();
      });
  });

  it('After user has signed up, user details should be in database and password shuold be hashed', (done) => {
    User.findOne({ email: USER.email })
      .select('+password')
      .then((user) => {
        assert.isNotNull(user, 'user that signed up does not have details saved in database');
        assert.equal(user.firstName, USER.firstName, 'firstname that was saved doesnt match users name');
        assert.equal(user.lastName, USER.lastName, 'last name that was saved doesnt math what the user entered');
        assert.notEqual(user.password, USER.password, 'password has not been hashed');
        done();
      })
      .catch((err) => {
        throw err;
      });
  });

  it('user that has signed up should be able to log in successfully', (done) => {
    chai
      .request(server)
      .post('/auth/login')
      .send({
        email: USER.email,
        password: USER.password,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'accessToken', 'login response should have access token property');
        assert.property(res.body, 'refreshToken', 'login response should have refresh token');
        refreshToken = res.body.refreshToken;
        accessToken = res.body.accessToken;
        done();
      });
  });

  it('I can use access token to get information about logged in user', (done) => {
    chai
      .request(server)
      .get('/user')
      .set('Authorization', `Bearer ${accessToken}`)
      .end((err, res) => {
        assert.equal(res.body.firstName, USER.firstName, 'wrong firstname sent in get user info');
        assert.equal(res.body.lastName, USER.lastName, 'wrong lastname sent in get user info');
        assert.equal(res.body.email, USER.email, 'wrong email sent in get user info');
        done();
      });
  });

  it('Refresh token endpoint shoult return the refresh token and a new accessToken', (done) => {
    setTimeout(() => {
      chai
        .request(server)
        .post('/auth/refresh-token')
        .send({
          refreshToken,
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'accessToken', 'refresh token endpoint repsonse should have accesstoken property');
          assert.property(
            res.body,
            'refreshToken',
            'refresh token endpoint response should have refreshtoken property'
          );
          assert.notEqual(res.body.accessToken, accessToken);

          refreshToken = res.body.refreshToken;
          accessToken = res.body.accessToken;
          done();
        });
    }, 2000);
  });

  it('New access token should work just like before', (done) => {
    chai
      .request(server)
      .get('/user')
      .set('Authorization', `Bearer ${accessToken}`)
      .end((err, res) => {
        assert.equal(res.body.firstName, USER.firstName);
        assert.equal(res.body.lastName, USER.lastName);
        assert.equal(res.body.email, USER.email);
        done();
      });
  });
});
