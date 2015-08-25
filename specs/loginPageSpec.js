'use strict';

var width = 1024;
var height = 768;
browser.driver.manage().window().setSize(width, height);

var loginPage = require('../pageObjects/loginPage.js');
var cookiesPage = require('../pageObjects/cookiesPage.js');
var urls = require('../pageObjects/urls.js');

// visual review
var vr = browser.params.visualreview;


/*
var mysql = require('mysql');
    var connection = mysql.createConnection({
    host : 'x',
    user : 'x',
    password : 'x',
    database: 'x'
    });
    connection.connect();

 var sql = 'SELECT user_panellist_id FROM users WHERE user_active=1 AND user_admin=0 AND user_id < 400000 AND user_delivery_telephone = "" AND user_pmxid IS NOT NULL ORDER BY user_id DESC limit 0,1';

// check for browser logs, if any error exist fail the test
  afterEach(function() {
    browser.manage().logs().get('browser').then(function(browserLog) {
      expect(browserLog.length).toEqual(0);
      // Uncomment to actually see the log.
       console.log('log: ' + require('util').inspect(browserLog));
    });
  });
*/

describe ('Login Page', function(){

    beforeEach(function() {
        return browser.get(urls.loginPage());
        // workaround issue with sync - doesnt slow down tests - confirm working
        // protractor.sleep(3000);
    });

    it('should render properly', function() {
        expect(loginPage.logo().isPresent()).toBeTruthy();
        vr.takeScreenshot('YouGov-loginpage');
    });

    it('should contain proper title', function() {
        expect(browser.getTitle()).toEqual(loginPage.pageTitle());
    });

/*
    describe('Login', function(){
        it('should work properly', function() {
 connection.query(sql, function(err, rows) {
    if (err) {
        console.log('Could not run query');
    } else {
  console.log('The solution is: ', rows[0].solution);
    }
    connection.end();
        });
        //Inserts user and verifies row insertion
            });
            });
*/

    describe('Cookie Window', function(){

        it('should contain cookie frame with elements', function() {
            expect(loginPage.cookieFrame().isPresent()).toBeTruthy();
            expect(loginPage.cookieText().isPresent()).toBeTruthy();
            expect(loginPage.cookieMore().isPresent()).toBeTruthy();
            expect(loginPage.cookieAcceptButton().isPresent()).toBeTruthy();
        });

        it('should contain cookie description', function() {
            expect(loginPage.cookieText().getText()).toEqual(loginPage.expectedCookieText());
        });

        it('should contain cookie more.. text', function() {
            expect(loginPage.cookieMore().getText()).toBe('More...');
            expect(loginPage.cookieMore().getAttribute('href')).toMatch(loginPage.cookiePath());
        });

        it('should redirect user to cookie page after click on more.. text', function() {
            loginPage.cookieMore().click();
            // workaround for couldnt sync with angular page - when changing between angular apps
            browser.sleep(1000);
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + urls.cookiesPage());
            expect(loginPage.cookieFrame().isPresent()).toBeTruthy();
            expect(loginPage.cookieText().isPresent()).toBeTruthy();
            expect(loginPage.cookieMore().isPresent()).toBeTruthy();
            expect(loginPage.cookieAcceptButton().isPresent()).toBeTruthy();
            browser.sleep(100);
            vr.takeScreenshot('YouGov-cookiepage');
            // smth like that could be used - toMatch takes path not full url
            // expect(browser.getLocationAbsUrl()).toMatch(urls.cookiesPage());
        });

        it('should contain cookie accept button', function() {
            expect(loginPage.cookieAcceptButton().getText()).toBe('Accept');
        });

        it('should close cookie frame after acceptation', function() {
            loginPage.cookieAcceptButton().click().then(function() {
            browser.sleep(100);
            expect(loginPage.cookieFrame().isPresent()).toBeFalsy();
            });
        });
    });
});