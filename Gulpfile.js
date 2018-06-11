var gulp = require('gulp'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  htmlmin = require('gulp-htmlmin'),
  clean = require('gulp-clean'),
  amdOptimize = require('amd-optimize');

// 清理dist目录
gulp.task('clean_dist', function() {
  return gulp.src('dist', {
      read: false
    })
    .pipe(clean());
});

gulp.task('pack_root', ['clean_dist'], function() {
  return gulp.src('app/*.*')
    .pipe(gulp.dest('dist'));
});

gulp.task('pack_html', ['clean_dist'], function() {
  var options = {
    removeComments: true, //清除HTML注释
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
  };

  return gulp.src('app/html/**/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist/html'));
});

gulp.task('pack_css', ['clean_dist'], function() {
  return gulp.src('app/css/main.css')
    .pipe(gulp.dest('dist/css'));
});

gulp.task('pack_other', ['clean_dist'], function() {
  return gulp.src('app/*(img|font|json)/*')
    .pipe(gulp.dest('dist/'));
});

gulp.task('pack_requirejs', ['clean_dist'], function() {
  return gulp.src('app/bower_components/requirejs/require.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/bower_components/requirejs'));
});

gulp.task('pack_html5shiv', ['clean_dist'], function() {
  return gulp.src('app/bower_components/html5shiv/dist/html5shiv.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/bower_components/html5shiv/dist'));
});

gulp.task('pack_lib', ['clean_dist'], function() {
  return gulp.src('app/lib/**/*')
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('minify_js', ['clean_dist'], function() {
  return gulp.src('app/js/**/*.js')
    .pipe(amdOptimize("main", {
      baseUrl: 'app/js',
      paths: {
        'angular': '../bower_components/angular/angular.min',
        'angular-route': '../bower_components/angular-route/angular-route.min',
        'angular-cookies': '../bower_components/angular-cookies/angular-cookies.min',
        'domReady': '../bower_components/requirejs-domready/domReady.min',
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'WdatePicker': '../lib/WdatePicker/WdatePicker',
        'MD5': '../lib/md5'
      },
      shim: {
        'angular': {
          exports: 'angular'
        },
        'angular-route': {
          deps: ['angular']
        },
        'angular-cookies': {
          deps: ['angular']
        },
        'jquery': {
          exports: 'jquery'
        },
        'WdatePicker': {
          exports: 'WdatePicker'
        },
        'MD5': {
          exports: 'MD5'
        }
      }
    }))
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

gulp.task('default', [
  'pack_root', 'pack_html', 'pack_css', 'pack_other', 'pack_requirejs', 'pack_html5shiv', 'pack_lib', 'minify_js'
]);
