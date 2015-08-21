'use strict';

var cookiesPage = require('../lib/pageObject.js').PageObjectFactory;

module.exports = cookiesPage.create({

    notneeded: function(){
        return browser.get('');
    }

});