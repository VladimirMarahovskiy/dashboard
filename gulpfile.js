var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var del = require('del');
var cssPrefix = require('gulp-autoprefixer');
var plumberNotifier = require('gulp-plumber-notifier');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var polyfill = require('babel-polyfill');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifyJS = require('gulp-uglifyjs');
var rename = require('gulp-rename');
var removeLogging = require('gulp-strip-debug');
let cleanCSS = require('gulp-clean-css');
var autoprefixBrowsers = ['last 5 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11'];


var pathes = {
    src: {
        sass: './sass/**/*.scss',

    },
    build: {
        js: './build/js',
        css: './build/css',
        media: './build/css/media'
    }
};


gulp.task('clean', function (cb) {
    del(['build/css/**', '!build/css',
            'build/js/**', '!build/js'
        ],
        cb);
});

gulp.task('css', function () {
    return gulp.src(pathes.src.sass)
        .pipe(plumberNotifier())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(cleanCSS())
        .pipe(rename("style.css"))
        .pipe(gulp.dest(pathes.build.css));
});



gulp.task('prod', [
    //'clean',
   'css'
]);


gulp.task('watch', function () {
    gulp.watch(pathes.src.sass, ['prod']);
});

gulp.task('default', ['prod', 'watch']);