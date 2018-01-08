const babel = require('gulp-babel');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const uncss = require('gulp-uncss');
const argv = require('yargs').argv;

const build = argv.build === true;

gulp.task('default', () => {
    gulp.start(['js', 'sass', 'html']);

    if (!build) {
        gulp.watch(['src/scss/*', 'public/*.html'], ['sass']);
        gulp.watch(['src/js/*'], ['js']);
        gulp.watch(['src/index.html'], ['html']);

        gulp.start(['preview']);
    }
});

gulp.task('preview', () => {
    connect.server({
        root: ['public'],
        port: 8000,
        livereload: true,
        debug: true,
    });
});

gulp.task('js', () => {
    const babelCompiler = babel({
        presets: ['es2015', 'stage-0'],
    }).on('error', (err) => {
        console.log(err.message);
        babelCompiler.end();
    });

    gulp.src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('index.js'))
        .pipe(babelCompiler)
        .pipe(uglify({
            compress: true,
            mangle: true,
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/assets'))
        .pipe(connect.reload());
});

gulp.task('sass', () => {
    const sassCompiler = sass({
        style: 'compressed',
        errLogToConsole: false
    }).on('error', sass.logError);

    let vinyl;
    vinyl = gulp.src(['./src/scss/index.scss'])
        .pipe(sourcemaps.init())
        .pipe(sassCompiler)
        .pipe(cleancss());

    if (build) {
        vinyl = vinyl.pipe(uncss({
            html: ['./public/index.html'],
        }));
    }

    vinyl.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/assets'))
        .pipe(connect.reload());
});

gulp.task('html', () => {
    gulp.src('src/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('public'));
});
