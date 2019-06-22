const { src, watch, parallel, dest } = require('gulp');

const concat = require('gulp-concat'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'), // For sass/scss files
	uglify = require('gulp-uglify'),
	cleancss = require('gulp-clean-css'),
	notify = require('gulp-notify'),
	autoprefixer = require('gulp-autoprefixer');



function browserServer() {
	browserSync.init({
		proxy: 'localhost.wp' // Put your local domain
	});
}

// Reload when php files are changed
function code() {
	return src('./**/*.php')
		.pipe(browserSync.reload({ stream: true }));
}

function styles() {
	return src([
		'./scss/libs-css.scss',
		'./scss/main.scss',
		'./scss/media.scss'
	])
		.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
		.pipe(concat('styles.css'))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
		.pipe(dest('./dist'))
		.pipe(browserSync.stream())
}

function scripts() {
	return src([
		'./js/libs-js.js',
		'./js/common.js'
	])
		.pipe(concat('scripts.js'))
		.pipe(uglify()) // You may turn off file minification
		.pipe(dest('./dist'))
		.pipe(browserSync.reload({ stream: true }));
}


function watchChange() {
	watch('./**/*.php', parallel(code))
	watch('./scss/*.scss', parallel(styles))
	watch('./js/*.js', parallel(scripts))
}

exports.default = parallel(styles, scripts, browserServer, watchChange);