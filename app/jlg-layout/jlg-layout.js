const app = angular.module('jlg-layout', [
	'jlg-layout',
]);

import jlgHeaderUrl from './tmpl/jlg-header.html';
app.component('jlgHeader', {
	template: jlgHeaderUrl
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