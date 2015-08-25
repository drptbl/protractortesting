'use strict';

describe ('Home Page', function(){

    var width = 1024;
    var height = 768;
    browser.driver.manage().window().setSize(width, height);
    
    var homePage = require('../pageObjects/homePage.js');
    
    // visual review
    var vr = browser.params.visualreview;

    beforeEach(function() {
        return browser.get(homePage.url());
    });

    it('should render properly', function() {
        expect(homePage.logo().isPresent()).toBeTruthy();
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