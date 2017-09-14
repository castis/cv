const argv = require('yargs').argv;
const babel = require('gulp-babel');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const uncss = require('gulp-uncss');
const gif = require('gulp-if');


let compile = !!argv.c;

gulp.task('default', ['js', 'sass', 'watch', 'serve']);

gulp.task('build', () => {
    compile = true;
    gulp.start(['js', 'sass']);
})

gulp.task('js', () => {
    const babelCompiler = babel({
            presets: ['es2015', 'stage-0'],
        })
        .on('error', (e) => {
            gutil.log(e);
            gutil.beep();
            babelCompiler.end();
        });

    gulp.src('src/js/*.js')
        .pipe(concat('index.js'))
        .pipe(gif(!compile, sourcemaps.init()))
        .pipe(babelCompiler)
        .pipe(gif(compile, uglify({
            compress: true,
            mangle: true,
        })))
        .pipe(gif(!compile, sourcemaps.write('.')))
        .pipe(gulp.dest('public/assets'));
});

gulp.task('sass', () => {
    gulp.src(['./src/scss/index.scss'])
        .pipe(sass())
        .on('error', gutil.log)
        .pipe(uncss({
            html: ['./public/index.html']
        }))
        .pipe(gif(compile, cleancss({
            specialComments: 0,
        })))
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
