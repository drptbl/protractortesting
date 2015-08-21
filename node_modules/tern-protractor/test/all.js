exports['test Protractor Browser Tern completion'] = require('./test_browser_completion');
exports['test Protractor Element Tern completion'] = require('./test_element_completion');
exports['test Protractor By Tern completion'] = require('./test_by_completion');

if (require.main === module) require("test").run(exports);