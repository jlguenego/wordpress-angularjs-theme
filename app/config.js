angular.module('main')
	.config((jlgWordpressProvider) => {
		'ngInject';
		jlgWordpressProvider.url('http://www.sequans.com/' + 'wp-json');
	});
