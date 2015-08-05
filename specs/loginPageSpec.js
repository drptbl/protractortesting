var loginPage = require('../pageObjects/loginPage.js');

describe ("Login Page", function(){

    beforeEach(function() {
        loginPage.visit();
    });

    it("should render properly", function() {
        expect(loginPage.logo().isPresent()).toBe(true);
    });

    describe("Cookie Window", function(){

        it("should contain cookie frame with elements", function() {
            expect(loginPage.cookieFrame().isPresent()).toBe(true);
            expect(loginPage.cookieText().isPresent()).toBe(true);
            expect(loginPage.cookieMore().isPresent()).toBe(true);
            expect(loginPage.cookieAcceptButton().isPresent()).toBe(true);
        });

        it("should contain cookie description", function() {
            expect(loginPage.cookieText().getText()).toEqual(loginPage.expectedCookieText());
        });

        it("should contain cookie more.. text", function() {
            expect(loginPage.cookieMore().getText()).toBe('More...');
            expect(loginPage.cookieMore().getAttribute("href")).toMatch('/about/cookies/');
        });

        it("should contain cookie accept button", function() {
            expect(loginPage.cookieAcceptButton().getText()).toBe('Accept');
        });

        it("should close cookie frame after acceptation", function() {
            loginPage.cookieAcceptButton().click();
            expect(loginPage.cookieFrame().isPresent()).toBe(false);
        });

    });

});