describe('protractor-extensions', function () {

    require('../../index.js')

    var theElement;

    beforeEach(function () {
        browser.get('extension.html');
        theElement = element(by.id('theElement'));
    });

    it('should have the given class present', function () {
        expect(theElement.hasClass('a')).toBeTruthy();
    });

    it('should have the given classes present', function() {
        expect(theElement.hasClasses(['a', 'c'])).toBeTruthy();
    });

    it('should not have the given class present', function() {
        expect(theElement.hasClass('x')).toBeFalsy();
    });

    it('should not have the given classes present', function() {
        expect(theElement.hasClasses(['a', 'x'])).toBeFalsy();
    });
});