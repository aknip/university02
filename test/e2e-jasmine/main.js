// Use the external Chai As Promised to deal with resolving promises in
// expectations.

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('Running Jasmine with Protractor', function () {

    beforeEach(function () {
        //browser.get('http://localhost:9000');
    });

    it('exposes the correct global variables', function () {

        browser.get('http://localhost:9000');

        expect(protractor).to.exist;
        expect(browser).to.exist;
        expect(by).to.exist;
        expect(element).to.exist;
        expect($).to.exist;
    });

    it('displays the title "my App"', function () {
        expect(browser.getTitle()).to.eventually.equal("Famo.us/Angular");
    });



});
