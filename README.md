# ReportFactory Mocha reporter

[![Build Status](https://travis-ci.org/igor-starostenko/report-factory-mocha.svg?branch=master)](https://travis-ci.org/igor-starostenko/report-factory-mocha)
[![Maintainability](https://api.codeclimate.com/v1/badges/7298717c344ef9544036/maintainability)](https://codeclimate.com/github/igor-starostenko/report-factory-mocha/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7298717c344ef9544036/test_coverage)](https://codeclimate.com/github/igor-starostenko/report-factory-mocha/test_coverage)

*ReportFactory* helps you save each of your test runs so that they are always available for reports and analytics.
It consists of three parts:
1. A [rails server](https://github.com/igor-starostenko/report_factory) that provides an interface via JSON API and saves your test runs in a DB;
2. A [web dashboard](https://github.com/igor-starostenko/report_factory-web) which gives you an easy way to configure your test projects and reports;
3. And a test reporter that automatically sends reports to the server. This repo is the reporter for [Mocha](https://mochajs.org/).

## Getting Started

Follow these [instructions](https://github.com/igor-starostenko/report_factory/blob/master/setup/INSTRUCTIONS.md) to get *Report Factory* running with *Docker*. The configuration is ready for production.

## Installation

Install with npm as a development dependency:

    $ npm install --save-dev report-factory-mocha

## Usage

Before you start using this reporter, make sure you have the [ReportFactory](https://github.com/igor-starostenko/report_factory) server deployed and running.

To setup this reporter to work with your Mocha tests, you need to configure it first. You can set up a root-level hook that will cause the callback to run before all your tests. For example:

```javascript
const reportFactory = require('report-factory-mocha');

before(function() {
  reportFactory.configure({
    baseUrl: "The url of the ReportFactory server. It's 'http://0.0.0.0:3000' if you're running locally",
    projectName: "The name of the project that you are testing. Needs to be previously created in ReportFactory",
    tags: ['Tags', 'to', 'help', 'you', 'group', 'your', 'reports'],
    authToken: "Your user X_API_KEY. Can be found in ReportFactory in your user information"
  });
});
```

Then you can just simply run your mocha tests with `--reporter report-factory-mocha` and your reports will be available on the server after each test run.
You can use [mocha-multi-reporters](https://www.npmjs.com/package/mocha-multi-reporters) to run it in parallel with other reporters.

## Development

After checking out the repo, run `npm install` to install dependencies.

Run tests with `npm run test`.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/igor-starostenko/report-factory-mocha. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the `report-factory-mocha` project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/igor-starostenko/report_factory-rspec/blob/master/CODE_OF_CONDUCT.md).
