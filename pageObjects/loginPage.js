'use strict';

var loginPage = require('../lib/pageObject.js').PageObjectFactory;

module.exports = loginPage.create({
    
    url: function(){
        return ('/account/login/');
    },

    logo: function(){
        return element(by.css('.logo'));
    },

    pageTitle: function(){
        return ('YouGov | Login');
    },

    mainLoginFrame: function(){
        return element(by.css(''));
    }

});