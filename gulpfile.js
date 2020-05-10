const babel = require('gulp-babel')
const cleancss = require('gulp-clean-css')
const concat = require('gulp-concat')
const connect = require('gulp-connect')
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const argv = require('yargs').argv
const inline = require('gulp-inline');


gulp.task('default', () => {
    gulp.start(['js', 'sass', 'html', 'img'])

    if (!argv.build) {
        gulp.watch(['src/scss/*', 'public/*.html'], ['sass'])
        gulp.watch(['src/js/*'], ['js'])
        gulp.watch(['src/index.html'], ['html'])

        gulp.start(['preview'])
    }
})

gulp.task('preview', () => {
    connect.server({
        root: ['public'],
        port: 8080,
        livereload: true,
        debug: true,
    })
})

gulp.task('js', () => {
    const babelCompiler = babel({
        presets: ['env', {
            sourceMaps: true,
        }],
    }).on('error', (err) => {
        console.log(`babel: ${err.message}`)
        babelCompiler.end()
    })

    gulp.src('src/js/*.js')
        .pipe(concat('index.js'))
        .pipe(babelCompiler)
        .pipe(uglify({
            compress: true,
            mangle: true,
        }))
        .pipe(gulp.dest('public/assets'))
        .pipe(connect.reload())
})

gulp.task('sass', () => {
    const sassCompiler = sass({
        style: 'compressed',
        errLogToConsole: false
    }).on('error', sass.logError)

    gulp.src([
        './src/scss/index.scss',
        //'./src/scss/print.scss',
    ])
        .pipe(sassCompiler)
        .pipe(cleancss())
        .pipe(gulp.dest('public/assets'))
        .pipe(connect.reload())
})

gulp.task('html', () => {
    gulp.src('src/index.html')
        .pipe(inline({
            base: 'public/',
            disabledTypes: ['img'], // Only inline css files
            ignore: ['./css/do-not-inline-me.css']
        })).pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
        }))
        .pipe(gulp.dest('public'))
})

gulp.task('img', () => {
    gulp.src('src/img/*')
        .pipe(gulp.dest('public/assets/'))
})
