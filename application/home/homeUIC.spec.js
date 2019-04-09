'use strict';
describe('TfoamsUiApp.Home HomeUIC:', function() {
	
	// Dependencies
	var scope, $rootScope, $controller, $window;
	
	// Controllers
	
	function ApplicationUIC() {
		var controller = $controller('ApplicationUIC as applicationCtrl', {
			$scope : scope
		});
		return controller;
	}
	
	function HomeUIC() {
		var controller = $controller('HomeUIC as homePageCtrl', {
			$scope : scope
		});
		
		return controller;
	}
	

	//Test Data
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
		module('TfoamsUiApp');

	
		inject(function($injector) {
	 	   $rootScope = $injector.get('$rootScope');
	 	   $controller = $injector.get('$controller');
		   $window = $injector.get('$window');
	    });
		
	
		scope = $rootScope.$new();
		
		
		ApplicationUIC();
		scope.applicationCtrl.setCachedUserInfo(testUser);
	});
	
	afterEach(function(){
		
		$window.sessionStorage.removeItem('user');
		
	});
	
	it('should be registered', function(){
    	expect(HomeUIC).toBeDefined();
	});
	
	
	describe('chooseRole()',function(){
		
		it('Shoude change the role RAD when sucessful form submission and role region not equal to ALL',function(){
			
			
			scope.homePage = {};
    		scope.homePage.$valid = true;
    		
    		HomeUIC();
    		
    		scope.homePageCtrl.selectedRoleRegion='USA';
    		
   		
    		scope.homePageCtrl.chooseRole();
    		
    		expect(scope.applicationCtrl.userInformation.jobRole).toEqual('NAD');
    		expect(scope.homePageCtrl.selectedRoleRegion).toEqual('USA');
			
		});
		
		it('Shoude change the role SAD when sucessful form submission and role region equal to ALL',function(){
			
			
			scope.homePage = {};
    		scope.homePage.$valid = true;
    		
    		HomeUIC();
    		
    		scope.homePageCtrl.selectedRoleRegion='ALL';
    		
    		scope.homePageCtrl.chooseRole();
    		
    		expect(scope.applicationCtrl.userInformation.jobRole).toEqual('SAD');
  		});

		
		it('Shoude do nothing when unsucessful form submission',function(){
			
		
			scope.homePage = {};
    		scope.homePage.$valid = false;
    		
    		HomeUIC();
    		
    		scope.homePageCtrl.chooseRole();
    		
    		expect(scope.applicationCtrl.userInformation.jobRole).toEqual('SAD');
    		expect(scope.homePageCtrl.selectedRoleRegion).toEqual('ALL');
 		});
		
		
	});
	
});

