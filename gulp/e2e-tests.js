'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

// Downloads the selenium webdriver
gulp.task('webdriver-update', $.protractor.webdriver_update);

gulp.task('webdriver-standalone', $.protractor.webdriver_standalone);

gulp.task('protractor-jasmine-only', ['webdriver-update', 'wiredep'], function(done) {
  var testFiles = [
    'test/e2e-jasmine/**/*.js'
  ]

  gulp.src(testFiles)
    .pipe($.protractor.protractor({
      configFile: 'test/protractor-jasmine.conf.js',
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    })
    .on('end', function() {
      // Close connect server to and gulp connect task
      gulp.server.close();
      done();
    });
});

gulp.task('protractor-jasmine', ['connect:src', 'protractor-jasmine-only']);
gulp.task('protractor-jasmine:src', ['connect:src', 'protractor-jasmine-only']);
gulp.task('protractor-jasmine:dist', ['connect:dist', 'protractor-jasmine-only']);


// CUCUMBER
gulp.task('protractor-cucumber-only', ['webdriver-update', 'wiredep'], function(done) {
    var testFiles = [
        'test/e2e-cucumber/**/*.feature'
    ]

    gulp.src(testFiles)
        .pipe($.protractor.protractor({
            configFile: 'test/protractor-cucumber.conf.js',
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        })
        .on('end', function() {
            gulp.server.close();
            done();
        });
});
gulp.task('protractor-cucumber', ['connect:src', 'protractor-cucumber-only']);
