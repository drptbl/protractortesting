var Factory = require('../lib/pageObject.js').PageObjectFactory;

module.exports = Factory.create({

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
    }

});