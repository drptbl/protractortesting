'use strict';

    var width = 1024;
    var height = 768;
    browser.driver.manage().window().setSize(width, height);
    
    var cookieWindow = require('../pageObjects/cookieWindow.js');
    var homePage = require('../pageObjects/homePage.js');
    
    // visual review
    var vr = browser.params.visualreview;


describe ('Cookie Window', function(){

    beforeEach(function() {
        return browser.get(homePage.url());
    });

    it('should render properly', function() {
        expect(cookieWindow.cookieFrame().isPresent()).toBeTruthy();
        expect(cookieWindow.cookieText().isPresent()).toBeTruthy();
        expect(cookieWindow.cookieMore().isPresent()).toBeTruthy();
        expect(cookieWindow.cookieAcceptButton().isPresent()).toBeTruthy();
        browser.sleep(100);
        vr.takeScreenshot('YouGov-loginpage');
    });

    it('should contain cookie description', function() {
        expect(cookieWindow.cookieText().getText()).toEqual(cookieWindow.expectedCookieText());
    });

    it('should contain cookie more.. text', function() {
        expect(cookieWindow.cookieMore().getText()).toBe('More...');
        expect(cookieWindow.cookieMore().getAttribute('href')).toMatch(cookieWindow.cookiePath());
     });

    it('should redirect user to cookie page after click on more.. text', function() {
        cookieWindow.cookieMore().click();
        // workaround for couldnt sync with angular page - when changing between angular apps
        browser.sleep(2000);
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + cookieWindow.cookiePath());
        expect(cookieWindow.cookieFrame().isPresent()).toBeTruthy();
        expect(cookieWindow.cookieText().isPresent()).toBeTruthy();
        expect(cookieWindow.cookieMore().isPresent()).toBeTruthy();
        expect(cookieWindow.cookieAcceptButton().isPresent()).toBeTruthy();
        browser.sleep(100);
        vr.takeScreenshot('YouGov-cookiepage');
        // smth like that could be used - toMatch takes path not full url
        // expect(browser.getLocationAbsUrl()).toMatch(urls.cookiesPage());
     });

     it('should contain cookie accept button', function() {
        expect(cookieWindow.cookieAcceptButton().getText()).toBe('Accept');
     });
     
     it('should close cookie frame after click on Accept cookies', function() {
       cookieWindow.cookieAcceptButton().click().then(function() {
       browser.sleep(100);
       expect(cookieWindow.cookieFrame().isPresent()).toBeFalsy();
       });
     });
     
     it('should set proper cookie after acceptation', function() {
       expect(cookieWindow.cookieFrame().isPresent()).toBeFalsy();
       browser.manage().getCookie('termsaccepted').then(function(cookie) {
       expect(cookie.value).toEqual('1');
      });
     });
         
});