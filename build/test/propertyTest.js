"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("chai/register-should");

var _index = _interopRequireDefault(require("../index"));

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe('Testing the properties endpoints:', function () {
  var propertyId = 1;
  var invalidPropertyId = 777;
  var nonNumericPropertyId = '1234abcd';
  var updatedproperty = {
    id: propertyId,
    city: 'NairobiUpdated',
    estate: 'Kileleshwa',
    type: 'Apartment',
    bedroom: 2,
    bathroom: 2,
    image_url: 'image updated',
    description: 'Two bedroom spacious apartment in Kileleshwa',
    sale_or_rent: 'sale'
  };
  it('It should post a property', function (done) {
    var property = {
      city: 'Nairobi',
      estate: 'Kileleshwa',
      type: 'Apartment',
      bedroom: 2,
      bathroom: 2,
      image_url: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      price: '20000/=',
      sale_or_rent: 'sale',
      owner_email: "mupasmail@mail.com",
      owner_phone_number: "0720352124"
    };

    _chai["default"].request(_index["default"]).post('/api/v1/properties').set('Accept', 'application/json').send(property).end(function (err, res) {
      expect(res.status).to.equal(201);
      expect(res.body.data).to.include({
        city: property.city,
        estate: property.estate,
        type: property.type,
        bedroom: property.bedroom,
        bathroom: property.bathroom,
        price: property.price,
        sale_or_rent: property.sale_or_rent,
        owner_email: property.owner_email,
        owner_phone_number: property.owner_phone_number
      });
      done();
    });
  }).timeout(10000);
  it('It should not create a property with incomplete parameters', function (done) {
    var property = {
      city: 'Nairobi',
      estate: 'Kileleshwa',
      type: 'Apartment',
      bedroom: 2,
      bathroom: 2,
      image_url: 'image'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/properties').set('Accept', 'application/json').send(property).end(function (err, res) {
      expect(res.status).to.equal(400);
      done();
    });
  }).timeout(10000);
  it('It should get all properties', function (done) {
    _chai["default"].request(_index["default"]).get('/api/v1/properties').set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(200);
      res.body.data[0].should.have.property('id');
      res.body.data[0].should.have.property('city');
      res.body.data[0].should.have.property('estate');
      res.body.data[0].should.have.property('type');
      res.body.data[0].should.have.property('bedroom');
      res.body.data[0].should.have.property('bathroom');
      res.body.data[0].should.have.property('image_url');
      res.body.data[0].should.have.property('price');
      res.body.data[0].should.have.property('sale_or_rent');
      res.body.data[0].should.have.property('owner_email');
      res.body.data[0].should.have.property('owner_phone_number');
      done();
    });
  }).timeout(10000);
  it('It should get a particular property', function (done) {
    _chai["default"].request(_index["default"]).get("/api/v1/properties/".concat(propertyId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(200);
      res.body.data.should.have.property('id');
      res.body.data.should.have.property('city');
      res.body.data.should.have.property('estate');
      res.body.data.should.have.property('type');
      res.body.data.should.have.property('bedroom');
      res.body.data.should.have.property('bathroom');
      res.body.data.should.have.property('image_url');
      res.body.data.should.have.property('price');
      res.body.data.should.have.property('sale_or_rent');
      res.body.data.should.have.property('owner_phone_number');
      res.body.data.should.have.property('owner_email');
      done();
    });
  }).timeout(10000);
  it('It should not get a particular property with invalid id', function (done) {
    _chai["default"].request(_index["default"]).get("/api/v1/properties/".concat(invalidPropertyId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(404);
      res.body.should.have.property('message').eql("Cannot find property with the id ".concat(invalidPropertyId));
      done();
    });
  }).timeout(10000);
  it('It should not get a particular property with non-numeric id', function (done) {
    _chai["default"].request(_index["default"]).get("/api/v1/properties/".concat(nonNumericPropertyId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(400);
      res.body.should.have.property('message').eql('Please input a valid numeric value');
      done();
    });
  }).timeout(10000);
  it('It should update a property', function (done) {
    _chai["default"].request(_index["default"]).put("/api/v1/properties/".concat(propertyId)).set('Accept', 'application/json').send(updatedproperty).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.data.id).equal(updatedproperty.id);
      expect(res.body.data.city).equal(updatedproperty.city);
      expect(res.body.data.estate).equal(updatedproperty.estate);
      expect(res.body.data.type).equal(updatedproperty.type);
      expect(res.body.data.bedroom).equal(updatedproperty.bedroom);
      expect(res.body.data.bathroom).equal(updatedproperty.bathroom);
      expect(res.body.data.image_url).equal(updatedproperty.image_url);
      expect(res.body.data.price).equal(updatedproperty.price);
      expect(res.body.data.sale_or_rent).equal(updatedproperty.sale_or_rent);
      expect(res.body.data.owner_email).equal(updatedproperty.owner_email);
      expect(res.body.data.owner_phone_number).equal(updatedproperty.owner_phone_number);
      done();
    });
  }).timeout(10000);
  it('It should not update a property with invalid id', function (done) {
    _chai["default"].request(_index["default"]).put("/api/v1/properties/".concat(invalidPropertyId)).set('Accept', 'application/json').send(updatedproperty).end(function (err, res) {
      expect(res.status).to.equal(404);
      res.body.should.have.property('message').eql("Cannot find property with the id: ".concat(invalidPropertyId));
      done();
    });
  }).timeout(10000);
  it('It should not update a property with non-numeric id value', function (done) {
    _chai["default"].request(_index["default"]).put("/api/v1/properties/".concat(nonNumericPropertyId)).set('Accept', 'application/json').send(updatedproperty).end(function (err, res) {
      expect(res.status).to.equal(400);
      res.body.should.have.property('message').eql('Please input a valid numeric value');
      done();
    });
  }).timeout(10000);
  it('It should delete a property', function (done) {
    _chai["default"].request(_index["default"])["delete"]("/api/v1/properties/".concat(propertyId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.data).to.include({});
      done();
    });
  }).timeout(10000);
  it('It should not delete a property with invalid id', function (done) {
    _chai["default"].request(_index["default"])["delete"]("/api/v1/properties/".concat(invalidPropertyId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(404);
      res.body.should.have.property('message').eql("Property with the id ".concat(invalidPropertyId, " cannot be found"));
      done();
    });
  }).timeout(10000);
  it('It should not delete a property with non-numeric id', function (done) {
    _chai["default"].request(_index["default"])["delete"]("/api/v1/properties/".concat(nonNumericPropertyId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(400);
      res.body.should.have.property('message').eql('Please provide a numeric value');
      done();
    });
  }).timeout(10000);
});
//# sourceMappingURL=propertyTest.js.map