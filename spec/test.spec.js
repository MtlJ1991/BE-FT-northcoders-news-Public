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
  
  after(() => mongoose.disconnect());
  
  describe('API endpoint /api/topics & /api/articles', () => {
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

    it('GET /articles returns an object of all articles', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(Object.values(res.body.articles).length).to.be.eql(2);
          return;
        });
    });

    it('GET /users returns an object of all users', () => {
      return request
        .get('/api/users')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.users.length).to.be.eql(1);
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

    it('GET should return all of the comments from the article with the ID provided', () => {
      const articleId = docs.articles[0]._id;
      return request
        .get(`/api/articles/${articleId}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.comments.length).to.equal(2);
          return;
        });
    });

    it('POST should create a new comment.', () => {
      const articleId = docs.articles[0]._id;
      return request
        .post(`/api/articles/${articleId}/comments`)
        .send({'body': 'Wooooop'})
        .expect(201)
        .then(() => {
          return request.get(`/api/articles/${articleId}/comments`);
        })
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.comments.length).to.equal(3);
          return;
  
        });
    });

    it('PUT will increase the number of votes an article has.', () => {
      const articleId = docs.articles[0]._id;
      return request
        .put(`/api/articles/${articleId}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.article.votes).to.equal(1);
          return;
  
        });
    });

    it('PUT will decrease the number of votes an article has.', () => {
      const articleId = docs.articles[0]._id;
      return request
        .put(`/api/articles/${articleId}?vote=down`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.article.votes).to.equal(-1);
          return;
    
        });
    });


    describe('API endpoint /comments', () => {

      it('PUT will increase the number of votes a comment has.', () => {
        const commentId = docs.comments[0]._id;
        return request
          .put(`/api/comments/${commentId}?vote=up`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object');
            expect(res.body.comment.votes).to.equal(1);
            return;
  
          });
      });

      it('PUT will decrease the number of votes a comment has.', () => {
        const commentId = docs.comments[0]._id;
        return request
          .put(`/api/comments/${commentId}?vote=down`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object');
            expect(res.body.comment.votes).to.equal(-1);
            return;
    
          });
      });

      it('DELETE should remove a new comment.', () => {
        const commentId = docs.comments[0]._id;      return request
          .delete(`/api/comments/${commentId}`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object');
            expect(res.body).to.eql({});
            return;
  
          });
      });

      describe('API endpoint /users/:user_id', () => {

        it('GET should return users by ID', () => {
          const userId = docs.user.id;
          return request
            .get(`/api/users/${userId}`)
            .expect(200)
            .then(res => {
              expect(res.body).to.be.an('object');
              expect(res.body.user.length).to.equal(0);
              expect(Object.keys(res.body).length).to.be.eql(1);
              return;
            });
        });
      });

      describe('API endpoint errors to be handled', () => {

        it('returns a 404 with an error message on an invalid GET request', () => {
          return request
            .get('/api/articles/123')
            .expect(404)
            .then(res => {
              expect(res.status).to.equal(404);

            });
        });

        it('returns a 400 with an error message on an invalid GET request', () => {
          return request
            .get('/api/articles/123/comments')
            .expect(400)
            .then(res => {
              expect(res.status).to.equal(400);
              expect(res.text).to.equal('cast error - check url');

            });
        });

        it('returns a 400 error and message if an invalid query is passed on comment votes.', () => {
          const commentId = docs.comments[0]._id;
          return request
            .put(`/api/comments/${commentId}?vote=dwn`)
            .expect(400)
            .then(res => {
              expect(res.status).to.equal(400);
              expect(res.text).to.equal('Invalid vote command, please vote up or down.');
              return;
      
            });
        });

        it('returns a 400 error and message if an invalid query is passed on article votes.', () => {
          const commentId = docs.comments[0]._id;
          return request
            .put(`/api/comments/${commentId}?vote=ukpp`)
            .expect(400)
            .then(res => {
              expect(res.status).to.equal(400);
              expect(res.text).to.equal('Invalid vote command, please vote up or down.');
              return;
    
            });
        });

        it('will return a 404 error for an invalid user', () => {
          const userId = docs.user.id;
          return request
            .get('/api/users/1')
            .expect(404)
            .then(res => {
              expect(res.status).to.equal(404);
              expect(res.text).to.equal('404, user not found.');
              return;
            });
        });

        it('POST should create a new comment.', () => {
          const articleId = docs.articles[0]._id;
          return request
            .post(`/api/articles/${articleId}/comments`)
            .send({'body': ''})
            .expect(400)
            .then((res) => {
              expect(res.status).to.equal(400);            
              expect(res.text).to.equal('Invalid comment, please use the correct format');

      
            });
        });

        it('will return an error if an invalid comment id is given when making a delete request.', () => {
          return request
            .delete('/api/comments/5a7da24fef50584178e3a4')
            .expect(400)
            .then(res => {
              expect(res.status).to.equal(400);            
              expect(res.text).to.equal('cast error - check url');
              return;
    
            });
        });
  
      });
    });
  });
});