'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep');

gulp.task('unit-test', function () {

    // Search for all bower files
    var bowerDeps = wiredep({
        directory: 'app/bower_components',
        dependencies: true,
        devDependencies: true
    });

    // Add app and test files
    var testFiles = bowerDeps.js.concat([
        'app/modules/app-main/router.js',
        'app/modules/**/*.js',
        'test/unit/**/*.js'
    ]);

    // This is REALLY important:
    // phantomjs-polyfill must be added as FIRST src-file !!!
    // router.js must be added as first application src-file because of its module-definition

    testFiles.unshift('test/helpers/phantomjs-polyfills.js');

    return gulp.src(testFiles)
        .pipe($.karma({
            configFile: 'test/karma.conf.js',
            action: 'run'
        }))
        .on('error', function (err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});
