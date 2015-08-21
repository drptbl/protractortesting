var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var noSync = require('../index.js');

describe('Protractor-NoSync Wrapped Object Method', function () {
    var browser, obj, nosync, arg1, arg2, result;
    var data = { value: 42 };

    before(function () {
        arg1 = 'arg1';
        arg2 = 'arg2';

        // Set up test fixtures.
        obj = {
            spy: sinon.stub().returns(data)
        };

        // Setup protractor browser mock.  Sinon does not directly support getters and setters so work around that.
        browser = {
            spy: sinon.spy(),
            set ignoreSynchronization(x) {
                this.spy(x);
            },
            get ignoreSynchronization() {
                return this.spy;
            }
        }

        nosync = noSync.initialize(browser, {'spy': obj.spy});

        result = nosync.spy(arg1, arg2);
    });

    it('should enable ignoreSynchronization before the method.', function () {
        expect(browser.ignoreSynchronization).to.be.calledTwice;
        expect(browser.ignoreSynchronization.firstCall).to.be.calledWith(true);
    });

    it('should properly wrap the passed in method.', function () {
        expect(browser.ignoreSynchronization).to.be.calledBefore(obj.spy);
        expect(browser.ignoreSynchronization).to.be.calledAfter(obj.spy);
    });

    it('should disable ignoreSynchronization after the method.', function () {
        expect(browser.ignoreSynchronization.secondCall).to.be.calledWith(false);
    });

    it('should properly passthrough arguments to the method.', function () {
        expect(obj.spy).to.be.calledOnce;
        expect(obj.spy).to.be.calledWith(arg1, arg2);
    });

    it('should properly return results of the method.', function () {
	expect(result).to.equal(data);
    });
});

describe('Protractor-NoSync Wrapped Code Block', function () {
    var browser, obj, nosync, arg1, arg2, spy, result;
    var data = { value: 42 };

    before(function () {
        arg1 = 'arg1';
        arg2 = 'arg2';

        // Set up test fixtures.
        spy = sinon.stub().returns(data);

        // Setup protractor browser mock.  Sinon does not directly support getters and setters so work around that.
        browser = {
            spy: sinon.spy(),
            set ignoreSynchronization(x) {
                this.spy(x);
            },
            get ignoreSynchronization() {
                return this.spy;
            }
        }

        nosync = noSync.initialize(browser);

        result = nosync(function () {
            return spy(arg1, arg2);
        });
    });

    it('should enable ignoreSynchronization before the block.', function () {
        expect(browser.ignoreSynchronization).to.be.calledTwice;
        expect(browser.ignoreSynchronization.firstCall).to.be.calledWith(true);
    });

    it('should properly wrap the passed in block.', function () {
        expect(browser.ignoreSynchronization).to.be.calledBefore(spy);
        expect(browser.ignoreSynchronization).to.be.calledAfter(spy);
    });

    it('should disable ignoreSynchronization after the block.', function () {
        expect(browser.ignoreSynchronization.secondCall).to.be.calledWith(false);
    });

    it('should properly call the block', function () {
        expect(spy).to.be.calledOnce;
        expect(spy).to.be.calledWith(arg1, arg2);
    });

    it('should properly return results of the block.', function () {
	expect(result).to.equal(data);
    });
});
