// /lib/api.js
const fetch = require('node-fetch');
const { configuration } = require('./config');

function sendReportPath(projectName) {
  return `/api/v1/projects/${projectName}/reports/mocha`;
}

function formatHeaders(authToken) {
  return {
    'Content-Type': 'application/json',
    'X-API-KEY': authToken,
  };
}

function formatPayload(report, tags) {
  const attributes = { ...report, tags };
  return { data: { type: 'mocha_report', attributes } };
}

/**
 * Sends report object to the ReportFactory server
 *
 * @private
 * @param {String} host
 * @param {String} projectName
 * @param {Object} report
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
