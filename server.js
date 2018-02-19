if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const router =require('./router/index');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const path  = require('path');
const cors = require('cors');
let db = config.DB[process.env.NODE_ENV] || process.env.DB;



mongoose.Promise = Promise;

mongoose.connect(db, {useMongoClient: true})
  .then(() => console.log('successfully connected to', db))
  .catch(err => console.log('connection failed', err));

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});
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

  if (err.message ===  'Invalid comment, can\'t remove') {
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