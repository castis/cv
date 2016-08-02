var argv = require('yargs').argv;
var babel = require('gulp-babel');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var uncss = require('gulp-uncss');
var gif = require('gulp-if');


var compile = !!argv.c;

gulp.task('default', ['js', 'sass', 'watch', 'serve']);

gulp.task('js', () => {
    var options = {
        uglify: {
            compress: true,
            mangle: true,
        },
        babel: {
            presets: ['es2015', 'stage-0'],
        },
    };

    var babelCompiler = babel(options.babel)
        .on('error', (e) => {
            gutil.log(e);
            gutil.beep();
            babelCompiler.end();
        });

    gulp.src('src/js/*.js')
        .pipe(concat('index.js'))
        .pipe(gif(!compile, sourcemaps.init()))
        .pipe(babelCompiler)
        .pipe(gif(compile, uglify(options.uglify)))
        .pipe(gif(!compile, sourcemaps.write('.')))
        .pipe(gulp.dest('public/assets'));
});

gulp.task('sass', () => {
    var options = {
        uncss: { html: ['public/*.html'] },
        cleancss: { keepSpecialComments: 0 },
    };

    gulp.src(['./src/scss/index.scss'])
        .pipe(sass())
        .on('error', gutil.log)
        .pipe(uncss(options.uncss))
        .pipe(gif(compile, cleancss(options.cleancss)))
        .pipe(gulp.dest('public/assets'));
});

gulp.task('watch', () => {
    gulp.watch(['src/scss/*', 'public/*.html'], ['sass']);
    gulp.watch('src/js/*', ['js']);
});

gulp.task('serve', () => {
    connect.server({
        root: ['public'],
        port: 8000,
        livereload: true,
        debug: true,
    });
});
