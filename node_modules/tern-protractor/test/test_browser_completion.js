var util = require("./util");

exports['test browser completion'] = function() {
  util.assertCompletion("br", {
    "start":{"line":0,"ch":0},
	"end":{"line":0,"ch":2},
	"isProperty":false,
	"completions":[{"name":"browser","type":"Protractor","origin":"protractor"}]
  });
}

exports['test browser#get completion'] = function() {
	  util.assertCompletion("browser.", {
	    "name":"get",
	    "type":"fn(destination: string, opt_timeout?: number)",
	    "origin":"protractor"
	  }, null, null, "get");
}

exports['test browser#getTitle completion'] = function() {
	// browser which has Protractor type and Protractor extends WebDriver which defines getTitle 
	  util.assertCompletion("browser.", {
	    "name":"getTitle",
	    "type":"fn()",
	    "origin":"protractor"
	  }, null, null, "getTitle");
}

if (module == require.main) require("test").run(exports);