const users = require('../models/users');

const getUser = ((req, res, next) => {
  users.find({username: req.params.username}).lean()
    .then(user => {
      return res.json({ user });
    }).catch(err => {
      return next({
        status: 404,
        message: 'bad path!'
      });
    
    });

});

module.exports = getUser;