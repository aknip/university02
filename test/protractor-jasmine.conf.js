// An example configuration file.
exports.config = {
    // The address of a running selenium server.
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.41.0.jar', // Make use you check the version in the folder

    // Capabilities to be passed to the webdriver instance.
    multiCapabilities: [

        {
          'browserName': 'chrome'
        }

        //{
        //    'browserName': 'phantomjs',

            // Command line arugments to pass to phantomjs.
            // Can be ommitted if no arguments need to be passed.
            // Acceptable cli arugments: https://github.com/ariya/phantomjs/wiki/API-Reference#wiki-command-line-options

            // 'phantomjs.cli.args':['--logfile=PATH', '--loglevel=DEBUG'],


            // Can be used to specify the phantomjs binary path.
            // This can generally be ommitted if you installed phantomjs globally.

        //    'phantomjs.binary.path': './node_modules/phantomjs/bin/phantomjs'
        //
        //}

    ],

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['test/e2e/**/*.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
