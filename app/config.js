angular.module('main')
	.config((jlgWordpressProvider) => {
		'ngInject';
		jlgWordpressProvider.url('https://jlg-consulting.com/wordpress/' + 'wp-json');
	})
	.run(($rootScope) => {
		$rootScope.pages = {
			contact: 'Contact',
			services: 'Services',
			products: 'Produits',
		};
	});
