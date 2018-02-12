const app = require('./server');


if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
const PORT = require('./config').PORT[process.env.NODE_ENV];
let config = require('./config');
let db = process.env.DB || config.DB[process.env.NODE_ENV];

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});