const { expect } = require('chai');
const nock = require('nock');
const { sendReport } = require('../lib/api');
const { configure } = require('../lib/config');

describe('ReportFactory', function() {
  const baseUrl = 'http://0.0.0.0:3000';
  const projectName = 'x-webapp';
  const path = `/api/v1/projects/${projectName}/reports/mocha`;
  const authToken = '82f551b8-dea9-4385-9c4f-d290688391cc';

  before(() => {
    configure({ baseUrl, projectName, authToken });
  });

  describe('API', () => {
    const passedReport = {
      suites: 2,
      total: 1,
      passes: 1,
      pending: 0,
      failures: 0,
      started: '2019-01-20T04:28:34.861Z',
      ended: '2019-01-20T04:28:34.867Z',
      duration: 6,
      tests: [{
        title: 'submits a passed test report to ReportFactory',
        fullTitle: 'ReportFactory API submits a passed test report to ReportFactory',
        body: '() => {\n  return sendReport(report);\n}',
        duration: 18,
        status: 'passed',
        speed: 'fast',
        file: '/Users/username/ReportFactory/report-factory-mocha/test/api_test.js',
        timedOut: false,
        pending: false,
        sync: true,
        async: 0,
        currentRetry: 0,
        err: null,
      }],
    };

    beforeEach(() => {
      nock(baseUrl)
        .post(path)
        .reply(200, { status: 'OK' });
    });

    it('submits a passed test report to ReportFactory', () => {
      return sendReport(passedReport)
        .then(response => {
          expect(typeof response).to.equal('object');
          expect(response.status).to.equal('OK')
        });
    });

    it('submits a failed test report to ReportFactory', () => {
      const failedReport = { ...passedReport };
      const error = 'ReferenceError: response is not defined\nat Context.beforeEach (test/api_test.js:10:21) } ]';
      failedReport.tests[0].status = 'failed';
      failedReport.tests[0].err = error;

      return sendReport(failedReport)
        .then(response => {
          expect(typeof response).to.equal('object');
          expect(response.status).to.equal('NO')
        });
    });
  });
});
