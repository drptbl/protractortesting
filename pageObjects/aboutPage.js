'use strict';

var aboutPage = require('../lib/pageObject.js').PageObjectFactory;

module.exports = aboutPage.create({

    url: function(){
        return ('/about/about/');
    }

});