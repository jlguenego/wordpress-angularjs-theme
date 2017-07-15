import './style.scss';

import './jlg-layout/jlg-layout.js';
import './jlg-route/jlg-route.js';

angular.module('main', [
		'jlg-layout',
		'jlg-route',
	])
	.config((jlgWordpressProvider) => {
		'ngInject';
		jlgWordpressProvider.url('http://localhost/repos/wordpress-example/wp-json');
	});
