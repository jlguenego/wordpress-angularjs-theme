import 'angular-sanitize';
import './jlg-wordpress.scss';

const app = angular.module('jlg-wordpress', [
	'ngSanitize',
]);

app.service('jlgWordpress', function JlgWordpress($http, $log, $q) {
	'ngInject';
	const service = this;
	let isReady = false;
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
		isReady = true;
		$log.debug('stack', stack);
		let i = 0;
		for (let  callback = stack.pop(); callback !== undefined; callback = stack.pop()) {
			$log.debug('stack', stack);
			$log.debug('callback', callback);
			$log.debug('wordpress', service);
			callback();
			i++;
			if (i > 10) {
				break;
			}
		}
	}).catch((error) => {
		$log.error('error', error);
	});

	service.ready = function() {
		return $q((fulfill, reject) => {
			if (isReady) {
				fulfill();
				return;
			}
			stack.push(fulfill);
		});
	};

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
