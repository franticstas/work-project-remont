"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var server = require("browser-sync").create();
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

gulp.task("css", function () {
  return gulp.src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("src/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: true,
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("css", "server"));
