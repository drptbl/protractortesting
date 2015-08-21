'use strict';

var Factory = require('../lib/pageObject.js').PageObjectFactory;

module.exports = Factory.create({

    loginPage: function(){
        return ('/account/login/');
    },

    homePage: function(){
        return ('/');
    },

    cookiesPage: function(){
        return ('/about/cookies/');
    }

});