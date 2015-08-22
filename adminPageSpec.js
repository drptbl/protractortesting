'use strict';

var loginPage = require('../pageObjects/loginPage.js');
var urls = require('../pageObjects/urls.js');

describe ('Admin Page', function(){

    beforeEach(function() {
		browser.ignoreSynchronization = true;
        browser.get(urls.loginPage());
    });

    it('should render properly', function() {
        expect(loginPage.logo().isPresent()).toBeFalsy();
    });

    it('should contain proper title', function() {
        expect(browser.getTitle()).toEqual(loginPage.pageTitle());
    });
	
	 describe('Cookie Window', function(){

        it('should contain cookie frame with elements', function() {
            expect(loginPage.cookieFrame().isPresent()).toBeTruthy();
            expect(loginPage.cookieText().isPresent()).toBeTruthy();
            expect(loginPage.cookieMore().isPresent()).toBeTruthy();
            expect(loginPage.cookieAcceptButton().isPresent()).toBeTruthy();
        });
    });
});
  