'use strict';

/*
 * Define services module
 */
angular.module('WebCore.Services', [
   	'restangular',
   	'pascalprecht.translate'
 ]);

angular.module('WebCore.Services')
	.constant('_', window._)
	.constant('Constants', {
		'local': 'local',
		'wslBaseUrl': 'https://www.wsl.ford.com/login.cgi?portstripping=no&back='
	})
	.constant('useMocks', false);
