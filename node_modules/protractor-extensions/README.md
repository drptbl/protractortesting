# protractor-extensions
API extensions for ElementFinder

## Install

```bash
$ npm install protractor-extensions --save
```

## Usage

Either put this in the top of your test file
```js
require('protractor-extensions');
```

or put this in your protractor.conf.js file
```js
exports.config = {
  plugins: [{
    path: 'node_modules/protractor-extensions/index.js'
  }]
};
```

require('protractor-extensions');