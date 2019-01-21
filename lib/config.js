// /lib/configuration.js

function error(property) {
  throw {
    name: 'ConfigurationError',
    message: `${property} is not defined.\nPlease refer to ReportFactory documentation.`,
  };
}

const requiredProperties = ['baseUrl', 'projectName', 'authToken'];

/**
 * Sets Config. Validates if required properties are set.
 *
 * @private
 */
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

/**
 * Generates an instance of Config with all configured properties.
 *
 * @return {Config}
 */
function configuration() {
  return new Config();
}

/**
 * A hook that allows to set Config properties.
 *
 * @param {Object} options
 * @property {String} baseUrl
 * @property {String} projectName
 * @property {Array} tags
 * @property {String} authToken
 */
function configure(options) {
  Object.keys(options).forEach(key => {
    Config.prototype[key] = options[key];
  });
}

module.exports = { configuration, configure };
