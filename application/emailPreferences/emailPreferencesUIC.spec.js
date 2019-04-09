'use strict';
describe('TfoamsUiApp.Home EmailPreferencesUIC',function(){
	
	// Dependencies
	var scope, $rootScope, $controller, $httpBackend, $templateCache;
	var EmailPreferencesUIBF, Restangular;
	
// Controllers
	
	function ApplicationUIC() {
		var controller = $controller('ApplicationUIC as applicationCtrl', {
			$scope : scope
		});
		return controller;
	};
	
	function EmailPreferencesUIC() {
		var controller = $controller('EmailPreferencesUIC as EmailPreferencesCtrl', {
			$scope : scope,
			emailPreferences: testemailpreferences
			
		});
		return controller;
	};
	
	//Test Data
	var restangularizedTestemailpreferences, testemailpreferences = {
						"emailNoAuto":"Y",
						"emailCreated":"N",
						"emailSaved":"N",
						"emailDeleted":"N",
						"emailSubmited":"N",
						"emailAssigned":"N",
						"emailClosed":"N",
						"emailReturned":"N"
					};
	
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
		 	   $rootScope = $injector.get('$rootScope');
		 	   $controller = $injector.get('$controller');
		 	   $httpBackend = $injector.get('$httpBackend');
		 	   $templateCache = $injector.get('$templateCache');
		 	   Restangular = $injector.get('Restangular');
		 	   EmailPreferencesUIBF = $injector.get('EmailPreferencesUIBF');
		 	   
		});
		
		scope = $rootScope.$new();
		
		ApplicationUIC();
		scope.applicationCtrl.setCachedUserInfo(testUser);
		
		restangularizedTestemailpreferences = Restangular.restangularizeElement({}, angular.copy(testemailpreferences));
		
		 $httpBackend.when('GET', 'application/languages/en_US.json').respond(200);
		 
		 $httpBackend.when('POST', 'http://localhost:11000/TFOAMS_MobileWeb/TFOAMS/REST/EmailPref').respond(200);
		 
		 $httpBackend.when('PUT', 'http://localhost:11000/TFOAMS_MobileWeb/TFOAMS/REST/EmailPref').respond(200);
		 
		 $templateCache.put('application/login/views/login.html', '');
		 
		 $templateCache.put('application/home/views/home.html', '');
	});
	
	it('should be registered', function(){
    	expect(EmailPreferencesUIC).toBeDefined();
	});
	
	it('should load Email Preferences default data',function(){
		
		EmailPreferencesUIC();

		expect(scope.EmailPreferencesCtrl.emailPreferences).toEqual(testemailpreferences);
	});
	
	
	describe('saveDetails()',function(){
		
		it('should load Email Preferences save data',function(){
			
			spyOn(EmailPreferencesUIBF, 'setEmailPreferences').and.callThrough();
			
			EmailPreferencesUIC();
			
			scope.EmailPreferencesCtrl.saveDetails();
			
			$rootScope.$apply();
		
			testemailpreferences.loginUserCdsId = 'gradhak3';			
			testemailpreferences.loginUserCountry  = 'ALL';			
			testemailpreferences.loginUserRole   = 'SAD';
			
			expect(EmailPreferencesUIBF.setEmailPreferences).toHaveBeenCalledWith(testemailpreferences);
		});
	});
	
		
});