// Use the external Chai As Promised to deal with resolving promises in
// expectations.
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

// Chai expect().to.exist syntax makes default jshint unhappy.
// jshint expr:true

module.exports = function() {

    //browser.pause();
    //browser.sleep(5000);
    //browser.waitForAngular();

    this.Given(/^I run Cucumber with Protractor$/, function(next) {
        next();
    });

    this.Then(/^it should expose the correct global variables$/, function(next) {
        expect(protractor).to.exist;
        expect(browser).to.exist;
        expect(by).to.exist;
        expect(element).to.exist;
        expect($).to.exist;
        next();
    });

    this.Given(/^I go on(?: the website)? "([^"]*)"$/, function(url, next) {
        browser.get(url);
        //browser.get(url);
        next();
    });


    this.Then(/the title should equal "([^"]*)"$/, function(text, next) {
        expect(browser.getTitle()).to.eventually.equal(text).and.notify(next);
    });

    this.Then(/^I should see the surface of the navheader$/, function (next) {

        var el = element(by.css('.famous-surface.navheader'));
        el.getCssValue('-webkit-transform').then(function(cssVal) {
            //console.log('transform: ' + cssVal);
            //expect(cssVal).to.eventually.equal("xxx");
        });

        el.getOuterHtml().then(function(html) {
            //console.log( html );
        });

        expect(element(by.css('.famous-surface.navheader')).getCssValue('-webkit-transform')).to.eventually.equal('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 2, 1)');

        next();

    });


};