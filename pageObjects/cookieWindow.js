'use strict';

var cookieWindow = require('../lib/pageObject.js').PageObjectFactory;

module.exports = cookieWindow.create({
    
    cookiePath: function(){
        return ('/about/cookies/');
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
    }

});