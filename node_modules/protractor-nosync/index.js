var wrap = function (browser, method) {
    return function () {
	var result;
        browser.ignoreSynchronization = true;
        result = method.apply(method, arguments);
        browser.ignoreSynchronization = false;
	return result;
    };
}

module.exports = exports = {
    initialize: function (browser, obj) {
        // create the default wrapper
        var noSync = function(method) {
            return wrap(browser, method)();
        }

        // Create the chained functions
        for (var key in obj) {
            noSync[key] = wrap(browser, obj[key]);
        }

        return noSync;
    }
};
