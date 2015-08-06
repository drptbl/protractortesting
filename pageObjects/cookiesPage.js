'use strict';

var Factory = require('../lib/pageObject.js').PageObjectFactory;

module.exports = Factory.create({

    visit: function(){
        return browser.get('https://yougov.co.uk/about/cookies/');
    },

    url: function(){
        return ('https://yougov.co.uk/about/cookies/');
    }

});