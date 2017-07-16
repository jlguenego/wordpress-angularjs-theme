angular.module('main')
	.config((jlgWordpressProvider) => {
		'ngInject';
		jlgWordpressProvider.url('http://localhost/repos/wordpress-example/' + 'wp-json');
	})
	.run(($rootScope) => {
		$rootScope.pages = {
			contact: 'Contact',
			services: 'Services',
			products: 'Produits',
		};
	});
