'use strict';
describe('TfoamsUiApp.Home HelpUIC',function(){
	
	// Dependencies
	var scope, $state, $rootScope, $controller, $stateParams, $q, $httpBackend, $templateCache;
	var helpUIBF, AuthorizationUIBF, Restangular;
	
	// Controllers
	
	function ApplicationUIC() {
		var controller = $controller('ApplicationUIC as applicationCtrl', {
			$scope : scope
		});
		return controller;
	};
	
	
	function HelpUIC() {
		var controller = $controller('HelpUIC as helpCtrl', {
			$scope : scope
		});
		return controller;
	};
	
	//Test Data
	
	var restangularizedTestHelp, testHelp = '';
	
	var testUser = {
			"id": "gradhak3",
			"jobRole": "SAD",
			"lastName": "gradhak3",
			"firstName": "  gradhak3",
			"country": "ALL",
			"subCountry": "ALL",
			"originalJobRole": "SAD",
			"countryList": [{
				"code": "USA",
				"description": "USA",
				"codeAndDescription": "USA-USA"
			},
			{
				"code": "AUS",
				"description": "AUS",
				"codeAndDescription": "AUS-AUS"
			},
			{
				"code": "CAN",
				"description": "CAN",
				"codeAndDescription": "CAN-CAN"
			},
			{
				"code": "EMS",
				"description": "EMS",
				"codeAndDescription": "EMS-EMS"
			},
			{
				"code": "MEX",
				"description": "MEX",
				"codeAndDescription": "MEX-MEX"
			},
			{
				"code": "NZL",
				"description": "NZL",
				"codeAndDescription": "NZL-NZL"
			},
			{
				"code": "ALL",
				"description": "ALL",
				"codeAndDescription": "ALL-ALL"
			}],
			"reportType": "RCM"
		};
	
	
	beforeEach(function(){
		module('TfoamsUiApp.Home');
		module('TfoamsUiApp.Services');
		module('TfoamsUiApp');
	
		inject(function($injector) {
	 	   $state = $injector.get('$state');
	 	   $rootScope = $injector.get('$rootScope');
	 	   $controller = $injector.get('$controller');
	 	   $stateParams = $injector.get('$stateParams');
	 	   $q = $injector.get('$q');
	 	   Restangular = $injector.get('Restangular');
	 	   helpUIBF = $injector.get('helpUIBF');
	 	   AuthorizationUIBF = $injector.get('AuthorizationUIBF');
	 	   $httpBackend = $injector.get('$httpBackend');
	 	  $templateCache = $injector.get('$templateCache');
	    });

		scope = $rootScope.$new();
		
		ApplicationUIC();
		scope.applicationCtrl.setCachedUserInfo(testUser);
		
		restangularizedTestHelp = Restangular.restangularizeElement({}, angular.copy(testHelp));
		
		$httpBackend.when('GET', 'application/languages/en_US.json').respond(200);
		
		$templateCache.put('application/login/views/login.html', '');
	});
	
	
	it('should be registered', function(){
    	expect(HelpUIC).toBeDefined();
	});
	
	describe('openPDF()',function(){
		it('should click and load help pdf when file code is GEN, DSP, NEW', function(){
			
			spyOn(helpUIBF, 'getHelp').and.callFake(function(){
				
				return $q.when(restangularizedTestHelp);
				
			});
			
			$stateParams.fileCode = "GEN";
			
			HelpUIC();
			
			scope.helpCtrl.openPDF();
			
			$rootScope.$apply();
			
			expect(scope.helpCtrl.help).toEqual(testHelp);
			expect(helpUIBF.getHelp).toHaveBeenCalled();
		});
		
		it('should not load help pdf when file code is undefined or null',function(){
			
			$stateParams.fileCode = undefined;
			
			HelpUIC();
			
			expect(scope.helpCtrl.help).toBeUndefined();
			
		});
	
	});
	
});