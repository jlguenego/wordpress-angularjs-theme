import 'angular-sanitize';
import './jlg-wp-post.scss';

const app = angular.module('jlg-wp-post', [
	'ngSanitize',
]);

app.service('wordpress', function Wordpress($http, $log, $q) {
	'ngInject';
	const wordpress = this;
	let isReady = false;
	const stack = [];
	$q.all([
		$http.get(window.wordpressUrl + '/wp/v2/posts').then(function(response) {
			$log.debug('response', response);
			wordpress.posts = response.data;
		}),
		$http.get(window.wordpressUrl + '/wp/v2/media').then(function(response) {
			$log.debug('response', response);
			wordpress.medias = response.data;
		}),
	]).then((responses) => {
		isReady = true;
		$log.debug('stack', stack);
		let i = 0;
		for (let  callback = stack.pop(); callback !== undefined; callback = stack.pop()) {
			$log.debug('stack', stack);
			$log.debug('callback', callback);
			$log.debug('wordpress', wordpress);
			callback();
			i++;
			if (i > 10) {
				break;
			}
		}
	}).catch((error) => {
		$log.error('error', error);
	});

	wordpress.ready = function() {
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
	controller: function JlgPostExcerptCtrl($log, wordpress) {
		'ngInject';
		const ctrl = this;
		ctrl.ready = false;
		ctrl.$onInit = function() {
			wordpress.ready().then(() => {
				$log.debug('on demarre ');
				if (ctrl.id) {
					ctrl.post = wordpress.posts.find(n => n.id === ctrl.id);
				}
				if (ctrl.post === undefined) {
					$log.error('post not found');
					return;
				}
				ctrl.media = wordpress.medias.find(n => n.id === ctrl.post.featured_media);
				ctrl.ready = true;
			});
		};

	},
	bindings: {
		id: '<?',
		post: '<?'
	}
});
