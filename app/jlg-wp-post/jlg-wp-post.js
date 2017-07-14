import 'angular-sanitize';
import './jlg-wp-post.scss';

const app = angular.module('jlg-wp-post', [
	'ngSanitize',
]);

import jlgPostExcerptUrl from './tmpl/jlg-post-excerpt.html';
app.component('jlgPostExcerpt', {
	template: jlgPostExcerptUrl,
	controller: function JlgPostExcerptCtrl($http, $log, $q) {
		'ngInject';
		const ctrl = this;
		ctrl.$onInit = function() {
			let promise = $q.resolve();
			if (ctrl.id) {
				promise = $http.get(window.wordpressUrl + '/wp/v2/posts/' + ctrl.id).then(function(response) {
					$log.debug('response', response);
					ctrl.post = response.data;
				});
			} else if (ctrl.post === undefined) {
				promise = $q.reject();
			}
			promise.then(() => {
				return $http.get(window.wordpressUrl + '/wp/v2/media/' + ctrl.post.featured_media);
			}).then(function(response) {
				$log.debug('response media', response);
				ctrl.media = response.data;
			}).catch(function(error) {
				$log.error('error', error);
			});

		};

	},
	bindings: {
		id: '<?',
		post: '<?'
	}
});
