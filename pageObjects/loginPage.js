'use strict';

var Factory = require('../lib/pageObject.js').PageObjectFactory;

module.exports = Factory.create({

    visit: function(){
        return browser.get('https://yougov.co.uk/account/login/');
    },

    url: function(){
        return ('https://yougov.co.uk/account/login/');
    },

    logo: function(){
        return element(by.css('.logo'));
    },

    cookieFrame: function(){
        return element(by.css('div[ng-if="cookieConfirm.displayConfirm"]'));
    },

    cookieText: function(){
        return element(by.binding('cookie_confirm_text'));
    },

    cookieMore: function(){
        return element(by.binding('cookie_confirm_more'));
    },

    cookieAcceptButton: function(){
        return element(by.binding('cookie_confirm_accept'));
    },

    expectedCookieText: function(){
        return ('YouGov uses cookies to give you the best experience on our site. By continuing to browse, you are agreeing to our use of cookies. More...');
    },

    cookiePath: function(){
        return ('/about/cookies/')
    }

});