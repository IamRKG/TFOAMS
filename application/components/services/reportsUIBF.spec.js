'use strict';

describe('TfoamsUiApp.Services reportsUIBF:', function() {
	
	
	// Dependencies
	var Restangular, $q, $rootScope;
	var reportsUIBF;
	
	//Test Data
	
	var restangularizedTestReport, testReport = [{
		"trackingNumber": "200066097",
		"dealerName": "Jensen Ford",
		"vehicle": "2010 Fusion",
		"requestType": "Customer Handling (non-repair), Document in CuDL",
		"pacode": "11820",
		"gcqisNumber": "11820",
		"status": "Assigned",
		"assignee": "bjenkins12",
		"fscComments": "This customer repair is very complex and will take weeks to fix."
	}];
	
	var param = {reportType: "RAM", cdsId: "gradhak3", userCountry: "ALL", userRole: "NAD"};
	
	beforeEach(function() {
		module('TfoamsUiApp.Services');
		
		inject(function($injector) {
			Restangular = $injector.get('Restangular');
			$q = $injector.get('$q');
			$rootScope = $injector.get('$rootScope');
			reportsUIBF = $injector.get('reportsUIBF');

		});
		
		restangularizedTestReport = Restangular.restangularizeElement({}, testReport);
		
	});
	
	it('defines a reportsUIBF', function() {
		expect(reportsUIBF).toBeDefined();
	});
	
	describe('getReports()',function(){
	it('should load data from server',function(){
		spyOn(reportsUIBF.reportsEndpoint, 'post').and.callFake(function() {
			return $q.when(restangularizedTestReport);
		});
		
		var actualResponse;
		reportsUIBF.getReports(param).then(angular.bind(this, function(response) {
			console.log('response', response);
			actualResponse = response;
	        }));
		
		$rootScope.$apply();
		
		expect(actualResponse).toEqual(restangularizedTestReport);
		
	});
	
	
	it('should show error when data not load from server',function(){
		
		spyOn(reportsUIBF.reportsEndpoint, 'post').and.callFake(function() {
			return $q.reject('500 server faild');
		});
		
		var actualResponse;
		reportsUIBF.getReports(param).then(function(response) {
			console.error('This should not happen', response);
	        },function(error) {
	        	actualResponse = error;
			});
		
		$rootScope.$apply();
		
		expect(actualResponse).toEqual('500 server faild');
		
	});
	
	});
	
	
	
});
