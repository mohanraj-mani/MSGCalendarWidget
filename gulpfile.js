'use strict';,gulp = require('gulp'),
      babel = require('gulp-babel'),
      concat = require('gulp-concat'),
      browserify = require('browserify'),
      babelify = require('babelify'),
      concat = require('gulp-concat'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer')

gulp.task('browserify', function() {

});

gulp.task('build-js', ['copy-integration-script', 'copy-integration-configuration'], function (){
	
});

gulp.task('build-css', function() {

});

gulp.task('concat-vendor-css', function () {

});

gulp.task('concat-vendor-js', function () {

});

gulp.task('autoprefixer', ['build-css'], function () {

});

gulp.task('concat-all-css', ['concat-vendor-css', 'autoprefixer'], function () {

});

gulp.task('concat-all-js', ['concat-vendor-js', 'build-js'], function () {

});

gulp.task('minify-all-css', ['concat-all-css'], function () {

});

gulp.task('minify-all-js', ['concat-all-js'], function () {

});

gulp.task('build', ['minify-all-css', 'minify-all-js']);

gulp.task('default', ['watch']);
