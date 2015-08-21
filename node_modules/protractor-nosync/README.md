# protractor-nosync

It is the nature of Protractor that for testing sufficiently complex apps, or apps with long running resource fetches, it is sometimes necessary to disable browser synchronization around certain tests.  This project provides a simple wrapper to execute arbitrary methods without browser synchronization.

This wrapper must be initialized with the Protractor browser object, since it must change configuration of the active protractor browser instance by setting and resetting `browser.ignoreSynchronization`.

## Installation
```
npm install protractor-nosync
```

## Usage

### Passing methods

```js
var nosync = require('protractor-nosync').initialize(browser, {
    methodName: methodToWrap,
    // ...
});

nosync.methodName(...);
```

For example, to wrap the expect method to provide a synchronization free expect:

```js
var nosync = require('protractor-nosync').initialize(browser, {
    expect: expect
});
```

This allows you to execute tests without synchronization, e.g.:

```js
nosync.expect(true).toBe(true);
```

### Anonymous block execution

```js
var nosync = require('protractor-nosync').initialize(browser);

nosync(function () {
   // ...
});
```

You may also pass in a code block as an anonymous function and the entire block will be executed without synchronization.  For example:

```js
nosync(function () {
   expect(true).toBe(true);
   expect(false).toBe(false);
   // ...
});
```

## Contributing

1. Fork it!
0. Create your feature branch: `git checkout -b my-new-feature`
0. Commit your changes: `git commit -am 'Add some feature'`
0. Push to the branch: `git push origin my-new-feature`
0. Submit a pull request :D

## Credits

Authored By: J. Andrichak IV

## License

Copyright (c) 2015  J. Andrichak IV

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
