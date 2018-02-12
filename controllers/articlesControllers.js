const articles = require('../models/articles');
const comments = require('../models/comments');


const getAllArticles = ((req, res, next ) => {
  
  articles.find().lean()
    .then(articles => {
      res.status(200).json({ articles });
      if(articles.length < 1) next({articles: 'error'});
    }).catch(next);
});


const getCommentsForArticle = ((req, res, next) => {
  const articleId = req.params.article_id;
  if (articleId.length !== 24) next({ error: 'invalid article name length' });
  comments.find({ belongs_to: articleId }, { __v: false })
    .then((comments) => {
      if (comments.length === 0) next();
      return res.json({comments});
    })
    .catch(next);
});


const addCommetsToArticle = ((req, res, next) => {
  if(req.body.body.length === 0) next({ message: 'Invalid comment, please use the correct format', status: 400 });
  const addedComment = { body: req.body.body, belongs_to: req.params.article_id };
  new comments(addedComment).save()
    .then(comment => {
      res.status(201).json({ comment });
    }).catch(next);
});


const changeNumOfVotes = ((req, res, next) => {
  if ((req.query.vote !== 'up') && (req.query.vote !== 'down')) next({ message: 'Invalid vote command, please vote up or down.', status: 400 });
  return articles.findByIdAndUpdate(req.params.article_id).lean()
    .then(article => {
      if(req.query.vote === 'up') article.votes ++;
      else if(req.query.vote === 'down') article.votes --;
      res.json({article});
      article.save();
    }).then(article => res.status(200).send({article}))
    .catch(next);
});


module.exports = {
  getAllArticles,
  getCommentsForArticle,
  addCommetsToArticle,
  changeNumOfVotes
};