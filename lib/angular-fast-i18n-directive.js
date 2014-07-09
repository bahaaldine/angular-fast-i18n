'use strict';

angular.module('ngFastI18n.directives', [])
.directive('lng', ['i18nService', function(i18nService) {
	return {
		link: function (scope, elm, attrs) {
			scope.api = i18nService;
			scope.$watch('api.current', function() {
				i18nService.translate(elm, attrs.lng);
			});
		}
	};
}]);