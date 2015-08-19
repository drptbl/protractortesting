var jasmineReporters = require('jasmine-reporters');
var SpecReporter = require('jasmine-spec-reporter');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var mysql = require('mysql');


exports.config = {

  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['specs/*.js'],

  // Alternatively, suites may be used. When run without a command line
  // parameter, all suites will run. If run with --suite=smoke or
  // --suite=smoke,full only the patterns matched by the specified suites will
  // run.
  suites: {
    smoke: 'spec/smoketests/*.js',
    full: 'spec/*.js',
    homepage: 'spec/homePageSpec.js'
  },

  // The timeout in milliseconds for each script run on the browser. This should
  // be longer than the maximum time your application needs to stabilize between
  // tasks.
  allScriptsTimeout: 11000,

  // How long to wait for a page to load.
  getPageTimeout: 10000,

  // If true, protractor will restart the browser between each test.
  // CAUTION: This will cause your tests to slow down drastically.
  restartBrowserBetweenTests: false,

  // ---------------------------------------------------------------------------
  // ----- The test framework --------------------------------------------------
  // ---------------------------------------------------------------------------

  // Test framework to use. This may be one of:
  //  jasmine, jasmine2, cucumber, mocha or custom.
  //
  // When the framework is set to "custom" you'll need to additionally
  // set frameworkPath with the path relative to the config file or absolute
  //  framework: 'custom',
  //  frameworkPath: './frameworks/my_custom_jasmine.js',
  // See github.com/angular/protractor/blob/master/lib/frameworks/README.md
  // to comply with the interface details of your custom implementation.
  //
  // Jasmine and Jasmine2 are fully supported as test and assertion frameworks.
  // Mocha and Cucumber have limited support. You will need to include your
  // own assertion framework (such as Chai) if working with Mocha.
  framework: 'jasmine2',

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    // If true, display spec names.
    isVerbose: true,
    // If true, print colors to the terminal.
    showColors: true,
    // If true, include stack traces in failures.
    includeStackTrace: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 30000,
    // Remove protractor dot reporter
    print: function() {}
  },

  onPrepare: function(){
    'use strict';

    //connect to database
    var connection = mysql.createConnection({
    host : 'mysql.stgwaw.opigram',
    user : 'monad',
    password : 'monad',
    database: 'monad'
    });
    connection.connect();

    // maximize window
    browser.driver.manage().window().maximize();


    // html reporter (protractor-html-screenshot-reporter)
    //   jasmine.getEnv().addReporter(new HtmlReporter({
    //   baseDirectory: '../tmp/htmltestreports',
    //   preserveDirectory: false,
    //   docName: 'report.html',
    //   docTitle: 'Generated test report',
    //   takeScreenShotsForSkippedSpecs: true,
    //   takeScreenShotsOnlyForFailedSpecs: false
    // }));
    

    // html reporter (protractor-jasmine2-html-reporter)
    jasmine.getEnv().addReporter(
    new HtmlScreenshotReporter({
    dest: '.tmp/htmltestreports',
    filename: 'report.html',
    ignoreSkippedSpecs: false,
    captureOnlyFailedSpecs: false,
    reportOnlyFailedSpecs: false
    }));
    
    // Disable animations so e2e tests run more quickly
    var disableNgAnimate = function() {
      angular.module('disableNgAnimate', []).run(['$animate', function($animate) {
        $animate.enabled(false);
      }]);
    };

    browser.addMockModule('disableNgAnimate', disableNgAnimate);

    // Store the name of the browser that's currently being used.
    browser.getCapabilities().then(function(caps) {
    browser.params.browser = caps.get('browserName');
     });

    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
        consolidateAll: false,
        savePath: '.tmp/junittestreports'
    }));
      // add jasmine spec reporter
      jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: 'summary',    // display stacktrace for each failed assertion, values: (all|specs|summary|none)
            displayFailuresSummary: true, // display summary of all failures after execution
            displayPendingSummary: true,  // display summary of all pending specs after execution
            displaySuccessfulSpec: true,  // display each successful spec
            displayFailedSpec: true,      // display each failed spec
            displayPendingSpec: true,    // display each pending spec
            displaySpecDuration: true,   // display each spec duration
            displaySuiteNumber: true,    // display each suite number (hierarchical)
            colors: {
                   success: 'green',
                   failure: 'red',
                   pending: 'yellow'
            },
            prefixes: {
            success: '✓ ',
            failure: '✗ ',
            pending: '* '
            },
      }));
      // If you need to interact with a non-Angular page, you may access the wrapped webdriver instance
      // directly with browser.driver. This is a an alias.
      global.dv = browser.driver;
  },
   afterAll: function(){
    'use strict';
    connection.end();
  }
};