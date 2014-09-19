famous-angular-myapp01
=======================

A little tutorial for Famo.us / Angular.

Embedded in "Dynamic Presentation Frame":
- Directive <presentationframe> shows App in a device or fullscreen
- Play with attribute: switch with device="iPhone" / device="none"

##Remark:
- fa-app needs fixed width/height => not so nize
- width and height can not be bound to model values in current Angular version (planned for 3.0 !)
- directive '<presentationframe>' uses a very simple but effective solution:
  insert CSS dynamically with the computed widht/height.
  Not nice looking, but works - at least for quick tests and prototypes...

##Versions:
- famous-angular 0.3.0
- famous-0.2.2

##Based on:
- Copy of 'famous-angular-examples'
- require.js dependency removed
- stripped down some details


### Installation

  1. Make sure that you have [npm](http://blog.nodeknockout.com/post/65463770933/how-to-install-node-js-and-npm) installed
  2. In your terminal, run `npm install -g gulp`
  3. In your terminal, run `npm install` to install package dependencies, including bower dependencies
  4. (Make sure that phantomjs was installed inside of your npm_modules, otherwise: npm install --save-dev phantomjs


### Development WATCH mode

  1. In your terminal, run `gulp watch`
  2. You should then be able to open the app at http://localhost:9000.  The page will auto-reload when you make changes to the app.


### Plain SERVE mode

  1. In your terminal, run `gulp serve`


### Unit Test Jasmine

  - In your terminal, run `gulp unit-test`: this starts the server, executes karma and closes everything


### e2e Test Jasmine

  - In your terminal, run `gulp protractor-jasmine`: this starts the server, executes protractor and closes everything
  - In your terminal, run `gulp protractor-jasmine-only`: this requires a running server ('gulp serve') and only executes protractor
  - Browser configuration is done in protractor-jasmine.conf.js

### e2e Test Cucumber

  - In your terminal, run `gulp protractor-cucumber`: this starts the server, executes protractor and closes everything
  - In your terminal, run `gulp protractor-cucumber-only`: this requires a running server ('gulp serve') and only executes protractor
  - Browser configuration is done in protractor-cucumber.conf.js

