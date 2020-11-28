const { series } = require('gulp');
const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    umd_wrap = require('gulp-wrap-umd'),
    stylus = require('gulp-stylus'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

// Because it's always best to have your code checked
// If this task fails, build will fail too
gulp.task('jshint', function (done) {

    gulp.src('source/ouibounce.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
    done();

});

gulp.task('build', series('jshint'), function (done) {

    gulp.src('source/ouibounce.js')
        .pipe(umd_wrap({ namespace: 'ouibounce' }))
        .pipe(gulp.dest('build'))
        .pipe(uglify())
        .pipe(rename('ouibounce.min.js'))
        .pipe(gulp.dest('build'));

    gulp.src('test/ouibounce.styl')
        .pipe(stylus())
        .pipe(prefix())
        .pipe(rename('ouibounce.css'))
        .pipe(gulp.dest('test'))
        .pipe(minifyCSS())
        .pipe(rename('ouibounce.min.css'))
        .pipe(gulp.dest('test'));

    done();
});



// Rerun the task when a file changes
gulp.task('watch', function (done) {
    gulp.watch('test/ouibounce.styl', series('build'));
    gulp.watch('source/ouibounce.js', series('build'));
});
