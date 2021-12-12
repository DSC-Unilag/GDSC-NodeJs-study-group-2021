import server from '../server';
import User from '../models/User';
import Quote from '../models/Quote';
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

chai.use(chaiHttp);

const userId = mongoose.Types.ObjectId;

const USER = {
  _id: userId,
  firstName: 'Osemudiamen',
  lastName: 'Itua',
  email: 'testemail@gmail.com',
  password: 'testPassword789##',
  passwordConfirm: 'testPassword789##',
};

// const QUOTE = {
//   user: USER._id,
//   quote: 'Always endevour to be the best',
// };

let accessToken: string;
let refreshToken: string;

describe('Tests for the auth and user endpoints', () => {
  // before(async () => {
  //   //delete al occurences of the test quote from the db
  //   await Quote.deleteMany({ quote: 'Always endevour to be the best' });
  //   //delete al occurences of the test user from the db
  //   await User.deleteMany({ email: USER.email });
  // });

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
        if (user) {
          assert.isNotNull(user, 'user that signed up does not have details saved in database');
          assert.equal(user.firstName, USER.firstName, 'firstname that was saved doesnt match users name');
          assert.equal(user.lastName, USER.lastName, 'last name that was saved doesnt math what the user entered');
          assert.notEqual(user.password, USER.password, 'password has not been hashed');
          done();
        }
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
    }, 3000);
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

// Tests for quote endpoints
describe('Tests for the quote endpoints', () => {
  after(async () => {
    //delete al occurences of the test quote from the db
    await Quote.deleteMany({ quote: 'Always endevour to be the best' });
    //delete al occurences of the test user from the db
    await User.deleteMany({ email: USER.email });
  });

  it('Should get all quotes', (done) => {
    chai
      .request(server)
      .get('/quote')
      .set('Authorization', `Bearer ${accessToken}`)
      .end((err, res) => {
        assert.equal(res.status, 200, 'get quotes endpoint should have a 200 reponse');
        assert.typeOf(res.body, 'array', 'get quotes endpoint should return an array');
        done();
      });
  });

  it('Should get quote by id', (done) => {
    chai
      .request(server)
      .get('/quote/' + '61b271ce80c9ff8ae6c82b43')
      .set('Authorization', `Bearer ${accessToken}`)
      .end((err, res) => {
        assert.typeOf(res.body, 'object', 'get quote by id endpoint should return an object');
        assert.equal(res.status, 200, 'get quote by id endpoint should have a 200 reponse');
        done();
      });
  });

  it('Should create a quote', (done) => {
    chai
      .request(server)
      .post('/quote')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ quote: 'Always endevour to be the best' })
      .end((err, res) => {
        assert.equal(res.status, 201, 'create quote should have a 201 status');
        assert.typeOf(res.body, 'object', 'response body should be an object');
        assert.property(res.body, 'message', 'create quote endpoint should have message property');
        assert.property(res.body, 'quote', 'create quote endpoint should have quote property');
        done();
      });
  });
});
