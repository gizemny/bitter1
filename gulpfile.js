// 'var elixir = require('laravel-elixir');
'use strict';
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

// elixir(function(mix) {
//     mix.sass('app.scss');
// });

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('bundle', function() {
	return browserify({
		entries: ['public/src/js/app.js'],
		debug: true
	}).bundle()
	.on('error', function(error) {
		console.log(error.toString());
		this.emit('end');
	})
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(gulp.dest('public/js/'));
});

gulp.task('watch', function() {
	gulp.watch('public/src/js/**/*.js', ['bundle']);
});

gulp.task('default', ['bundle', 'watch']);