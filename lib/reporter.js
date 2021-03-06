// report-factory.js

const mocha = require('mocha');
const { sendReport } = require('./api');

const successMessage =
  'Report has been successfully submitted to ReportFactory\n';

/**
 * Return a plain-object representation of `test`
 * free of cyclic properties etc.
 *
 * @private
 * @param {Object} test
 * @return {Object}
 */
function formatDetails(test) {
  return {
    title: test.title,
    fullTitle: test.fullTitle(),
    body: test.body,
    duration: test.duration,
    status: test.state,
    speed: test.speed,
    file: test.file,
    timedOut: test.timedOut,
    pending: test.pending,
    sync: test.sync,
    async: test.async,
    currentRetry: test.currentRetry(),
    err: test.err ? test.err.toString() : null,
  };
}

/**
 * Formats report from stats and test results
 *
 * @private
 * @param {Object} stats
 * @param {Array} tests
 * @return {Object}
 */
function formatReport(stats, tests) {
  return {
    suites: stats.suites,
    total: stats.tests,
    passes: stats.passes,
    pending: stats.pending,
    failures: stats.failures,
    duration: stats.duration,
    started: stats.start,
    ended: stats.end,
    tests: tests.map(formatDetails),
  };
}

/**
 * Initialize a new `ReportFactory` reporter.
 *
 * @public
 * @class ReportFactory
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner
 */
function ReportFactory(runner) {
  mocha.reporters.Base.call(this, runner);

  let self = this;
  let tests = [];

  runner.on('test end', function(test) {
    tests.push(test);
  });

  runner.once('end', function() {
    const report = formatReport(self.stats, tests);

    runner.testResults = report;

    sendReport(report)
      .then(() => process.stdout.write(successMessage))
      .catch(error => console.error(error)); // eslint-disable-line no-console
  });
}

ReportFactory.description = 'submits test results to ReportFactory';
module.exports = ReportFactory;
