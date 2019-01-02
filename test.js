// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server');
// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Meetup', () => { // eslint-disable-line on-undef
  describe('GET /api/v1/meetups', () => { // eslint-disable-line no-undef
    it('should return all meetup record', (done) => { // eslint-disable-line no-undef
      chai.request(app)
        .get('/api/v1/meetups')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.data.should.not.have.lengthOf(0);
          done();
        });
    });
  });

  describe('GET /api/v1/meetups/:id', () => { // eslint-disable-line no-undef
    it('should get a single meetup record', (done) => { // eslint-disable-line no-undef
      const id = 1;
      chai.request(app)
        .get(`/api/v1/meetups/${id}`)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.data.should.have.lengthOf(1);
          done();
        });
    });

    it('should return error message for non-existing meetup', (done) => { // eslint-disable-line no-undef
      const id = 10000;
      chai.request(app)
        .get(`/api/v1/meetups/${id}`)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  describe('GET /api/v1/meetups/upcoming', () => { // eslint-disable-line no-undef
    it('should get all upcoming meetup record', (done) => { // eslint-disable-line no-undef
      chai.request(app)
        .get('/api/v1/meetups/upcoming')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.status.should.equal(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

});