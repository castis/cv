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

var compile = !!argv.c;

gulp.task('default', ['js', 'sass', 'watch', 'serve']);

gulp.task('js', () => {
    var vinyl = gulp
        .src('src/js/*.js')
        .pipe(concat('index.js'));

    if (!compile) {
        vinyl = vinyl.pipe(sourcemaps.init());
    }

    var babelCompiler = babel({
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
    var vinyl = gulp.src(['./src/scss/index.scss'])
        .pipe(sass())
        .on('error', gutil.log)
        .pipe(uncss({
            html: ['public/*.html']
        }));

    if (compile) {
        vinyl = vinyl.pipe(cleancss({
            keepSpecialComments: 0,
        }));
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
        livereload: true,
        debug: true,
    });
});
