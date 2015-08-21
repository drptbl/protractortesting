'use strict';

var loginPage = require('../pageObjects/loginPage.js');
var cookiesPage = require('../pageObjects/cookiesPage.js');
var urls = require('../pageObjects/urls.js');
var mysql = require('mysql');
    var connection = mysql.createConnection({
    host : 'mysql.stgwaw.opigram',
    user : 'monad',
    password : 'monad',
    database: 'monad'
    });
    connection.connect();

var sql = 'SELECT user_panellist_id FROM users WHERE user_active=1 AND user_admin=0 AND user_id < 400000 AND user_delivery_telephone = "" AND user_pmxid IS NOT NULL ORDER BY user_id DESC limit 0,1';

describe ('Login Page', function(){

    beforeEach(function() {
        browser.get(urls.loginPage());
    });

    it('should render properly', function() {
        expect(loginPage.logo().isPresent()).toBeTruthy();
    });

    it('should contain proper title', function() {
        expect(browser.getTitle()).toEqual(loginPage.pageTitle());
    });

//    describe('Login', function(){
//        it('should work properly', function() {
// connection.query(sql, function(err, rows) {
//    if (err) {
//        console.log('Could not run query');
//    } else {
//  console.log('The solution is: ', rows[0].solution);
//    }
//    connection.end();
//        });
//        //Inserts user and verifies row insertion
//            });
//            });

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
            expect(browser.getCurrentUrl()).toBe(baseUrl + urls.cookiesPage());
        });

        it('should contain cookie accept button', function() {
            expect(loginPage.cookieAcceptButton().getText()).toBe('Accept');
        });

        it('should close cookie frame after acceptation', function() {
            loginPage.cookieAcceptButton().click();
            browser.sleep(100);
            expect(loginPage.cookieFrame().isPresent()).toBeFalsy();
        });
    });
});