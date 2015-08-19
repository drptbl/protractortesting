'use strict';

var Factory = require('../lib/pageObject.js').PageObjectFactory;

module.exports = Factory.create({

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