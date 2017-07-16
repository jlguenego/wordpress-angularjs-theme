import 'angular-sanitize';
import '../jlg-wordpress/jlg-wordpress.js';
import './jlg-layout.scss';

const app = angular.module('jlg-layout', [
	'ngSanitize',
	'jlg-wordpress',
]);

import jlgHeaderUrl from './tmpl/jlg-header.html';
app.component('jlgHeader', {
	template: jlgHeaderUrl,
	controller: 'jlgWordpressCtrl'
});

import jlgBodyUrl from './tmpl/jlg-body.html';
app.component('jlgBody', {
	template: jlgBodyUrl,
	controller: 'jlgWordpressCtrl'
});

import jlgFooterUrl from './tmpl/jlg-footer.html';
app.component('jlgFooter', {
	template: jlgFooterUrl,
	controller: 'jlgWordpressCtrl'
});
