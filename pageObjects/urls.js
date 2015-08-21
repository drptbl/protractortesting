'use strict';

var urls = require('../lib/pageObject.js').PageObjectFactory;

module.exports = urls.create({

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