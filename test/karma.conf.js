module.exports = function (config) {

    config.set({
        basePath: '..', //!\\ Ignored through gulp-karma //!\\

        // This REALLY important: phantomjs-polyfill must be added as FIRST src-file !!!
        files: [ //!\\ Ignored through gulp-karma //!\\
            'test/helpers/phantomjs-polyfills.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/famous/famous-global.js',
            'app/bower_components/famous-angular/dist/famous-angular.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.js',
            'app/scripts/**/*.js',
            'test/unit/**/*.js'
        ],

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],  //!\\ 'PhantomJS', 'Chrome' //!\\

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        //preprocessors: {
        //    'app/scripts/*.js': ['coverage'],
        //    'app/scripts/components/**/*.js': ['coverage'],
        //    'app/scripts/controllers/**/*.js': ['coverage']
        //},

        reporters: ['progress'],  //!\\ ['spec', 'coverage', 'progress', 'junit'] //!\\

        junitReporter: {
            outputFile: 'test/reports/unit.xml',
            suite: 'unit'
        },

        autoWatch: false,

        // Give gulp time to re-build dist, in the src/ files change
        //autoWatchBatchDelay: 1000,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true

    })
}
