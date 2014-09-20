'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

// Original config: gulp.task('watch', ['serve'], function ()...
// But did not work: server and watch have to be started one after the other...
gulp.task('watch', function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
            'app/views/**/*.html',
            'app/views/**/*.haml',
            'app/views/**/*.jade',
            'app/styles/**/*.css',
            'app/scripts/**/*.js',
            'app/images/**/*'
        ]).on('change', function (file) {
            gulp.start('build');
            // run Karma Unit-Tests every time
            gulp.start('unit-test');
            // run Cucumber E2E-Tests every time
            //gulp.start('protractor-cucumber-only');
            server.changed(file.path);

        });

    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});
