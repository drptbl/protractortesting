'use strict';

var homePage = require('../lib/pageObject.js').PageObjectFactory;

module.exports = homePage.create({

    logo: function(){
    	return element(by.css('.icon-yougov-logo'));
    },

    map: function(){
        return element(by.css('.opinions-map'));
    },

    pageTitle: function(){
        return ('YouGov | What the world thinks');
    }

});