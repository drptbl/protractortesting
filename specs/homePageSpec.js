'use strict';

var homePage = require('../pageObjects/homePage.js');
var urls = require('../pageObjects/urls.js');

describe ('Home Page', function(){

    beforeEach(function() {
        browser.get(urls.homePage());
    });

    it('should render properly', function() {
        expect(homePage.logo().isPresent()).toBeTruthy();
    });

    it('should contain proper title', function() {
        expect(browser.getTitle()).toEqual(homePage.pageTitle());
    });

    describe('Map', function(){

        it('should be shown', function() {
            expect(homePage.map().isPresent()).toBeTruthy();
        });
    });
});