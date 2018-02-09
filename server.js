if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const router =require('./router/index');
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let app = express();
let config = require('./config');
let db = config.DB[process.env.NODE_ENV] || process.env.DB;

mongoose.Promise = Promise;

mongoose.connect(db, {useMongoClient: true})
  .then(() => console.log('successfully connected to', db))
  .catch(err => console.log('connection failed', err));

app.use(bodyParser.json());
app.use('/api', router);

// error handling function 


app.use((err,req,res,next) => {
  if (err.message === 404) {
    res.status(404).send(err.message);
    next();
  }

  if (err.message === 'Invalid vote command, please vote up or down.') {
    res.status(400).send(err.message);
    next();
  }
  if (err.message === 'Invalid comment, please use the correct format') {
    res.status(400).send(err.message);
    next();
  }

  if (err.message === '404, user not found.') {
    res.status(404).send(err.message);
    next();
  }
    

  
});

app.use((err, req, res, next) => {
  (err.name === 'CastError') ? res.status(400).send('cast error - check url') :
    res.status(500).json(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({err});
});


module.exports = app;