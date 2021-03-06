import 'angular-sanitize';
import './jlg-wordpress.scss';

const app = angular.module('jlg-wordpress', [
	'ngSanitize',
]);

app.service('jlgWordpress', function JlgWordpress($log, $q, $http) {
	'ngInject';
	const service = this;
	this.isReady = false;
	const stack = [];
	this.url = undefined;

	this.init = () => {
		$log.debug('jlgWordpress.url', this.url);
		if (!this.url) {
			$log.error('JlgWordpress: url not defined in provider!');
			return;
		}
		const url =  this.url + 'wp-json'
		$q.all([
			$http.get(url).then(function(response) {
				$log.debug('response', response);
				service.info = response.data;
			}),
			$http.get(url + '/wp/v2/posts').then(function(response) {
				$log.debug('response', response);
				service.posts = response.data;
			}),
			$http.get(url + '/wp/v2/media').then(function(response) {
				$log.debug('response', response);
				service.medias = response.data;
			}),
			$http.get(url + '/wp/v2/pages').then(function(response) {
				$log.debug('response', response);
				service.pages = response.data;
			}),
		]).then((responses) => {
			this.isReady = true;
			$log.debug('stack', stack);
			while (stack.length) {
				stack.pop()();
			}
		}).catch((error) => {
			$log.error('error', error);
		});
	};


	service.ready = () => $q(fulfill => {
		if (this.isReady) {
			return fulfill();
		}
		stack.push(fulfill);
	});

});

app.controller('jlgWordpressCtrl', function JlgBodyUrl($http, $log, jlgWordpress) {
	'ngInject';
	const ctrl = this;
	ctrl.jlgWordpress = jlgWordpress;
});

import jlgPostExcerptUrl from './tmpl/jlg-post-excerpt.html';
app.component('jlgPostExcerpt', {
	template: jlgPostExcerptUrl,
	controller: function JlgPostExcerptCtrl($log, jlgWordpress) {
		'ngInject';
		this.ready = false;
		this.$onInit = () => {
			jlgWordpress.ready().then(() => {
				if (this.id) {
					this.post = jlgWordpress.posts.find(n => n.id === this.id);
				}
				if (this.post === undefined) {
					$log.error('post not found');
					return;
				}
				this.media = jlgWordpress.medias.find(n => n.id === this.post.featured_media);
				this.excerpt = this.post.excerpt.rendered.replace(/<p class="link-more">.*<\/p>/, '');
				this.ready = true;
			});
		};

	},
	bindings: {
		id: '<?',
		post: '<?'
	}
});

import jlgPageUrl from './tmpl/jlg-page.html';
app.component('jlgPage', {
	template: jlgPageUrl,
	controller: function JlgPageCtrl($log, jlgWordpress) {
		'ngInject';
		this.ready = false;
		this.$onInit = () => {
			jlgWordpress.ready().then(() => {
				if (this.title) {
					this.page = jlgWordpress.pages.find(n => n.title.rendered === this.title);
				}
				if (this.page === undefined) {
					$log.error('page not found');
					return;
				}
				this.ready = true;
			});
		};

	},
	bindings: {
		title: '<?',
		page: '<?'
	}
});
