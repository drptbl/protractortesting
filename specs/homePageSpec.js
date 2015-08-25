'use strict';

var width = 1024;
var height = 768;
browser.driver.manage().window().setSize(width, height);

var homePage = require('../pageObjects/homePage.js');
var urls = require('../pageObjects/urls.js');

// visual review
var vr = browser.params.visualreview;

describe ('Home Page', function(){

    beforeEach(function() {
        return browser.get(urls.homePage());
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