import '@uirouter/angularjs';
import '../jlg-wordpress/jlg-wordpress.js';

const app = angular.module('jlg-route', [
	'ui.router',
	'jlg-wordpress',
]);

import jlgHomeUrl from './tmpl/jlg-home.html';
import jlgProductsUrl from './tmpl/jlg-products.html';
import jlgServicesUrl from './tmpl/jlg-services.html';
import jlgContactUrl from './tmpl/jlg-contact.html';
import jlgPostUrl from './tmpl/jlg-post.html';

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
	$stateProvider.state({
		name: 'post',
		url: '/posts/{id}',
		template: jlgPostUrl,
		controller: function PostCtrl($log, $stateParams, jlgWordpress) {
			'ngInject';
			$log.debug('PostCtrl', arguments);
			const ctrl = this;
			jlgWordpress.ready().then(function() {
				$log.debug('PostCtrl ready', $stateParams, jlgWordpress.posts);
				ctrl.post = jlgWordpress.posts.find(n => n.id === +$stateParams.id);
				$log.debug('ctrl.post', ctrl.post);
				ctrl.media = jlgWordpress.medias.find(n => n.id === ctrl.post.featured_media);
				
			});
			
		},
		controllerAs: '$ctrl',
	});

	$urlRouterProvider.otherwise('/');
});