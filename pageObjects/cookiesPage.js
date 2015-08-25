'use strict';

var cookiesPage = require('../lib/pageObject.js').PageObjectFactory;

module.exports = cookiesPage.create({

    cookiesPage: function(){
        return ('/about/cookies/');
    }

});