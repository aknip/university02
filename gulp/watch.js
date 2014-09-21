'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

var $ = require('gulp-load-plugins')();

// Original config: gulp.task('watch', ['serve'], function ()...
// But did not work: server and watch have to be started manually one after the other...
gulp.task('watch', ['serve'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
            'app/modules/**/*.html',
            'app/modules/**/*.haml',
            'app/modules/**/*.jade',
            'app/styles/**/*.css',
            'app/modules/**/*.js',
            'app/modules/**/*.jpg'
        ]).on('change', function (file) {
            gulp.start('build');
            // run Karma Unit-Tests every time
            gulp.start('unit-test');
            // run Cucumber E2E-Tests every time
            gulp.start('protractor-cucumber-only');
            server.changed(file.path);

        });

    gulp.watch('app/modules/**/*.js', ['scripts']);
    gulp.watch('app/modules/**/*.jpg', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});


// test for an alternative way to start server & watch
gulp.task('watchServer', function () {
    runSequence('serve', 'watch');
});
