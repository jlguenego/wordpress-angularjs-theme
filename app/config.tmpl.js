angular.module('main')
	.config((jlgWordpressProvider) => {
		'ngInject';
		jlgWordpressProvider.url('<%= url %>' + 'wp-json');
	})
	.run(($rootScope) => {
		$rootScope.pages = {
			contact: '<%= pages.contact %>',
			services: '<%= pages.services %>',
			products: '<%= pages.products %>',
		};
	});
