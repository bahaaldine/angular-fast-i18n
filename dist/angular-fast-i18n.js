/*! angular-fast-i18n - v0.0.19 - 2014-11-20
* Copyright (c) 2014 ; Licensed  */
'use strict';

angular.module('ngFastI18n.controllers', [])
.controller('languageCtrl', ['$scope', 'i18nService', function($scope, i18nService) {
	// TODO: move this in configuration
	$scope.languages = [
		{ name: 'English', id: 'en'},
		{ name: 'Francais', id: 'fr'}
	];

	$scope.setLanguage = function(e) {
		i18nService.setLanguage(e);
	};
}]);
'use strict';

angular.module('ngFastI18n.directives', [])
.directive('lng', ['i18nService', function(i18nService) {
	return {
		link: function (scope, elm, attrs) {
			scope.api = i18nService;
			scope.$watch('api.current', function() {
				i18nService.translate(elm, attrs.lng);
			});
			attrs.$observe('lng', function(attr) {
				if ( attr != null ) {
					i18nService.translate(elm, attr);
				}
			});
		}
	};
}]);
angular.module('ngFastI18n.services', [])
.factory('i18nService', [ '$q', '$resource', function($q, $resource) {
	'use strict';	
	var getString = function (identifier) {
		var languageFilePath = 'i18n/languages/'+this.current+'.json';
		var result = null;
		var deferred = $q.defer();

        $resource(languageFilePath).get(function (data) {
            result = data;
			for (var i = 0, split = identifier.split('.'); i !== split.length && result; ++i) {
				result = result[split[i]];
			}
			deferred.resolve(result);
		});

		return deferred.promise;
	};

	var translate = function (elm, attr) {
		if ( typeof this.current === "undefined" ) {
			this.current = navigator.language || navigator.userLanguage;
			this.current = this.current.substr(0, 2);
			if ( this.current == null ) {
				this.current = 'en';
			}
		}

		var split = attr.match(/([^:]+):(.+)/,'g');

		if (split != null) {
			var type = split[1];
			var value = split[2];
		}

		var languageFilePath = 'i18n/languages/'+this.current+'.json';

		var previous = this.previous;
        $resource(languageFilePath).get(function (data) {
            var result = data;
			for (var i = 0, split = value.split('.'); i !== split.length && result; ++i) {
				result = result[split[i]];
			}
			
			if (typeof(result) === 'undefined') {
				result = '??' + value + '??';
			} else if (typeof(result) === 'object') {
				result = JSON.stringify(result);
			}

			elm.empty();
			switch (type) {
			case 'text':
				elm.text(result);
				break;

			case 'value':
				elm.val(result);
				break;

			case 'placeholder':
				elm.attr('placeholder', result);
				break;

			case 'html':
				elm.html(result);
				break;

			case 'classname':
				elm.removeClass(previous).addClass(result);
				break;

			default:
				elm.text('???' + value + ' (' + type + ')???');
				break;
			}

		});
	};

	
	var setLanguage = function(e) {
		this.previous = this.current;
		this.current = e; 
	};

	return  {
		current: this.current,
		previous: this.previous,
		getString: getString,
		translate: translate,
		setLanguage: setLanguage
	};
}]);
'use strict';

angular.module('ngFastI18n', ['ngFastI18n.services', 'ngFastI18n.directives', 'ngFastI18n.controllers']);