angular.module('main')
	.run(($rootScope, jlgWordpress) => {
		$rootScope.pages = {
			contact: '<%= pages.contact %>',
			services: '<%= pages.services %>',
			products: '<%= pages.products %>',
		};
		jlgWordpress.url = '<%= url %>';
		jlgWordpress.init();
	});
