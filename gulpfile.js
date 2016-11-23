var gulp 		= require('gulp'),
	sass 		= require('gulp-sass'),
	browserSync = require('browser-sync').create(),

	cleanCSS 		= require('gulp-clean-css'),
	autoprefixer 	= require('gulp-autoprefixer');

gulp.task('serve', ['html', 'sass', 'imgs'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        notify: false
    });

    gulp.watch("app/sass/*.sass", ['sass']);
    gulp.watch("app/**/*.html", ['html']);
    gulp.watch("app/imgs/*.*", ['imgs']);
});

gulp.task('html', function() {
	gulp.src('app/**/*.html')
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
});
gulp.task('imgs', function() {
	gulp.src('app/imgs/*.*')
		.pipe(gulp.dest('dist/imgs'));
});

gulp.task('css', ['sass'], function() {
	gulp.src('app/css/*.css')
        .pipe(autoprefixer())
        //.pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});
gulp.task('sass', function() {
	gulp.src('app/sass/*.sass')
		.pipe(sass())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
