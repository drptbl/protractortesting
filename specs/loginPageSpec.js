var page = require('../pageObjects/loginPage.js');

describe ("Login Page", function(){

    beforeEach(function() {
        page.go("https://yougov.co.uk/account/login/");
        browser.waitForAngular
    });

    it("should render properly", function() {
        expect(page.logo().isPresent()).toBe(true);
    });

    describe("Cookie Window", function(){

        it("should contain cookie frame with elements", function() {
            expect(page.cookieFrame().isPresent()).toBe(true);
            expect(page.cookieText().isPresent()).toBe(true);
            expect(page.cookieMore().isPresent()).toBe(true);
            expect(page.cookieAcceptButton().isPresent()).toBe(true);
        });

        it("should contain cookie description", function() {
            expect(page.cookieText().getText()).toEqual(
                'YouGov uses cookies to give you the best experience on our site. By continuing to browse, you are agreeing to our use of cookies. More...');
        });

        it("should contain cookie more.. text", function() {
            expect(page.cookieMore().getText()).toBe('More...');
            expect(page.cookieMore().getAttribute("href")).toMatch('/about/cookies/');
        });

        it("should contain cookie accept button", function() {
            expect(page.cookieAcceptButton().getText()).toBe('Accept');
        });

        it("should close cookie frame after acceptation", function() {
            page.cookieAcceptButton().click();
            expect(page.cookieFrame().isPresent()).toBe(false);
        });

    });

});