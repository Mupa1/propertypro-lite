"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("chai/register-should");

var _index = _interopRequireDefault(require("../index"));

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
/* Signup tests */

describe('Testing the user endpoints:', function () {
  var user = {
    email: 'testing@mail.com',
    first_name: 'mary',
    last_name: 'kavutha',
    address: 'nairobi',
    phone_number: '123456789',
    password: '123456',
    is_admin: 'false'
  };
  it('It should create a user', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/users/signup').set('Accept', 'application/json').send(user).end(function (err, res) {
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('data').have.property('token');
      expect(res.body.data).to.include({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        phone_number: user.phone_number,
        is_admin: user.is_admin
      });
      done();
    });
  });
  it('It should not create the same users twice', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/users/signup').set('Accept', 'application/json').send(user).end(function (err, res) {
      expect(res.status).to.equal(400);
      res.body.should.have.property('message').eql("The email ".concat(user.email, " is already in use"));
      done();
    });
  });
  it('It should not create a user with incomplete parameters', function (done) {
    var user = {
      email: 'testing@mail.com',
      first_name: 'mary',
      last_name: 'kavutha',
      address: 'nairobi',
      phone_number: '123456789',
      password: '123456'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/users/signup').set('Accept', 'application/json').send(user).end(function (err, res) {
      expect(res.status).to.equal(400);
      res.body.should.have.property('message').eql("Please provide complete details");
      done();
    });
  });
  /* Signin tests */

  it('It should signin a registered user', function (done) {
    var userSignin = {
      email: 'testing@mail.com',
      password: '123456'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/users/signin').set('Accept', 'application/json').send(userSignin).end(function (err, res) {
      expect(res.status).to.equal(201);
      res.body.should.have.property('message');
      done();
    });
  });
  it('It should not signin an unregistered user', function (done) {
    var userSignin = {
      email: 'test@gmail.com',
      password: '1234'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/users/signin').set('Accept', 'application/json').send(userSignin).end(function (err, res) {
      expect(res.status).to.equal(400);
      res.body.should.have.property('message').eql("The email ".concat(userSignin.email, " does not exist. Please register first."));
      done();
    });
  });
  it('It should not signin a registered user using wrong password', function (done) {
    var userSignin = {
      email: 'testing@mail.com',
      password: '1234'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/users/signin').set('Accept', 'application/json').send(userSignin).end(function (err, res) {
      expect(res.status).to.equal(400);
      res.body.should.have.property('message').eql("Invalid email or password.");
      done();
    });
  });
});
//# sourceMappingURL=userTest.js.map