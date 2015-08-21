var jasmineReporters = require('jasmine-reporters');
var SpecReporter = require('jasmine-spec-reporter');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
// var mysql = require('mysql');

exports.config = {
  
     plugins: [
     // protractor e2e coverage plugin [based on dom without instrumentation]
     // doesnt work, issue posted on github
     // {
     // path: 'node_modules/protractor-e2e-coverage/index.js',
     // outdir: 'test/coverage',
     // elements: [ 
     // add one for each DOM type 
     // {
     //  'type': 'button',
     //  'events': ['click'], // array of events to listen to 
     //  'elements': []
     // }
     // ]
     // },
     
     // extensions adding these features (you work on classes):
     // expect(theElement.hasClass('a')).toBeTruthy();
     // expect(theElement.hasClasses(['a', 'c'])).toBeTruthy();
     // expect(theElement.hasClass('x')).toBeFalsy();
     // expect(theElement.hasClasses(['a', 'x'])).toBeFalsy();
        {
        path: 'node_modules/protractor-extensions/index.js'
        }
     // another coverage plugin, needs instrumentation, but works   
     // {
     // path: 'node_modules/protractor-istanbul-plugin'
     // }
        ],

     // console plugin for all browsers - confirm working
     // readme: logLevels: Inclusive Array filter for which log levels
     // to show. Can be any of 'debug', 'info', 'warning' and
     // 'severe'. Defaults to ['severe', 'warning'].
     //  {
     //  package: 'protractor-console',
     //  logLevels: ['info']
     //  }
     //  ],
       
    //{
    // having some issues, need to fix them.
    // path: 'node_modules/protractor/plugins/timeline/index.js',
    // Output json and html will go in this folder.
    // outdir: 'timelines',
    // Optional - if sauceUser and sauceKey are specified, logs from
    // SauceLabs will also be parsed after test invocation.
    // sauceUser: 'Jane',
    // sauceKey: 'abcdefg'
    // },
    
    // accessibility testing plugin - able to use tenon.io or Chrome Accessibility Developer Tools
    // {
    // chromeA11YDevTools: {
    // treatWarningsAsFailures: false
    // },
    // path: 'node_modules/protractor/plugins/accessibility'
    // }
    
    // [dont use] console plugin - chrome only - allows to save browser console output and fail tests on errors 
    // {
    // path: 'node_modules/protractor/plugins/console',
    // failOnWarning: false,
    // failOnError: false,
    // exclude some strings or regex from fails
    // exclude: []
    // }],

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
  
  baseUrl: 'https://yougov.co.uk',

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
    // var connection = mysql.createConnection({
    // host : 'x',
    // user : 'x',
    // password : 'x',
    // database: 'x'
    // });
    // connection.connect();

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