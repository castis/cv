const gulp = require('gulp');
const concat = require('gulp-concat');
const less = require('gulp-less');
const minifycss = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');
const babel = require('gulp-babel');

gulp.task('default', ['less', 'js', 'watch', 'http']);

gulp.task('watch', () => {
    gulp.watch('public/less/*', ['less']);
    gulp.watch('public/js/*', ['js']);
});

gulp.task('js', () => {
    gulp.src('public/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'es2016']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/assets'));
});

gulp.task('less', () => {
    gulp.src('public/less/*.less')
        .pipe(less())
        .pipe(minifycss())
        .pipe(gulp.dest('public/assets'));
});

gulp.task('http', () => {
    connect.server({
        root: ['public'],
        port: 8000,
        livereload: true
    });
});
