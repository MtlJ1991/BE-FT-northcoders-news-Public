const comments = require('../models/comments');


const changeNumOfVotes = ((req, res, next) => {
  if ((req.query.vote !== 'up') && (req.query.vote !== 'down')) next({ message: 'Invalid vote command, please vote up or down.', status: 400 });

  return comments.findByIdAndUpdate(req.params.comment_id)
    .then(comment => {
      if(req.query.vote === 'up') comment.votes ++;
      else if(req.query.vote === 'down') comment.votes --;
      return comment.save();
    }).then(comment => res.status(200).send({comment}))
    .catch(next);
});

    
const deleteComment = ((req, res, next) => {
  if (req.params.comment_id.length !== 24) next({ error: 'Invalid comment, can\'t remove', status: 400});

  return comments.findByIdAndRemove(req.params.comment_id).lean()
    .then(comment => {
      const commentId = req.params.comment_id;
      res.status(200).send(`comment:${commentId} has been deleted`);
    }).catch(next);
});

module.exports = {changeNumOfVotes, deleteComment};