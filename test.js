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

});