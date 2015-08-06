'use strict';

var loginPage = require('../pageObjects/loginPage.js');
var cookiesPage = require('../pageObjects/cookiesPage.js');

describe ('Login Page', function(){

    beforeEach(function() {
        loginPage.visit();
    });

    it('should render properly', function() {
        expect(loginPage.logo().isPresent()).toBeTruthy();
    });

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
            expect(browser.getCurrentUrl()).toEqual(cookiesPage.url());
        });

        it('should contain cookie accept button', function() {
            expect(loginPage.cookieAcceptButton().getText()).toBe('Accept');
        });

        it('should close cookie frame after acceptation', function() {
            loginPage.cookieAcceptButton().click();
            browser.sleep(500);
            expect(loginPage.cookieFrame().isPresent()).toBeFalsy();
        });

    });

});