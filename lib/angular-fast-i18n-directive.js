'use strict';

/**
 * i18n Directives 
 */

angular.module('ngFastI18n.directives', [])
.directive('lng', ['i18nService', function(i18nService) {
	return {
		link: function (scope, elm, attrs) {
			scope.api = i18nService;
			scope.$watch('api.current', updateLanguage);

			function updateLanguage() {
				i18nService.translate(elm, attrs.lng);
			}
    	}
	}
}]);