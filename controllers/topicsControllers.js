const topics = require('../models/topics');
const articles = require('../models/articles');


const getAllTopics = ((req, res, next) => {
  topics.find().lean()
    .then(topic => {
      return res.status(200).json({topic});
    }).catch(err => {
      return next({
        status: 404,
        message: '404, page not found!'
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
        message: '404, page not found!'
      });
    
    });
});

module.exports = {
  getAllTopics,
  getArticlesByTopic
};