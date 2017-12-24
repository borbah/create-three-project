const gulp = require('gulp');
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');
const babelify = require('babelify');
const browserify = require('browserify');
const glob = require('glob');
const es = require('event-stream');
const webserver = require('gulp-webserver');
const uglify = require('gulp-uglify');
const streamify = require('gulp-streamify');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const scssSrc = 'scss/main.scss';
const cssPub = 'css/';



gulp.task('scss', function () {
    return gulp.src(scssSrc)

        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 4 version'))
        .pipe(gulp.dest(cssPub))
});

gulp.task('build', function(done) {
	glob('./js/index.js', function(err, files) {
		if(err) done(err);

		var tasks = files.map(function(entry) {
			return browserify({ entries: [entry] })
				.transform('babelify', {presets: ['babel-preset-env']})
				.bundle()
				.pipe(source(entry))
				.pipe(streamify(uglify()))
				.pipe(rename({
					extname: '.bundle.js'
				}))
				.pipe(gulp.dest('./dist/'));
		});
		es.merge(tasks).on('end', done);
	});
});

gulp.task('serve', function() {
	gulp.src('./')
		.pipe(webserver({
			'host': '0.0.0.0',
			'fallback': 'index.html',
			'livereload': true,
			'open': true,
			'port': '4000'
		}));
});

gulp.task('watch', ['scss', 'build', 'serve'], function () {
	gulp.watch('./js/**/*.js', ['build']);
	gulp.watch('./scss/**/*.scss', ['scss']);
	gulp.watch('./index.html', ['build']);
});

gulp.task('run', ['watch']);
