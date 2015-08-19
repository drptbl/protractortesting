'use strict';

var Factory = require('../lib/pageObject.js').PageObjectFactory;

module.exports = Factory.create({

    loginPage: function(){
        return ('https://uat-unified-emea.yougov.net/account/login/');
    },

    homePage: function(){
        return ('https://uat-unified-emea.yougov.net/');
    },

    cookiesPage: function(){
        return ('https://uat-unified-emea.yougov.net/about/cookies/');
    }

});