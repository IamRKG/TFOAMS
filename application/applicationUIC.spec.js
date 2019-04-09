'use strict';

describe('TfoamsUiApp Module:', function(){
	
	// Dependencies
	var scope, $controller, $rootScope, $window;
	
	// Controllers

	function ApplicationUIC() {
		var controller = $controller('ApplicationUIC as applicationCtrl', {
			$scope : scope
		});
		return controller;
	};
	
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
		module('TfoamsUiApp');

		inject(function($injector) {
		 	   $controller = $injector.get('$controller');
		 	   $rootScope = $injector.get('$rootScope');
			   $window = $injector.get('$window');
		});
		
		
		scope = $rootScope.$new();
		
		ApplicationUIC();
		scope.applicationCtrl.setCachedUserInfo(testUser);
	});
		
		it('should be registered', function(){
			expect(ApplicationUIC).toBeDefined();
		});
		
	
	
		describe('setUserRoleCountry()',function(){
			
			it('Shoude pass user role and country',function(){
	
				var role  = 'NAD';
				var country = 'USA';
				
				scope.applicationCtrl.setUserRoleCountry(role,country);
				
				expect(scope.applicationCtrl.userInformation.country).toEqual(country);
				expect(scope.applicationCtrl.userInformation.jobRole).toEqual(role);
			});
			
		});
		
		describe('setCachedUserInfo()',function(){
			
			it('Shoude set user information',function(){
				
				scope.applicationCtrl.setCachedUserInfo(testUser);
				
				expect(scope.applicationCtrl.userInformation.country).toEqual(testUser.country);
				expect(angular.fromJson($window.sessionStorage.user).id).toEqual(testUser.id);
				
			});
			
			it('Shoude create new property for role and country ',function(){

				scope.applicationCtrl.setCachedUserInfo(testUser);
				
				expect(scope.applicationCtrl.userInformation.countryList[6].roleAndCountry).toEqual('SAD - ALL');
				expect(scope.applicationCtrl.userInformation.countryList[0].roleAndCountry).toEqual('RAD - USA');
			});
		
			
		});
		
		
			

});
