var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    pug = require('gulp-pug');

var path ={

    src: {
        html: './src/index.pug',
        js: './src/js/*.js',
        style: './src/style/*.less'
    },

    watch: {
        html: './src/**/*.pug',
        js: './src/js/*.js',
        style: './src/style/**/*.less'
    },

    build: {
        html: './',
        js: './build/js/',
        style: './build/style/'
    }

};

gulp.task('pug', function() {
    return gulp.src(path.src.html)
        .pipe(pug())
        .pipe(gulp.dest(path.build.html));
});

gulp.task('less', function() {
    gulp.src(path.src.style)
        .pipe(less())
        .pipe(gulp.dest(path.build.style));
});

gulp.task('js',function(){
    gulp.src(path.src.js)
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('watcher',function(){
    gulp.watch(path.watch.html, ['pug']);
    gulp.watch(path.watch.style, ['less']);
    gulp.watch(path.watch.js, ['js']);
});

gulp.task('default', ['watcher']);