const users = require('../models/users');


const getAllUsers = ((req, res, next) => {
  users.find().lean()
    .then(users => {
      res.status(200).json({ users });
      if(users.length < 1) next({articles: 'error'});
    }).catch(next);
});


const getUser = ((req, res, next) => {
  if(req.params.username.length < 2) next({ message: '404, user not found.', status: 404 });
  users.find({username: req.params.username}).lean()
    .then(user => {
      return res.json({ user });
    }).catch(next);

});

module.exports = {getUser, getAllUsers};