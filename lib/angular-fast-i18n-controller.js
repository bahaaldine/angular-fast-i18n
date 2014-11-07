'use strict';

angular.module('ngFastI18n.controllers', [])
.controller('languageCtrl', ['$scope', 'i18nService', function($scope, i18nService) {
	// TODO: move this in configuration
	$scope.languages = [
		{ name: 'English', id: 'en'},
		{ name: 'Francais', id: 'fr'}
	];

	$scope.setLanguage = function(e) {
		i18nService.previous = i18nService.current;
		i18nService.current = e; 
	};
}]);