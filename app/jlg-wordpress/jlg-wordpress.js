import 'angular-sanitize';
import './jlg-wordpress.scss';

const app = angular.module('jlg-wordpress', [
	'ngSanitize',
]);

app.service('jlgWordpress', function JlgWordpress($http, $log, $q) {
	'ngInject';
	const service = this;
	this.isReady = false;
	const stack = [];
	$q.all([
		$http.get(window.wordpressUrl + '/wp/v2/posts').then(function(response) {
			$log.debug('response', response);
			service.posts = response.data;
		}),
		$http.get(window.wordpressUrl + '/wp/v2/media').then(function(response) {
			$log.debug('response', response);
			service.medias = response.data;
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

	service.ready = () => $q(fulfill => {
		if (this.isReady) {
			return fulfill();
		}
		stack.push(fulfill);
	});

});

import jlgPostExcerptUrl from './tmpl/jlg-post-excerpt.html';
app.component('jlgPostExcerpt', {
	template: jlgPostExcerptUrl,
	controller: function JlgPostExcerptCtrl($log, jlgWordpress) {
		'ngInject';
		const ctrl = this;
		ctrl.ready = false;
		ctrl.$onInit = function() {
			jlgWordpress.ready().then(() => {
				$log.debug('on demarre ');
				if (ctrl.id) {
					ctrl.post = jlgWordpress.posts.find(n => n.id === ctrl.id);
				}
				if (ctrl.post === undefined) {
					$log.error('post not found');
					return;
				}
				ctrl.media = jlgWordpress.medias.find(n => n.id === ctrl.post.featured_media);
				let html = '';
				ctrl.excerpt = ctrl.post.excerpt.rendered.replace(/<p class="link-more">.*<\/p>/, html);
				ctrl.ready = true;
			});
		};

	},
	bindings: {
		id: '<?',
		post: '<?'
	}
});
