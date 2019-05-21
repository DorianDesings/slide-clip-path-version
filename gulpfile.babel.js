import gulp from "gulp"
import sass from "gulp-sass"
import autoprefixer from "gulp-autoprefixer"
import pug from "gulp-pug"
import babel from "gulp-babel"
import concat from "gulp-concat"
import uglify from "gulp-uglify"
import plumber from "gulp-plumber"

import browserSync from 'browser-sync'

const server = browserSync.create()

gulp.task("sass", () => {
  return gulp
    .src("./dev/scss/styles.scss")
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: "compact"
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 3 versions"]
      })
    )
    .pipe(gulp.dest("./public/css"))
    .pipe(server.stream())
})

gulp.task("pug", () => {
  return gulp
    .src("./dev/pug/pages/index.pug")
    .pipe(plumber())
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("./public/"))
})

gulp.task("babel", () => {
  return gulp
    .src("./dev/js/*.js")
    .pipe(plumber())
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(concat("scripts-min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./public/js"))
})

gulp.task("default", () => {
  server.init({
    server: "./public"
  })

  gulp.watch("./dev/scss/**/*.scss", gulp.series("sass"))
  gulp.watch("./dev/pug/**/*.pug", gulp.series("pug")).on("change", server.reload)
  gulp.watch('./dev/js/*.js', gulp.series('babel')).on('change', server.reload)
})
