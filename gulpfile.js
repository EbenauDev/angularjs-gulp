const gulp = require('gulp');
const path = require('path');
const concant = require('gulp-concat');
const less = require('gulp-less');
const babel = require('gulp-babel');
const inject = require('gulp-inject');
const uglify = require('gulp-uglify');
const importCss = require('gulp-import-css');


const appBundle = {
  src: [
    "./src/app/app.module.js",
    "./src/app/app.controller.js"
  ]
}

const libsBundle = {
  src: [
    "./node_modules/angular/angular.js",
    "./node_modules/@uirouter/angularjs/release/angular-ui-router.js"
  ]
}

const lessBundle = {
  src: [
    "./src/less/import.app.less",
    "./src/less/import.libs.less",
  ]
}

const pathCss = "./src/css";
const pathLibs = "./src/js";


// Dev Mode
gulp.task('compile-app-less-dev', function () {
  return gulp.src(lessBundle.src, { read: true })
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'include')]
    }))
    .pipe(concant("main.css"))
    .pipe(gulp.dest(pathCss))
});

gulp.task('compile-lib-less-dev', function () {
  return gulp.src(lessBundle.src, { read: true })
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'include')]
    }))
    .pipe(concant("libs.css"))
    .pipe(gulp.dest(pathCss))
});

gulp.task('compile-libs-js-dev', function () {
  return gulp.src(libsBundle.src)
    .pipe(concant("a-libs.js"))
    .pipe(gulp.dest(pathLibs))
});

gulp.task('compile-app-js-dev', function () {
  return gulp.src(appBundle.src)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concant("b-app.js"))
    .pipe(gulp.dest(pathLibs))
});

gulp.task("inject-dev", function () {
  var sources = gulp.src(['./src/js/*.js', './src/css/*.css'], { read: false });
  return gulp.src("./index.html")
    .pipe(inject(sources))
    .pipe(gulp.dest("./"))
});

gulp.task('build:dev', gulp.series(gulp.parallel('compile-app-less-dev', 'compile-lib-less-dev', 'compile-libs-js-dev', 'compile-app-js-dev', 'inject-dev'),
  function (done) {
    done();
  }));



// Prod Mode
gulp.task('compile-app-less-prod', function () {
  return gulp.src(lessBundle.src)
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'include')]
    }))
    .pipe(concant("main.css"))
    .pipe(gulp.dest("./dist/css"))
});

gulp.task('compile-libs-js-prod', function () {
  return gulp.src(libsBundle.src)
    .pipe(concant("libs.js"))
    .pipe(gulp.dest("./dist/js"))
});

gulp.task('compile-app-js-prod', function () {
  return gulp.src(appBundle.src)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concant("app.js"))
    .pipe(gulp.dest("./dist/js"))
});

gulp.task("compile-html-prod", function () {
  return gulp.src("./index.html")
    .pipe(gulp.dest("./dist/"))
})

gulp.task("inject-prod", function () {
  var sources = gulp.src(['./dist/js/*.js', './dist/css/*.css'], { read: false });
  return gulp.src("./dist/index.html")
    .pipe(inject(sources, {
      relative: true,
      addSuffix: '?v=' + new Date().getTime()
    }))
    .pipe(gulp.dest("./dist/"))

});

gulp.task('build:prod', gulp.series(gulp.parallel('compile-app-less-prod',
  'compile-libs-js-prod',
  'compile-app-js-prod',
  "compile-html-prod",
  "inject-prod"),
  function (done) {
    done();
  }));
