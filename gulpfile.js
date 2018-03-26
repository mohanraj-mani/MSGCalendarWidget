const gulp = require('gulp')
const browserify = require('browserify')
const babelify = require('babelify')
const concat = require('gulp-concat')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')

gulp.task('autoprefixer', ['build-css'], function () {
  return gulp.src('./dist/build.css')
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(gulp.dest('./dist'))
})

// Input file.
var bundler = browserify('./src/index.js', {
  extensions: ['.js', '.jsx'],
  debug: true
})

// Babel transform
bundler.transform(babelify.configure({
  sourceMapRelative: 'src',
  presets: ['es2015', 'react', 'stage-2']
}))

function bundle () {
  return bundler.bundle()
    .on('error', function (err) {
      console.error(err.toString())
      this.emit('end')
    })
  .pipe(source('react-bundle.js'))
  .pipe(buffer())
  .pipe(gulp.dest('dist/js'))
}

gulp.task('transpile', [], () => bundle())


gulp.task('build-css', function () {
  return gulp.src('./src/*.css')
  .pipe(concat('build.css'))
  .pipe(gulp.dest('dist/css'))
})

gulp.task('concat-vendor-css', function () {
  var src = [
    './node_modules/rc-slider/assets/index.css'
  ]
  return gulp.src(src)
    .pipe(concat('build.vendor.css'))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('concat-all-css', ['concat-vendor-css', 'autoprefixer'], function () {
  var src = [
    'dist/css/build.vendor.css',
    'dist/css/build.css'
  ]
  return gulp.src(src)
      .pipe(concat('rc-widget.css'))
      .pipe(gulp.dest('dist/css'))
})

gulp.task('copy', function () {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist/'));
})

gulp.task('build', ['concat-all-css', 'transpile', 'copy'])

gulp.task('default', ['build'])
