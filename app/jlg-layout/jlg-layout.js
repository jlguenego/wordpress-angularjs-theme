import 'angular-sanitize';

const app = angular.module('jlg-layout', [
	'ngSanitize',
]);

import jlgHeaderUrl from './tmpl/jlg-header.html';
app.component('jlgHeader', {
	template: jlgHeaderUrl,
	controller: function JlgHeaderCtrl($http, $log) {
		'ngInject';
		const ctrl = this;
		$http.get(window.wordpressUrl + '').then(function(response) {
			$log.debug('response', response);
			ctrl.data = response.data;
		}).catch(function(error) {
			$log.error('error', error);
		});
	}
});

import jlgBodyUrl from './tmpl/jlg-body.html';
app.component('jlgBody', {
	template: jlgBodyUrl,
	controller: function() {
		'ngInject';
		this.name = 'Jean-Louis';
	}
});

import jlgFooterUrl from './tmpl/jlg-footer.html';
app.component('jlgFooter', {
	template: jlgFooterUrl
});