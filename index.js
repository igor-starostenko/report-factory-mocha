// index.js

const reporter = require('./lib/reporter');
const config = require('./lib/config');

Object.keys(config).forEach(property => {
  reporter[property] = config[property];
});

module.exports = reporter;
