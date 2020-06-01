import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

/* Signup tests */
describe('Testing the user endpoints:', () => {
  const user = {
    email: 'testing@mail.com',
    first_name: 'mary',
    last_name: 'kavutha',
    address: 'nairobi',
    phone_number: '123456789',
    password: '123456',
    is_admin: 'false'
  };

  it('It should create a user', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('data').have.property('token');
        expect(res.body.data).to.include({
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          address: user.address,
          phone_number: user.phone_number,
          is_admin: user.is_admin,
        });

        done();
      });
  });

  it('It should not create the same users twice', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
          .eql(`The email ${user.email} is already in use`);
        done();
      });
  });

  it('It should not create a user with incomplete parameters', (done) => {
    const user = {
      email: 'testing@mail.com',
      first_name: 'mary',
      last_name: 'kavutha',
      address: 'nairobi',
      phone_number: '123456789',
      password: '123456',
    };
    chai.request(app)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
          .eql(`Please provide complete details`);
        done();
      });
  });

  /* Signin tests */
  it('It should signin a registered user', (done) => {
    const userSignin = {
      email: 'testing@mail.com',
      password: '123456'
    };
    chai.request(app)
      .post('/api/v1/users/signin')
      .set('Accept', 'application/json')
      .send(userSignin)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        res.body.should.have.property('message');
        done();
      });
  });

  it('It should not signin an unregistered user', (done) => {
    const userSignin = {
      email: 'test@gmail.com',
      password: '1234'
    };
    chai.request(app)
      .post('/api/v1/users/signin')
      .set('Accept', 'application/json')
      .send(userSignin)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
          .eql(`The email ${userSignin.email} does not exist. Please register first.`);
        done();
      });
  });

  it('It should not signin a registered user using wrong password', (done) => {
    const userSignin = {
      email: 'testing@mail.com',
      password: '1234'
    };
    chai.request(app)
      .post('/api/v1/users/signin')
      .set('Accept', 'application/json')
      .send(userSignin)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
          .eql(`Invalid email or password.`);
        done();
      });
  });
});
