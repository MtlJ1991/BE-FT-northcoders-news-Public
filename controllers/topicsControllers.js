const topics = require('../models/topics');
const articles = require('../models/articles');


const getAllTopics = ((req, res, next) => {
  topics.find().lean()
    .then(topic => {
      return res.json({
        topic
      }).catch(err => {
        return next({
          status: 404,
          message: 'bad path!'
        });
      
      });
    });
});


const getArticlesByTopic = ((req, res, next) => {

  topics.find({title: req.params.topic_title})

    .then(topic => {
      let title = topic[0].title.toLowerCase();
      return articles.find({belongs_to: title });
    })
    .then(articles => {
      res.json({articles});
    })
    .catch(err => {
      return next({
        status: 404,
        message: 'bad path!'
      });
    
    });
});

module.exports = {
  getAllTopics,
  getArticlesByTopic
};