angular.module('main')
	.run(($rootScope, jlgWordpress) => {
		$rootScope.pages = {
			contact: 'Contact',
			services: 'Services',
			products: 'Produits',
		};
		jlgWordpress.url = 'https://jlg-consulting.com/wordpress/';
		jlgWordpress.init();
	});
