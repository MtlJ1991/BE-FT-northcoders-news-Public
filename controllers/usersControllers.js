const users = require('../models/users');

const getUser = ((req, res, next) => {
  if(req.params.username.length < 2) next({ message: '404, user not found.', status: 404 });
  users.find({username: req.params.username}).lean()
    .then(user => {
      return res.json({ user });
    }).catch(next);

});

module.exports = getUser;