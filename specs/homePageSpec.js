'use strict';

var homePage = require('../pageObjects/homePage.js');
var urls = require('../pageObjects/urls.js');

// visual review
var vr = browser.params.visualreview;

describe ('Home Page', function(){

    beforeEach(function() {
        browser.get(urls.homePage());
    });

    it('should render properly', function() {
        expect(homePage.logo().isPresent()).toBeTruthy();
        browser.driver.sleep(100);
        vr.takeScreenshot('YouGov-homepage');
    });

    it('should contain proper title', function() {
        expect(browser.getTitle()).toEqual(homePage.pageTitle());
    });

/*
    describe('Map', function(){

        it('should be shown', function() {
            expect(homePage.map().isPresent()).toBeTruthy();
        });
    });
*/
});