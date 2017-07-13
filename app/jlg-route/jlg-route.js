import '@uirouter/angularjs';

const app = angular.module('jlg-route', [
	'ui.router',
]);

import jlgHomeUrl from './tmpl/jlg-home.html';
import jlgProductsUrl from './tmpl/jlg-products.html';
import jlgServicesUrl from './tmpl/jlg-services.html';
import jlgContactUrl from './tmpl/jlg-contact.html';

app.config(function ($locationProvider, $urlRouterProvider, $stateProvider) {

	$locationProvider
		.html5Mode(true);

	$stateProvider.state({
		name: 'home',
		url: '/',
		template: jlgHomeUrl
	});
	$stateProvider.state({
		name: 'products',
		url: '/products',
		template: jlgProductsUrl,
	});
	$stateProvider.state({
		name: 'services',
		url: '/services',
		template: jlgServicesUrl
	});
	$stateProvider.state({
		name: 'contact',
		url: '/contact',
		template: jlgContactUrl
	});

	$urlRouterProvider.otherwise('/');
});