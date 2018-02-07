const expect = require('chai').expect;
const seed = require('../seed/test.seed');
const app = require('../server');
const request = require('supertest')(app);
const mongoose = require('mongoose');

describe('API endpoints', () => {
  let docs = {};
  beforeEach(function () {
    return mongoose.connection.dropDatabase()
      .then(() => {
        return seed();
      })
      .then((data) => {
        docs = data;
        return;
      });
  });
  after(() => {
    mongoose.disconnect();
  });
  
  describe('API endpoint /api/topics', () => {
    it('GET /topics returns an object of all topics', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(Object.values(res.body).length).to.be.eql(1);
          expect(Object.keys(res.body).length).to.be.eql(1);
          expect(res.body.topic.length).to.be.eql(3);
          return;
        });
    });


    it('GET /topics/:topic_id/articles returns an object of all articles related to that topic', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(Object.values(res.body).length).to.be.eql(1);
          expect(Object.keys(res.body).length).to.be.eql(1);
          expect(res.body.topic.length).to.be.eql(2);
          return;
        });
    });

    it('GET /topics/:topic_id/articles returns an object of all articles related to that topic', () => {
      return request
        .get('/api/topics/Football/articles')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(Object.values(res.body).length).to.be.eql(1);
          expect(Object.keys(res.body).length).to.be.eql(1);
          expect(res.body.articles.length).to.be.eql(1);
          return;
        });
    });
  

  
  });
});