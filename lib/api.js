// /lib/api.js
const fetch = require('node-fetch');
const { configuration } = require('./config');

/**
 * Request path
 *
 * @private
 * @param {String} projectName
 * @return {String}
 */
function sendReportPath(projectName) {
  return `/api/v1/projects/${projectName}/reports/mocha`;
}

/**
 * Required headers
 *
 * @private
 * @param {String} authToken
 * @return {Object}
 */
function formatHeaders(authToken) {
  return {
    'Content-Type': 'application/json',
    'X-API-KEY': authToken,
  };
}

/**
 * Generates a JSON API formatted payload
 *
 * @private
 * @param {Object} report
 * @param {Array} tags
 * @return {Object}
 */
function formatPayload(report, tags) {
  const attributes = Object.assign({}, report, { tags });
  return { data: { type: 'mocha_report', attributes } };
}

/**
 * Sends report object to the ReportFactory server
 *
 * @private
 * @param {String} host
 * @param {String} projectName
 * @param {Object} report
 * @return {Object}
 */
function sendReport(report) {
  const { baseUrl, authToken, projectName, tags } = configuration();
  const path = sendReportPath(projectName);
  const body = formatPayload(report, tags);

  return fetch(baseUrl + path, {
    method : 'POST',
    headers: formatHeaders(authToken),
    body : JSON.stringify(body),
  }).then(response => response.json())
}

module.exports = { sendReport };
