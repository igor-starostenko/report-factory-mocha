// report-factory.js

const mocha = require('mocha');
const { sendReport } = require('./api');

const successMessage = 'Report has been successfully submitted to ReportFactory\n'

/**
 * Return a plain-object representation of `test`
 * free of cyclic properties etc.
 *
 * @private
 * @param {Object} test
 * @return {Object}
 */
function formatDetails(test) {
  let err = test.err || null;

  return {
    title: test.title,
    fullTitle: test.fullTitle(),
    duration: test.duration,
    currentRetry: test.currentRetry(),
    err: err,
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
  let pending = [];
  let failures = [];
  let passes = [];

  runner.on('test end', function(test) {
    tests.push(test);
  });

  runner.on('pass', function(test) {
    passes.push(test);
  });

  runner.on('fail', function(test) {
    failures.push(test);
  });

  runner.on('pending', function(test) {
    pending.push(test);
  });

  runner.once('end', function() {
    const report = {
      stats: self.stats,
      tests: tests.map(formatDetails),
      pending: pending.map(formatDetails),
      failures: failures.map(formatDetails),
      passes: passes.map(formatDetails)
    };
    runner.testResults = report;

    sendReport(report)
      .then(() => process.stdout.write(successMessage))
      .catch(error => console.error(error));
  });
}

ReportFactory.description = 'submits test results to ReportFactory';
module.exports = ReportFactory;
