const articles = require('../models/articles');
const comments = require('../models/comments');


const getAllArticles = ((req, res, next ) => {
  articles.find().lean()
    .then(topic => {
      return res.json({
        topic
      });
    });
});



const getCommentsForArticle = ((req, res, next) => {
  return comments.find({ belongs_to: req.params.article_id })
    .then(comments => {
      res.json({ comments });
    });
});


const addCommetsToArticle = ((req, res, next) => {
  const addedComment = { body: req.body.body, belongs_to: req.params.article_id };
  new comments(addedComment).save()
    .then(comment => {
      res.status(201).json({ comment });
    });
});


const changeNumOfVotes = ((req, res, next) => {
  return articles.findByIdAndUpdate(req.params.article_id).lean()
    .then(article => {
      if(req.query.vote === 'up') article.votes ++;
      else if(req.query.vote === 'down') article.votes --;
      res.status(200).json({article});
    });

});


module.exports = {
  getAllArticles,
  getCommentsForArticle,
  addCommetsToArticle,
  changeNumOfVotes
};