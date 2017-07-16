angular.module('main')
	.config((jlgWordpressProvider) => {
		'ngInject';
		jlgWordpressProvider.url('<%= url %>' + 'wp-json');
	})
	.run(($rootScope) => {
		$rootScope.pages = {
			contact: 'Contact',
			services: 'Services',
			products: 'Produits',
		};
	});
