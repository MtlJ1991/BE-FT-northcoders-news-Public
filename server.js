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

app.use(function(err, req, res, next) {
  res.send({error: err.message});
});

app.use('/*', (req, res) => {
  res.status(404).send('Page not found!');
});

app.use((err, req, res, next) => {
  res.status(500).send({err});
});


module.exports = app;