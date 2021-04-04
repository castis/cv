const argv = require('yargs').argv
const cleancss = require('gulp-clean-css')
const concat = require('gulp-concat')
const connect = require('gulp-connect')
const gulp = require('gulp')
const sass = require('gulp-sass')
const cssbeautify = require('gulp-cssbeautify')


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
  // const babelCompiler = babel({
  // presets: ['env', {
  // sourceMaps: true,
  // }],
  // }).on('error', (err) => {
  // console.log(`babel: ${err.message}`)
  // babelCompiler.end()
  // })

  gulp.src('src/js/*.js')
    .pipe(concat('index.js'))
    // .pipe(babelCompiler)
    // .pipe(uglify({
    //   compress: true,
    //   mangle: true,
    // }))
    .pipe(gulp.dest('public/assets'))
    .pipe(connect.reload())
})

gulp.task('sass', () => {
  const sassCompiler = sass({
    errLogToConsole: false
  }).on('error', sass.logError)

  gulp.src([
    './src/scss/index.scss',
  ])
    .pipe(sassCompiler)
    .pipe(cleancss())
    .pipe(cssbeautify({
      indent: '  ',
      openbrace: 'separate-line',
      autosemicolon: true,
    }))
    .pipe(gulp.dest('public/assets'))
    .pipe(connect.reload())
})

gulp.task('img', () => {
  gulp.src('src/img/*')
    .pipe(gulp.dest('public/assets/'))
})
