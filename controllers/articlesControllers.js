const articles = require('../models/articles');
const comments = require('../models/comments');


const getAllArticles = ((req, res, next ) => {
  
  articles.find().lean()
    .then(articles => {
      res.status(200).json({ articles });
      if(articles.length < 1) next({articles: 'error'});
    }).catch(err => {
      return next({
        status: 404,
        message: '404, Path not found!'
      });
    });
});


const getCommentsForArticle = ((req, res, next) => {
  const articleId = req.params.article_id;
  if (articleId.length !== 24) next({ error: 'invalid article name length' });
  comments.find({ belongs_to: articleId }, { __v: false })
    .then((comments) => {
      if (comments.length === 0) next({ error: 'empty comment' });
      return res.json({comments});
    })
    .catch(next);
});




const addCommetsToArticle = ((req, res, next) => {
  const addedComment = { body: req.body.body, belongs_to: req.params.article_id };
  new comments(addedComment).save()
    .then(comment => {
      res.status(201).json({ comment });
    }).catch(err => {
      return next({
        status: 404,
        message: '404, Path not found!'
      });
    });
});


const changeNumOfVotes = ((req, res, next) => {
  return articles.findByIdAndUpdate(req.params.article_id).lean()

    .then(article => {
      if(req.query.vote === 'up') article.votes ++;
      else if(req.query.vote === 'down') article.votes --;
      res.status(200).json({article});
    }).catch(err => {
      return next({
        status: 204,
        message: 'You have to vote either up or down!'
      });
    
    });

});


module.exports = {
  getAllArticles,
  getCommentsForArticle,
  addCommetsToArticle,
  changeNumOfVotes
};