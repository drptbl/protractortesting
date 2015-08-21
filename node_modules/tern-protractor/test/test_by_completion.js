var util = require("./util");

exports['test by completion'] = function() {
  util.assertCompletion("b", {
	    "name":"by",
	    "type":"ProtractorBy",
	    "origin":"protractor"
	  }, null, null, "by");
}

exports['test by#model completion'] = function() {
	  util.assertCompletion("by.m", {
		    "name":"model",
		    "type":"fn(model: string)",
		    "origin":"protractor"
		  }, null, null, "model");
}

exports['test by#model completion'] = function() {
	// ProtractorBy extends WebdriverBy whide defines css
	  util.assertCompletion("by.c", {
		    "name":"css",
		    "type":"fn(selector: string) -> webdriver.Locator",
		    "origin":"protractor"
		  }, null, null, "css");
}

if (module == require.main) require("test").run(exports);