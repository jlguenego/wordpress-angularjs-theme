const gulp = require('gulp');
const gulpIf = require('gulp-if');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const del = require('del');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const eslint = require('gulp-eslint');
const fs = require('fs');
const rp = require('request-promise');
const consolidate = require('consolidate');
const ejs = require('ejs');
consolidate.requires.ejs = ejs;
const gutil = require('gulp-util');
const ftp = require('gulp-ftp');
const zip = require('gulp-zip');
const debug = require('gulp-debug');
const glob = require('glob');

const Promise = require('bluebird');
Promise.promisifyAll(fs);
var globAsync = Promise.promisify(glob);

const cfgUtils = require('./cfg/utils.js');


gulp.task('default', ['rebuild']);

const path = {
	base: 'app',
	dist: 'dist',
	zip: 'dist.zip',
	wpk: 'app/wpk',
	zipSrc: ['dist/**/*', 'dist/.htaccess', 'dist/ws/.htaccess', '!dist/**/*.map'],


	indexHtml: 'app/index.html',
	htaccess: ['app/.htaccess.tmpl'],
	resources: ['app/resource/**/*', 'app/wpk/**/*'],
	ftp: ['dist.zip', 'utils/unzip.php'],
	undeploy: 'utils/remove.php',
	lint: ['**/*.js', '!node_modules/**/*', '!app/wpk/**/*', '!dist/**/*']
};

// config
gulp.task('config', function(callback) {
	const devEnv = cfgUtils.getEnv('dev');
	console.log('devEnv', devEnv);
	consolidate.ejs('./app/config.tmpl.js', devEnv).then(function(str) {
		return fs.writeFileAsync('./app/config.js', str);
	}).catch(function(error) {
		console.error('error', error);
	});
});

// clean
gulp.task('clean:dist', function() {
	return del([path.dist]);
});

gulp.task('clean:zip', function() {
	return del([path.zip]);
});

gulp.task('clean:wpk', function() {
	return del([path.wpk]);
});

gulp.task('clean', ['clean:dist', 'clean:zip', 'clean:wpk']);

// resources
gulp.task('resources', function() {
	return gulp.src(path.resources, { base: path.base })
		.pipe(gulp.dest(path.dist));
});

gulp.task('htaccess', function() {
	return gulp.src(path.htaccess, { base: path.base })
		.pipe(rename('.htaccess'))
		.pipe(gulp.dest(path.dist));
});

gulp.task('html', function() {
	return gulp.src(path.indexHtml, { base: path.base })
		.pipe(replace(/\/app\//, '/dist/'))
		.pipe(gulp.dest(path.dist));
});

// webpack
gulp.task('webpack', function(callback) {
	webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false,
		},
		output: {
			comments: false,
		},
		sourceMap: true
	}));
	webpack(webpackConfig, function(err, stats) {
		if (err) {
			throw new gutil.PluginError('webpack', err);
		}
		callback();
	});
});

gulp.task('build', function() {
	console.log('gulp build');
	runSequence('webpack', ['resources', 'html', 'htaccess']);
});

gulp.task('rebuild', function() {
	runSequence('clean', 'build');
});

gulp.task('deploy:unzip', function(callback) {
	const deployEnv = cfgUtils.getEnv('deploy');
	rp(deployEnv.url + 'unzip.php')
		.then(function(htmlString) {
			console.log('htmlString', htmlString);
			callback();
		})
		.catch(function(err) {
			console.log('error', err);
			throw err;
		});
});

gulp.task('deploy:zip', function(callback) {
	return gulp.src(path.zipSrc, { base: 'dist' })
		.pipe(zip(path.zip))
		.pipe(gulp.dest('.'));
});

gulp.task('deploy:ftp', function() {
	var deployEnv = cfgUtils.getEnv('deploy');
	console.log('env', deployEnv);
	console.log('env.ftp', deployEnv.ftp);
	return gulp.src(path.ftp)
		.pipe(ftp(deployEnv.ftp))
		.pipe(gutil.noop());
});

gulp.task('deploy', ['clean:zip'], function() {
	runSequence('deploy:zip', 'deploy:ftp', 'deploy:unzip');
});

gulp.task('undeploy:ftp', function() {
	var deployEnv = cfgUtils.getEnv('deploy');
	console.log('env.ftp', deployEnv.ftp);
	return gulp.src(path.undeploy)
		.pipe(ftp(deployEnv.ftp))
		.pipe(gutil.noop());
});

gulp.task('undeploy:remove', function(callback) {
	var deployEnv = cfgUtils.getEnv('deploy');
	rp(deployEnv.url + 'remove.php')
		.then(function(htmlString) {
			console.log('htmlString', htmlString);
			callback();
		})
		.catch(function(err) {
			console.log('error', err);
			throw err;
		});
});

gulp.task('undeploy', function() {
	runSequence('undeploy:ftp', 'undeploy:remove');
});

// lint
gulp.task('lint', function() {
	return gulp.src(path.lint)
		.pipe(debug())
		.pipe(eslint())
		.pipe(eslint.formatEach())
		.pipe(eslint.failAfterError());
});

gulp.task('lint-fix', function() {
	function isFixed(file) {
		return file.eslint != null && file.eslint.fixed;
	}
	return gulp.src(path.lint)
		.pipe(eslint({
			fix: true
		}))
		.pipe(eslint.formatEach())
		.pipe(gulpIf(isFixed, gulp.dest('.')));
});
