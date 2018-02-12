const app = require('./server');


if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
let config = require('./config');
let db = process.env.DB || config.DB[process.env.NODE_ENV];
const PORT = db;

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});