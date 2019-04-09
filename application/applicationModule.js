'use strict';

/*
 * Define application module
 *
 *
 *
 */
angular.module('TfoamsUiApp', [
   	'restangular', 
	'ui.router', 
	'ngAnimate',
	'ui.bootstrap',
	'ui.select2',
	'ui.select',
	'ngCookies',
	'ngStorage',
	'pascalprecht.translate',
	'ngTouch',
	'WebCore.Components',
	'WebCore.Services',
	'TfoamsUiApp.Components',
	'TfoamsUiApp.Services',
	'TfoamsUiApp.Home'
 ]);

/*
 * Application module configuration
 */


angular.module('TfoamsUiApp')
	.config(['RestangularProvider', '$translateProvider', '$urlRouterProvider', 'useMocks',
	         function(RestangularProvider, $translateProvider, $urlRouterProvider, useMocks) {		
		/*if (location.hostname == "localhost") {					
			RestangularProvider.setBaseUrl('http://localhost:18000/TFOAMSMobileWeb/TFOAMS/REST');	
		} else if (location.hostname =="https://wwwqamg.tfoams.ford.com"){
			RestangularProvider.setBaseUrl('https://wwwqamg.tfoams.ford.com/TFOAMSMobileWeb/TFOAMS/REST');
		}
		else if (location.hostname =="http://wwwdev.tfoams.ford.com"){
			RestangularProvider.setBaseUrl('http://wwwdev.tfoams.ford.com/TFOAMSMobileWeb/TFOAMS/REST');
		}
		else (location.hostname =="https://wwwmg.tfoams.ford.com"){
			RestangularProvider.setBaseUrl('https://wwwmg.tfoams.ford.com/TFOAMSMobileWeb/TFOAMS/REST');
		};*/
		
		if (location.hostname == "localhost") {			
			RestangularProvider.setBaseUrl('http://localhost:15000/TFOAMSMobileWeb/TFOAMS/REST');		
		} else {
					RestangularProvider.setBaseUrl('https://wwwmg.tfoams.ford.com/TFOAMSMobileWeb/TFOAMS/REST');
		};

		if(useMocks) {
			RestangularProvider.setBaseUrl('test/lib/mocks/');
			RestangularProvider.setRequestSuffix('.json');			
			
		}
		
		RestangularProvider.setRequestInterceptor(function(elem, operation) {
			  if (operation === "remove") {
			     return undefined;
			  } 
			  return elem;
			});


		
		
	    RestangularProvider.setDefaultHttpFields({
		    xsrfCookieName: 'WSL-credential',
			withCredentials: true
	    });
	    
	    $translateProvider.determinePreferredLanguage();
	    
	    $translateProvider.preferredLanguage('en_US');
	    
	    $translateProvider.fallbackLanguage('en_US');
	    
	    $translateProvider.useStaticFilesLoader({
			prefix: 'application/languages/',
			suffix: '.json'
		});
		
                 
		$urlRouterProvider.otherwise('/');	
		
		
		
	}]);


