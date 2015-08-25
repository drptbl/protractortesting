'use strict';

describe ('Login Page', function(){
    
    var width = 1024;
    var height = 768;
    browser.driver.manage().window().setSize(width, height);
    
    var loginPage = require('../pageObjects/loginPage.js');
    
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

    beforeEach(function() {
        return browser.get(loginPage.url());
        // workaround issue with sync - doesnt slow down tests(?) - confirm working
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
});