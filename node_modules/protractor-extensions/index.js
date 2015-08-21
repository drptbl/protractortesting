(function () {
    'use strict';

    var ElementFinder = require('protractor').ElementFinder;

    /**
     * Indicates if the given style class is present on the current element.
     * @param classToMatch The class that need to be present.
     * @return <code>true</code> if present, else <code>false</code>.
     */
    ElementFinder.prototype.hasClass = function (classToMatch) {
        return this.getAttribute('class').then(function (classes) {
            return classes.indexOf(classToMatch) > -1;
        });
    };

    /**
     * Indicates if the given style classes are present on the current element.
     * @param classesToMatch The classes that need to be present.
     * @return <code>true</code> if present, else <code>false</code>. 
     */
    ElementFinder.prototype.hasClasses = function (classesToMatch) {
        return this.getAttribute('class').then(function (classes) {
            for(var i in  classesToMatch) {
                if (classes.indexOf(classesToMatch[i]) === -1) {
                    return false;
                }  
            }
            return true;
        });
    }

})();
