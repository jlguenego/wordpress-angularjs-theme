import 'angular-sanitize';
import '../jlg-wordpress/jlg-wordpress.js';

const app = angular.module('jlg-layout', [
	'ngSanitize',
	'jlg-wordpress',
]);

import jlgHeaderUrl from './tmpl/jlg-header.html';
app.component('jlgHeader', {
	template: jlgHeaderUrl,
	controller: function JlgHeaderCtrl($http, $log, jlgWordpress) {
		'ngInject';
		const ctrl = this;
		ctrl.jlgWordpress = jlgWordpress;
	}
});

import jlgBodyUrl from './tmpl/jlg-body.html';
app.component('jlgBody', {
	template: jlgBodyUrl,
	controller: function JlgBodyUrl($http, $log) {
		'ngInject';
		const ctrl = this;
		$http.get(window.wordpressUrl + '/wp/v2/posts').then(function(response) {
			$log.debug('response', response);
			ctrl.posts = response.data;
		}).catch(function(error) {
			$log.error('error', error);
		});
	}
});

import jlgFooterUrl from './tmpl/jlg-footer.html';
app.component('jlgFooter', {
	template: jlgFooterUrl
});