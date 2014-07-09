'use strict';

angular.module('ngFastI18n.services', [])
.factory('i18nService', [ '$q', '$resource', function($q, $resource) {
	
	var previous;
	var current;

	function setLanguage(lang) {
		previous = current;
		current = lang;
	}

	function getString(identifier) {
		var languageFilePath = 'i18n/languages/'+current+'.json';
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
	}

	function translate(elm, attr) {
		if ( current == null) {
			current = navigator.language || navigator.userLanguage;
			current = current.substr(0, 2);
			if ( current == null ) {
				current = 'en';
			}
		}

		var split = attr.match(/([^:]+):(.+)/,'g');

		if (split != null) {
			var type = split[1];
			var value = split[2];
		}

		var languageFilePath = 'i18n/languages/'+current+'.json';

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
	}

	return  {
		current: current,
		previous: previous,
		setLanguage: setLanguage,
		getString: getString,
		translate: translate
	};
}]);