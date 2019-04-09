'use strict';
describe('TfoamsUiApp.Services EmailPreferencesUIBF',function(){
	
	// Dependencies
	var Restangular, $q, $rootScope, $httpBackend;
	var EmailPreferencesUIBF;
	
	//Test Data
	var restangularizedTestemailpreferences, testemailpreferences = {
						"emailNoAuto":"N",
						"emailCreated":"Y",
						"emailSaved":"Y",
						"emailDeleted":"Y",
						"emailSubmited":"Y",
						"emailAssigned":"Y",
						"emailClosed":"Y",
						"emailReturned":"Y"
					};
	
	var param = {loginUserCdsId: "gradhak3", loginUserCountry: "ALL", loginUserRole: "NAD"};
	
	beforeEach(function() {
		module('TfoamsUiApp.Models');
		module('TfoamsUiApp.Services');
		
		inject(function($injector) {
			Restangular = $injector.get('Restangular');
			$q = $injector.get('$q');
			$rootScope = $injector.get('$rootScope');
			EmailPreferencesUIBF = $injector.get('EmailPreferencesUIBF');
			$httpBackend = $injector.get('$httpBackend');


		});
		
		 $httpBackend.when('PUT', '/EmailPref').respond(200);
		
		restangularizedTestemailpreferences = Restangular.restangularizeElement({}, angular.copy(testemailpreferences));
		
	});
	
	it('defines a EmailPreferencesUIBF', function() {
		expect(EmailPreferencesUIBF).toBeDefined();
	});
	
	
	describe('getEmailPreferences()',function(){
	it('should load data from server',function(){
		spyOn(EmailPreferencesUIBF.emailPreferencesEndpoint, 'post').and.callFake(function() {
			return $q.when(restangularizedTestemailpreferences);
		});
		
		var actualResponse;
		EmailPreferencesUIBF.getEmailPreferences(param).then(function(response) {
			actualResponse = response;
	        });
		
		$rootScope.$apply();
		
		
		expect(actualResponse).toEqual(testemailpreferences);
		
	});
	
	
	
	it('should show error when data not load from server',function(){
		
		spyOn(EmailPreferencesUIBF.emailPreferencesEndpoint, 'post').and.callFake(function() {
			return $q.reject('500 server faild');
		});
		
		var actualResponse;
		EmailPreferencesUIBF.getEmailPreferences(param).then(function(response) {
			console.error('This should not happen', response);
	        },function(error) {
	        	actualResponse = error;
			});
		
		$rootScope.$apply();
		
		expect(actualResponse).toEqual('500 server faild');
		
	});
	
	});
	
	
	describe('setEmailPreferences()',function(){
		it('should sent data from server',function(){
			spyOn(EmailPreferencesUIBF.emailPreferencesEndpoint, 'doPUT');
			
			testemailpreferences.loginUserCdsId = 'gradhak3';
			testemailpreferences.loginUserCountry = 'ALL';
			testemailpreferences.loginUserRole = 'SAD';
			
			EmailPreferencesUIBF.setEmailPreferences(testemailpreferences);
			
			$rootScope.$apply();
			
			
			expect(EmailPreferencesUIBF.emailPreferencesEndpoint.doPUT).toHaveBeenCalledWith(testemailpreferences);
			
		});
		
		
		
		it('should show error when data not sent from server',function(){
			
			spyOn(EmailPreferencesUIBF.emailPreferencesEndpoint, 'doPUT').and.callFake(function() {
				return $q.reject('500 server faild');
			});
			
			var actualResponse;
			EmailPreferencesUIBF.setEmailPreferences(param).then(function(response) {
				console.error('This should not happen', response);
		        },function(error) {
		        	actualResponse = error;
				});
			
			$rootScope.$apply();
			
			expect(actualResponse).toEqual('500 server faild');
			
		});
		
		});
});