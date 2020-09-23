const { src, dest, series, task, watch, parallel } = require('gulp')
const browserSync = require('browser-sync').create()
const clean = require('gulp-clean')
const pump = require('pump')

//Sass
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const extractMediaQueries = require('gulp-extract-media-queries')

//JavaScript
const source = require('vinyl-source-stream')
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const babelify = require('babelify')
const uglify = require('gulp-uglify')

//Favicons
const favicons = require('gulp-favicons')

task(clear = () => pump([
	src(['public/css', 'public/favicon', 'public/images', 'public/js'], { allowEmpty: true }),
	clean(),
]))

task(images = () => pump([
	src('resources/images/**/*'),
	dest('public/images'),
]))

task(styles = () => pump([
	src('resources/sass/app.sass'),
	sass().on('error', sass.logError),
	extractMediaQueries(),
	cleanCSS(),
	dest('public/css'),
	browserSync.stream(),
]))

task(favicon = () => pump([
	src('resources/favicon/favicon.png'),
	favicons({
		path: '/favicon',
		appName: 'Matriarcal',
		appDescription: 'Matriarcal',
		lang: 'pt-BR',
		theme_color: '#2B2824',
		start_url: '/',
		icons: { appleIcon: false, appleStartup: false, coast: false, firefox: false, windows: false, yandex: false },
	}),
	dest('public/favicon'),
]))

task(scripts = () => pump([
	browserify('resources/js/app.js').transform(babelify, {
			presets: ['@babel/env'],
			plugins: [['@babel/transform-runtime']],
		},
	).bundle(),
	source('app.js'),
	buffer(),
	uglify(),
	dest('public/js'),
]))

task(server = () => {
	browserSync.init({ proxy: 'localhost', logLevel: 'silent' })
	watch('resources/sass/**/*', styles)
	watch('resources/js/**/*', series(scripts, reload))
	watch('resources/images/**/*', series(images, reload))
	watch('resources/favicon/favicon.png', series(favicon, reload))
	watch(['resources/views/**/*', 'resources/svg/**/*'], reload)
})


task(reload = done => {
	browserSync.reload()
	done()
})

module.exports.watch = series(clear, parallel(images, styles, scripts, favicon), server)
module.exports.build = series(clear, parallel(images, styles, scripts, favicon))