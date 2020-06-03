import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing the properties endpoints:', () => {
  const propertyId = 1;
  const invalidPropertyId = 777;
  const nonNumericPropertyId = '1234abcd'
  const updatedproperty = {
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

  it('It should post a property', (done) => {
    const property = {
      city: 'Nairobi',
      estate: 'Kileleshwa',
      type: 'Apartment',
      bedroom: 2,
      bathroom: 2,
      image_url: 'image',
      description: 'Two bedroom spacious apartment in Kileleshwa',
      sale_or_rent: 'sale'
    };
    chai.request(app)
      .post('/api/v1/properties')
      .set('Accept', 'application/json')
      .send(property)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          city: property.city,
          estate: property.estate,
          type: property.type,
          bedroom: property.bedroom,
          bathroom: property.bathroom,
          image_url: property.image_url,
          description: property.description,
          sale_or_rent: property.sale_or_rent
        });
        
        done();
      });
  }).timeout(10000);

  it('It should not create a property with incomplete parameters', (done) => {
    const property = {
      city: 'Nairobi',
      estate: 'Kileleshwa',
      type: 'Apartment',
      bedroom: 2,
      bathroom: 2,
      image_url: 'image'
    };
    chai.request(app)
      .post('/api/v1/properties')
      .set('Accept', 'application/json')
      .send(property)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  }).timeout(10000);

  it('It should get all properties', (done) => {
    chai.request(app)
      .get('/api/v1/properties')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('city');
        res.body.data[0].should.have.property('estate');
        res.body.data[0].should.have.property('type');
        res.body.data[0].should.have.property('bedroom');
        res.body.data[0].should.have.property('bathroom');
        res.body.data[0].should.have.property('image_url');
        res.body.data[0].should.have.property('description');
        res.body.data[0].should.have.property('sale_or_rent');
        done();
      });
  }).timeout(10000);

  it('It should get a particular property', (done) => {
    chai.request(app)
      .get(`/api/v1/properties/${propertyId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('city');
        res.body.data.should.have.property('estate');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('bedroom');
        res.body.data.should.have.property('bathroom');
        res.body.data.should.have.property('image_url');
        res.body.data.should.have.property('description');
        res.body.data.should.have.property('sale_or_rent');
        done();
      });
  }).timeout(10000);

  it('It should not get a particular property with invalid id', (done) => {
    chai.request(app)
      .get(`/api/v1/properties/${invalidPropertyId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Cannot find property with the id ${invalidPropertyId}`);
        done();
      });
  }).timeout(10000);

  it('It should not get a particular property with non-numeric id', (done) => {
    chai.request(app)
      .get(`/api/v1/properties/${nonNumericPropertyId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
                            .eql('Please input a valid numeric value');
        done();
      });
  }).timeout(10000);

  it('It should update a property', (done) => {
    chai.request(app)
      .put(`/api/v1/properties/${propertyId}`)
      .set('Accept', 'application/json')
      .send(updatedproperty)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedproperty.id);
        expect(res.body.data.city).equal(updatedproperty.city);
        expect(res.body.data.estate).equal(updatedproperty.estate);
        expect(res.body.data.type).equal(updatedproperty.type);
        expect(res.body.data.bedroom).equal(updatedproperty.bedroom);
        expect(res.body.data.bathroom).equal(updatedproperty.bathroom);
        expect(res.body.data.image_url).equal(updatedproperty.image_url);
        expect(res.body.data.description).equal(updatedproperty.description);
        expect(res.body.data.sale_or_rent).equal(updatedproperty.sale_or_rent);
        done();
      });
  }).timeout(10000);

  it('It should not update a property with invalid id', (done) => {
    chai.request(app)
      .put(`/api/v1/properties/${invalidPropertyId}`)
      .set('Accept', 'application/json')
      .send(updatedproperty)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Cannot find property with the id: ${invalidPropertyId}`);
        done();
      });
  }).timeout(10000);

  it('It should not update a property with non-numeric id value', (done) => {
    chai.request(app)
      .put(`/api/v1/properties/${nonNumericPropertyId}`)
      .set('Accept', 'application/json')
      .send(updatedproperty)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
                            .eql('Please input a valid numeric value');
        done();
      });
  }).timeout(10000);

  it('It should delete a property', (done) => {
    chai.request(app)
      .delete(`/api/v1/properties/${propertyId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  }).timeout(10000);

  it('It should not delete a property with invalid id', (done) => {
    chai.request(app)
      .delete(`/api/v1/properties/${invalidPropertyId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Property with the id ${invalidPropertyId} cannot be found`);
        done();
      });
  }).timeout(10000);

  it('It should not delete a property with non-numeric id', (done) => {
    chai.request(app)
      .delete(`/api/v1/properties/${nonNumericPropertyId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message').eql('Please provide a numeric value');
        done();
      });
  }).timeout(10000);
});
