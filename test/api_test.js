const { expect } = require('chai');
const nock = require('nock');
const { sendReport } = require('../lib/api');
const { configure } = require('../lib/config');

describe('ReportFactory', function() {
  const baseUrl = 'http://0.0.0.0:3000';
  const projectName = 'webapp';
  const path = `/api/v1/projects/${projectName}/reports/mocha`;
  const authToken = '82f551b8-dea9-4385-9c4f-d290688391cc';

  before(() => {
    configure({ baseUrl, projectName, authToken });
  });

  describe('API', () => {
    beforeEach(() => {
      nock(baseUrl)
        .post(path)
        .reply(200, { status: 'OK' });
    });

    it('submits a passed test report to ReportFactory', () => {
      const report = {
        stats: {
          suites: 2,
          tests: 0,
          passes: 1,
          pending: 0,
          failures: 0,
          start: '2019-01-20T04:28:34.861Z',
          end: '2019-01-20T04:28:34.867Z',
          duration: 6
        },
        tests: [],
        pending: [],
        failures: [],
        passes: [{
          title: '"before each" hook for "Get a user by username"',
          fullTitle: 'Api Get User tests "before each" hook for "Get a user by username"',
          duration: 2,
          currentRetry: 0,
          err: null,
        }],
      };

      return sendReport(report)
        .then(response => {
          expect(typeof response).to.equal('object');
          expect(response.status).to.equal('OK')
        });
    });

    it('submits a failed test report to ReportFactory', () => {
      const report = {
        stats: {
          suites: 2,
          tests: 0,
          passes: 0,
          pending: 0,
          failures: 1,
          start: '2019-01-20T04:28:34.861Z',
          end: '2019-01-20T04:28:34.867Z',
          duration: 6
        },
        tests: [],
        pending: [],
        failures: [{
          title: '"before each" hook for "Get a user by username"',
          fullTitle: 'Api Get User tests "before each" hook for "Get a user by username"',
          duration: 2,
          currentRetry: 0,
          err: 'ReferenceError: response is not defined\nat Context.beforeEach (test/api_test.js:10:21) } ]',
        }],
        passes: [],
      };

      return sendReport(report)
        .then(response => {
          expect(typeof response).to.equal('object');
          expect(response.status).to.equal('OK')
        });
    });
  });
});
