"use strict";

const gulp = require('gulp');
const less = require('gulp-less');
const sass = require('gulp-sass');
const minifycss = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');
const babel = require('gulp-babel');
const uncss = require('gulp-uncss');
const gutil = require('gulp-util');
const argv = require('yargs').argv

gulp.task('default', ['less', 'js', 'watch', 'http']);

gulp.task('watch', () => {
    gulp.watch(['src/less/*', 'public/*.html'], ['less']);
    // gulp.watch(['src/scss/*', 'public/*.html'], ['scss']);
    gulp.watch('src/js/*', ['js']);
});

gulp.task('js', () => {
    let vinyl = gulp.src('src/js/index.js');

    if (!argv.c) {
        vinyl = vinyl.pipe(sourcemaps.init());
    }

    const babelCompiler = babel({
            presets: ['es2015', 'stage-0']
        }).on('error', (e) => {
            gutil.log(e);
            gutil.beep();
            babelCompiler.end();
        });

    vinyl = vinyl
        .pipe(babelCompiler)
        .pipe(uglify({
            compress: !!argv.c,
            mangle: !!argv.c
        }));

    if (!!argv.c) {
        vinyl = vinyl.pipe(sourcemaps.write('.'));
    }

    vinyl.pipe(gulp.dest('public/assets'));
});

gulp.task('sass', () => {
    let vinyl = gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(uncss({
            html: ['public/*.html']
        }));

    if (argv.c) {
        vinyl = vinyl.pipe(minifycss())
    }

    vinyl.pipe(gulp.dest('public/assets'));
});

gulp.task('less', () => {
    let vinyl = gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(uncss({
            html: ['public/*.html']
        }));

    if (argv.c) {
        vinyl = vinyl.pipe(minifycss())
    }

    vinyl.pipe(gulp.dest('public/assets'));
});

gulp.task('http', () => {
    connect.server({
        root: ['public'],
        port: 8000,
        livereload: true
    });
});
