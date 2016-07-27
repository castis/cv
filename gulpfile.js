"use strict";

const gulp = require('gulp');
const sass = require('gulp-sass');
const minifycss = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');
const babel = require('gulp-babel');
const uncss = require('gulp-uncss');
const gutil = require('gulp-util');
const argv = require('yargs').argv

const compile = !!argv.c;

gulp.task('default', ['js', 'sass', 'watch', 'serve']);

gulp.task('js', () => {
    let vinyl = gulp.src('src/js/index.js');

    if (!compile) {
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
            compress: compile,
            mangle: compile
        }));

    if (!compile) {
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

    if (compile) {
        vinyl = vinyl.pipe(minifycss())
    }

    vinyl.pipe(gulp.dest('public/assets'));
});

gulp.task('watch', () => {
    gulp.watch(['src/scss/*', 'public/*.html'], ['sass']);
    gulp.watch('src/js/*', ['js']);
});

gulp.task('serve', () => {
    connect.server({
        root: ['public'],
        port: 8000,
        livereload: true
    });
});
