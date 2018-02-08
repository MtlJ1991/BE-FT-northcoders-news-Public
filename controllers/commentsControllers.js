const comments = require('../models/comments');


const changeNumOfVotes = ((req, res, next) => {
  return comments.findByIdAndUpdate(req.params.comment_id).lean()
    .then(comment => {
      if (req.query.vote === 'up') comment.votes++;
      else if (req.query.vote === 'down') comment.votes--;
      res.json({comment});
    });
});

const  deleteComment = ((req, res, next) => {
  return comments.findByIdAndRemove(req.params.comment_id).lean()
    .then(comment => {
      const commentId = req.params.comment_id;
      res.status(200).send(` comment:${commentId} has been deleted`);
    }).catch(err => {
      return next({
        status: 204,
        message: 'Comment not deleted!'
      });
    });
});

module.exports = {changeNumOfVotes, deleteComment};