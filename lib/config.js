// /lib/configuration.js

function error(property) {
  throw {
    name: 'ConfigurationError',
    message: `${property} is not defined.\nPlease refer to ReportFactory documentation.`,
  };
}

const requiredProperties = ['baseUrl', 'projectName', 'authToken'];

function Config() {
  requiredProperties.forEach(property => {
    if (!this[property]) {
      error(property);
    }
  });
};

Config.prototype.baseUrl = 'http://0.0.0.0:3000';
Config.prototype.projectName = null;
Config.prototype.tags = [];
Config.prototype.authToken = null;

function configuration() {
  return new Config();
}

function configure(options) {
  Object.keys(options).forEach(key => {
    Config.prototype[key] = options[key];
  });
}

module.exports = { configuration, configure };
