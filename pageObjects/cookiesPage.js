'use strict';

var Factory = require('../lib/pageObject.js').PageObjectFactory;

module.exports = Factory.create({

    notneeded: function(){
        return browser.get('');
    }

});