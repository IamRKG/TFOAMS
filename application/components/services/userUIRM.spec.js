'use strict';

describe('TfoamsUiApp.Services UserUIRM:', function() {
	
	// Dependencies
	var $rootScope, $window;
	var UserUIRM;
	
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
		module('TfoamsUiApp.Services');

		inject(function($injector) {
		 	   $rootScope = $injector.get('$rootScope');
			   $window = $injector.get('$window');
			   UserUIRM = $injector.get('UserUIRM');
		});
		
		UserUIRM.setCachedUserInfo(testUser);
	});
	
	it('defines a UserUIRM', function(){
		expect(UserUIRM).toBeDefined();
	});
	
	
	describe('setCachedUserInfo()',function(){
		
		it('Shoude set user information',function(){
			
			UserUIRM.setCachedUserInfo(testUser);
			
			expect(UserUIRM.userInformation.country).toEqual(testUser.country);
			expect(angular.fromJson($window.sessionStorage.user).id).toEqual(testUser.id);
			
		});
		
		it('Shoude create new property for role and country ',function(){

			UserUIRM.setCachedUserInfo(testUser);
			
			expect(UserUIRM.userInformation.countryList[6].roleAndCountry).toEqual('SAD - ALL');
			expect(UserUIRM.userInformation.countryList[0].roleAndCountry).toEqual('RAD - USA');
		});
		
	});
	
	describe('setUserRoleCountry()',function(){
		
		it('Shoude pass user role and country',function(){

			var role  = 'NAD';
			var country = 'USA';
			
			UserUIRM.setUserRoleCountry(role,country);
			
			expect(UserUIRM.userInformation.country).toEqual(country);
			expect(UserUIRM.userInformation.jobRole).toEqual(role);
		});
		
	});
	
	
});