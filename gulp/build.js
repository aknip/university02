'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    // return gulp.src('app/styles/main.scss')
    //     .pipe($.rubySass({ style: 'expanded' }))
    //     .pipe(gulp.dest('.tmp/styles'))
    //     .pipe($.size());
});

gulp.task('scripts', function () {
    return gulp.src('app/modules/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter($.jshintStylish))
        .pipe($.size());
});

gulp.task('views', function () {
  return gulp.src('app/modules/**/*.html')
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe($.ngHtml2js({
        moduleName: "famousApp",
        prefix: "views/"
      }))
      .pipe(gulp.dest(".tmp/views"))
      .pipe($.size());
});

gulp.task('haml', function () {
  // return gulp.src('app/views/**/*.haml')
  //     .pipe($.haml())
  //     .pipe(gulp.dest("app/views"))
});

gulp.task('jade', function () {
  return gulp.src('app/modules/**/*.jade')
      .pipe($.jade())
      .pipe(gulp.dest("app/views"))
});

gulp.task('html', ['styles', 'scripts', 'haml', 'jade', 'views'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    ;
    return gulp.src('app/modules/*.html')
        .pipe($.inject(gulp.src('.tmp/views/**/*.js'), {
          read: false,
          starttag: '<!-- inject:views -->',
          addRootSlash: false,
          ignorePath: '.tmp'
        }))
        .pipe($.useref.assets())
        .pipe($.rev())
        .pipe(jsFilter)
        .pipe($.ngmin())
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('images', function () {
    return gulp.src('app/modules/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

gulp.task('fonts', function () {
    return $.bowerFiles()
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['haml', 'jade', 'html', 'views', 'images', 'fonts']);
