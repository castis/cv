const gulp = require('gulp');
const concat = require('gulp-concat');
const less = require('gulp-less');
const minifycss = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');
const babel = require('gulp-babel');
const uncss = require('gulp-uncss');

gulp.task('default', ['less', 'js', 'watch', 'http']);

gulp.task('watch', () => {
    gulp.watch(['public/less/*', 'public/*.html'], ['less']);
    gulp.watch('public/js/*', ['js']);
});

gulp.task('js', () => {
    gulp.src('public/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'stage-0']
        }))
        .pipe(uglify())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/assets'));
});

gulp.task('less', () => {
    gulp.src('public/less/*.less')
        .pipe(less())
        .pipe(uncss({
            html: ['public/*.html']
        }))
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
