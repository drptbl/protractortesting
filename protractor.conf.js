 var jasmineReporters = require('jasmine-reporters');
 var SpecReporter = require('jasmine-spec-reporter');

// not working with visualreview
// var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

// var mysql = require('mysql');

// visualreview module
 const VisualReview = require('visualreview-protractor');
 var vr = new VisualReview({
  hostname: 'localhost',
  port: 7000
 });

// needed for screenshot on fail and saving browser console logs - not really needed
// can be replaced by better npm modules
/*
var fs = require('fs'),
path = require('path');

// Add global spec helpers in this file
var getDateStr = function () {
var d = (new Date() + '').replace(new RegExp(':', 'g'), '-').split(' ');
// example: "2013-Sep-03-21:58:03"
return [d[3], d[1], d[2], d[4]].join('-');
};

var errorCallback = function (err) {
console.log(err);
};

// create a new javascript Date object based on the timestamp
var timestampToDate = function (unix_timestamp) {
    var date = new Date(unix_timestamp);
    // hours part from the timestamp
    var hours = date.getHours();
    // minutes part from the timestamp
    var minutes = date.getMinutes();
    // seconds part from the timestamp
    var seconds = date.getSeconds();

    var timeValues = [hours, minutes, seconds];
    timeValues.forEach(function (val) {
        if (val.length < 2) {
            // padding
            val = '0' + val;
        }
    });
    // will display time in 10:30:23 format
    return hours + ':' + minutes + ':' + seconds;
};
*/

