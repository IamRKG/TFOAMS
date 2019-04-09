'use strict';

/*
 * Define services module
 */
angular.module('TfoamsUiApp.Services', [
   	'restangular',
	'WebCore.Components',
	'WebCore.Services'
 ]);
 
 angular.module('TfoamsUiApp.Services')
	.constant('TfoamsUiAppConstants', {
		'select':'Select',
		'fieldServiceEngineer': 'Field Service Engineer',
		'generalUser': 'General User',
		'readOnly': 'Read Only',
		'regionalAdmin': 'Regional Admin',
		'otherResource': 'Other Resource',
		'primaryDispatcher': 'Primary Dispatcher',
		'secondaryDispatcher': 'Secondary Dispatcher'
	});
