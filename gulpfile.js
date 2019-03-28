// styles min, watch
// scripts min, watch
// browser reload / sync


var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss'); // to minify files
var concat = require('gulp-concat');
var minify = require('gulp-minify'); // minify js
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');
var series = require('stream-series');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');

gulp.task('connect', function() {
    connect.server({
        root: 'build',
        livereload: true
    });
});

gulp.task('vendor-styles', function () {
    return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.css', 'node_modules/owl.carousel/dist/assets/owl.carousel.css'])
        .pipe(concat('vendors.min.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('build/styles'));
});

gulp.task('app-styles', function() {
    return gulp.src("src/styles/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(uglifycss())
        .pipe(gulp.dest("build/styles"))
        .pipe(connect.reload());
});

gulp.task('styles-prod', function() {
    return gulp.src("src/styles/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(replace('../../img', '../img'))
        .pipe(uglifycss())
        .pipe(gulp.dest("build/styles"))
});

gulp.task('vendor-scripts', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/bootstrap/dist/js/bootstrap.js', 'node_modules/owl.carousel/dist/owl.carousel.js'])
        .pipe(concat('vendors.min.js'))
        .pipe(minify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('app-scripts', function() {
    return gulp.src("src/js/*.js")
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(gulp.dest("build/js"))
        .pipe(connect.reload());
});

gulp.task('build-images', function() {
    return gulp.src('src/img/**/*.{gif,jpg,png,svg}')
        .pipe(gulp.dest('build/img'));
});

gulp.task('build-fonts', function() {
    return gulp.src('src/fonts/**/*.{otf,ttf,woff,eot}')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('index', function () {
    var vendorStream = gulp.src(['build/styles/vendors.min.css', 'build/js/vendors.min.js'], {read: false});
    var appStream = gulp.src(['build/styles/main.css', 'build/js/main.js'], {read: false});
    return gulp.src('src/index.html')
        .pipe(inject(series(vendorStream, appStream), {ignorePath: "build", addRootSlash: false}))
        .pipe(connect.reload())
        .pipe(gulp.dest('build'));
});


gulp.task('clean', function () {
    return gulp.src('build/*').pipe(clean());
});

gulp.task('build', function(callback) {
    runSequence('clean',
        ['vendor-styles', 'vendor-scripts', 'app-styles', 'app-scripts', 'build-images', 'build-fonts'],
        'index', callback);
});

        gulp.task('build-prod', function(callback) {
            runSequence('clean',
        ['vendor-styles', 'vendor-scripts', 'styles-prod', 'app-scripts', 'build-images', 'build-fonts'],
        'index', callback);
});

gulp.task('watch', function () {
    var appStyles = ['app-styles'];
    var appScripts = ['app-scripts'];
    var index = ['index'];
    var buildImages = ['build-images'];
    var buildFonts = ['build-fonts'];

    gulp.watch('src/styles/**/*.scss', appStyles);
    gulp.watch('src/js/*.js', appScripts);
    gulp.watch('src/img/**/*', buildImages);
    gulp.watch('src/fonts/**/*', buildFonts);
    gulp.watch('src/index.html', index);
});

gulp.task('default', ['build', 'connect', 'watch']);