exports.config = {
     
      // visualreview
       beforeLaunch: function () {
      // Creates a new run under project name 'myProject', suite 'mySuite'. 
      // Make sure that there's a project with this name before running the test.
       return vr.initRun('YouGov', 'Sixth');
       },
     
      // visualreview
       afterLaunch: function (exitCode) {
      // finalizes the run, cleans up temporary files 
       return vr.cleanup(exitCode);
       },
    
     // saucelabs and travis ci config smoke example
     // https://github.com/angular/protractor/blob/master/spec/ciSmokeConf.js
     
     // saucelabs and travis ci config full example
     // https://github.com/angular/protractor/blob/master/spec/ciFullConf.js
  
     plugins: [
     // protractor e2e coverage plugin [based on dom without instrumentation]
     // doesnt work, issue posted on github
     /*
      {
      path: 'node_modules/protractor-e2e-coverage/index.js',
      outdir: 'test/coverage',
      elements: [ 
      add one for each DOM type 
      {
       'type': 'button',
       'events': ['click'], // array of events to listen to 
       'elements': []
      }
      ]
      },
     */
     
     // extensions adding these features (you work on classes):
     // expect(theElement.hasClass('a')).toBeTruthy();
     // expect(theElement.hasClasses(['a', 'c'])).toBeTruthy();
     // expect(theElement.hasClass('x')).toBeFalsy();
     // expect(theElement.hasClasses(['a', 'x'])).toBeFalsy();
        {
        path: 'node_modules/protractor-extensions/index.js'
        }
     /*
     // another coverage plugin, needs instrumentation, but works   
      {
      path: 'node_modules/protractor-istanbul-plugin'
      }
     */
      ],

     /*
     // console plugin for all browsers - confirm working
     // readme: logLevels: Inclusive Array filter for which log levels
     // to show. Can be any of 'debug', 'info', 'warning' and
     // 'severe'. Defaults to ['severe', 'warning'].
       {
       package: 'protractor-console',
       logLevels: ['info']
       }
       ],
     */
     
    /*   
    {
    // having some issues, need to fix them.
     path: 'node_modules/protractor/plugins/timeline/index.js',
    // Output json and html will go in this folder.
     outdir: 'timelines',
    // Optional - if sauceUser and sauceKey are specified, logs from
    // SauceLabs will also be parsed after test invocation.
    // sauceUser: 'Jane',
    // sauceKey: 'abcdefg'
    },
    */
    
    /*
    // accessibility testing plugin - able to use tenon.io or Chrome Accessibility Developer Tools
     {
     chromeA11YDevTools: {
     treatWarningsAsFailures: false
     },
     path: 'node_modules/protractor/plugins/accessibility'
     }
    */
    
    /*
    // [dont use] console plugin - chrome only - allows to save browser console output and fail tests on errors 
     {
     path: 'node_modules/protractor/plugins/console',
     failOnWarning: false,
     failOnError: false,
    // exclude some strings or regex from fails
     exclude: []
     }],
    */

  // The location of the selenium standalone server .jar file, relative
  // to the location of this config. If no other method of starting selenium
  // is found, this will default to
  // node_modules/protractor/selenium/selenium-server...
  /// seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.41.0.jar',
  
  // The port to start the selenium server on, or null if the server should
  // find its own unused port.
  /// seleniumPort: 4444,

  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',
  
  

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
             'args': ['incognito', 'disable-extensions', 'start-maximized', 'enable-crash-reporter-for-testing']
                     },
                     'loggingPrefs': {
                     'browser': 'ALL'
                                     }
    // share spec files across parrell browsers
    // for example - one chrome runs spec1.js, second chrome runs spec2.js
    // whole specs are shared, not test cases or steps    
    // checkout in sourcecode for more info:
    // https://github.com/angular/protractor/blob/master/spec/shardingConf.js                             
    // shardTestFiles: true,
    
    // max amount of instances - combine with share spec files
    // maxInstances: 3,
    
    // max amount of sessions
    // maxSessions: 3
    
    // count runs exactly same tests on parrel browsers - not really useful
    // count: 3
  },
  
  // uncomment to run tests in parrell
  /*
      multiCapabilities: [

    {
        browserName: 'chrome',
    },
    
    {
        browserName: 'firefox',
    }
      ],
  */

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['specs/*.js'],
  
  // task scheduler is used to schedule some specs and configs in one spec file
  // so when its run, everything is going to be run in queue, one by one
  // everything with different setups - depends how you set it up
  // no docs - read source code
  // https://github.com/angular/protractor/blob/master/spec/unit/taskScheduler_test.js

  // Alternatively, suites may be used. When run without a command line
  // parameter, all suites will run. If run with --suite=smoke or
  // --suite=smoke,full only the patterns matched by the specified suites will
  // run.
  suites: {
    smoke: 'spec/smoketests/*.js',
    full: 'spec/*.js',
    homepage: 'spec/homePageSpec.js',
    selective: ['spec/spec1.js', 'spec/spec2.js']
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
  
  // The params object will be passed directly to the protractor instance,
  // and can be accessed from your test. It is an arbitrary object and can
  // contain anything you may need in your test.
  // This can be changed via the command line as:
  //   --params.login.user 'Joe'
  params: {
    // visualreview
     visualreview: vr
  },

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

    /*
    //connect to database
     var connection = mysql.createConnection({
     host : 'mysql.stgwaw.opigram',
     user : 'monad',
     password : 'monad',
     database: 'monad'
     });
     connection.connect();
    */

    // maximize window
    browser.driver.manage().window().maximize();

    /*
    // html reporter - use with jasmine1 (protractor-html-screenshot-reporter)
       jasmine.getEnv().addReporter(new HtmlReporter({
       baseDirectory: '../tmp/htmltestreports',
       preserveDirectory: false,
       docName: 'report.html',
       docTitle: 'Generated test report',
       takeScreenShotsForSkippedSpecs: true,
       takeScreenShotsOnlyForFailedSpecs: false
       }));
    */

/*
    // html reporter (protractor-jasmine2-html-reporter)
    // NOTE: not able to use it with visualreview
    // actually it throws errors after all tests are finished
    // even that errors pops up it works fine but not sure
    // if its fully functional - need to confirm later on
    jasmine.getEnv().addReporter(
    new HtmlScreenshotReporter({
    dest: '.tmp/htmltestreports',
    filename: 'report.html',
    ignoreSkippedSpecs: false,
    captureOnlyFailedSpecs: false,
    reportOnlyFailedSpecs: false
    }));
    */
    
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
    
    // Disable css animations
    var disableCssAnimate = function() {
      angular
      .module('disableCssAnimate', [])
      .run (function () {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '* {' +
        '-webkit-transition: none !important;' +
        '-moz-transition: none !important;' +
        '-o-transition: none !important;' +
        '-ms-transition: none !important;' +
        '-transition: none !important;' +
        '}';
        document.getElementsByTagName('head')[0].appendChild(style);
      });
    };   
    
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
  afterEach: function(){
    'use strict';
    /*
    // saving screenshots on fails and browser console logs - not really working? need to confirm
    var passed = jasmine.getEnv().currentSpec.results().passed();
    // Replace all space characters in spec name with dashes
    var specName = jasmine.getEnv().currentSpec.description.replace(new RegExp(' ', 'g'), '-'),
        baseFileName = specName + '-' + getDateStr(),
        reportDir = path.resolve(__dirname + '/../report/'),
        consoleLogsDir = path.resolve(reportDir + '/logs/'),
        screenshotsDir = path.resolve(reportDir + '/screenshots/');

    if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir);
    }

    if (!passed) {
        // Create screenshots dir if doesn't exist
        console.log('screenshotsDir = [' + screenshotsDir + ']');
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir);
        }

        var pngFileName = path.resolve(screenshotsDir + '/' + baseFileName + '.png');
        browser.takeScreenshot().then(function (png) {
            // Do something with the png...
            console.log('Writing file ' + pngFileName);
            fs.writeFileSync(pngFileName, png, {encoding: 'base64'}, function (err) {
                console.log(err);
            });
        }, errorCallback);
    }

    // Flush browser console to file
    var logs = browser.driver.manage().logs(),
        logType = 'browser'; // browser
    logs.getAvailableLogTypes().then(function (logTypes) {
        if (logTypes.indexOf(logType) > -1) {
            var logFileName = path.resolve(consoleLogsDir + '/' + baseFileName + '.txt');
            browser.driver.manage().logs().get(logType).then(function (logsEntries) {
                if (!fs.existsSync(consoleLogsDir)) {
                    fs.mkdirSync(consoleLogsDir);
                }
                // Write the browser logs to file
                console.log('Writing file ' + logFileName);
                var len = logsEntries.length;
                for (var i = 0; i < len; ++i) {

                    var logEntry = logsEntries[i];

                    var msg = timestampToDate(logEntry.timestamp) + ' ' + logEntry.type + ' ' + logEntry.message;
                    fs.appendFileSync(logFileName, msg + '\r\n', {encoding: 'utf8'}, errorCallback);
                }
            }, errorCallback);
                    }
    });
    */
  },
   afterAll: function(){
    'use strict';
    // connection.end();
  }
};