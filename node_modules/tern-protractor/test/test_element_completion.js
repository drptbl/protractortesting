var util = require("./util");

exports['test element completion'] = function() {
  util.assertCompletion("e", {
	    "name":"element",
	    "type":"fn(locator: webdriver.Locator) -> ElementFinder",
	    "origin":"protractor"
	  }, null, null, "element");
}

exports['test element()#clone completion'] = function() {
	  util.assertCompletion("element(by.id('ID')).c", {
		    "name":"clone",
		    "type":"fn() -> ElementFinder",
		    "origin":"protractor"
		  }, null, null, "clone");
}

exports['test element()#click completion'] = function() {
	// some functions like click coming from WebElement are copied to ElementFinder
	  util.assertCompletion("element(by.id('ID')).c", {
		    "name":"click",
		    "type":"fn()",
		    "origin":"protractor"
		  }, null, null, "click");
}

if (module == require.main) require("test").run(exports);