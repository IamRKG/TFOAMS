'use strict';

describe('TfoamsUiApp.home SearchRequestsUIC:', function() {
	
	// Dependencies
	var scope, $rootScope, $controller;
	var reportsUIBF, modalService, AuthorizationUIBF;
	
	function SearchRequestsUIC() {
		var controller = $controller('SearchRequestsUIC as searchRequestsCtrl', {
			$scope : scope
		});
		return controller;
	};
	
	beforeEach(function(){
		module('TfoamsUiApp.Home');
		module('TfoamsUiApp.Services');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
	 	   $controller = $injector.get('$controller');
	 	   reportsUIBF = $injector.get('reportsUIBF');
	 	   modalService = $injector.get('modalService');
	 	   AuthorizationUIBF = $injector.get('AuthorizationUIBF');
	 	 
	    });
		
	
		scope = $rootScope.$new();
		

	});
	
	it('should be registered', function(){
    	expect(SearchRequestsUIC).toBeDefined();
	});
	
});