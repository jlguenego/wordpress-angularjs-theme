angular.module('main')
	.config((jlgWordpressProvider) => {
		'ngInject';
		jlgWordpressProvider.url('http://localhost/repos/wordpress-example/' + 'wp-json');
	});
