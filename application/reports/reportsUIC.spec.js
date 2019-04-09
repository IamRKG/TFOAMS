'use strict';

describe('TfoamsUiApp.home ReportsUIC:', function() {
	
	// Dependencies
	var scope, $rootScope, $controller, $stateParams, $q, $httpBackend, $modal, $templateCache;
	var reportsUIBF, Restangular;
	
	// Controllers
	
	function ApplicationUIC() {
		var controller = $controller('ApplicationUIC as applicationCtrl', {
			$scope : scope
		});
		return controller;
	};
	
	function ReportsUIC(reports) {
		var controller = $controller('ReportsUIC as reportsCtrl', {
			$scope : scope,
			reports: reports
		});
		return controller;
	};
	
	//Test Data
	var reportsList = [{ id:0, reportType: 'RAM',  name: "My Assigned Requests"}, { id:1, reportType: 'RCM', name: "Assigned Requests that I Created" },{ id:2, reportType: 'ORZ', name: "Open Requests for My Team's Region" }];
	
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
	 	   $stateParams = $injector.get('$stateParams');
	 	   $q = $injector.get('$q');
	 	   $httpBackend = $injector.get('$httpBackend');
	 	   $modal = $injector.get('$modal');
	 	   $templateCache = $injector.get('$templateCache');
	 	   Restangular = $injector.get('Restangular');
	 	   reportsUIBF = $injector.get('reportsUIBF');
	    });
		
	
		scope = $rootScope.$new();
		
		ApplicationUIC();
		scope.applicationCtrl.setCachedUserInfo(testUser);
		
		restangularizedTestReport = Restangular.restangularizeElement({}, testReport);
		
		 $httpBackend.when('GET', 'application/languages/en_US.json').respond(200);
		
		$templateCache.put('application/login/views/login.html', '');
		
	});
	
	it('should be registered', function(){
    	expect(ReportsUIC).toBeDefined();
	});
	
	it('should load report data when report type is RAM, RCM, ORZ',function(){
		
		spyOn(reportsUIBF, 'getReports').and.callFake(function() {
			return $q.when(restangularizedTestReport);
		});
	
		//ApplicationUIC();
		
		$stateParams.reportType = "RAM";
		
		ReportsUIC(testReport);
		
		$rootScope.$apply();
		
		expect(scope.reportsCtrl.reports).toEqual(restangularizedTestReport);

		
	});
	
	it('should not load report data when report type is undefined or null',function(){
		
		$stateParams.reportType = undefined;
		
		ReportsUIC();
		
		expect(scope.reportsCtrl.reports).toBeUndefined();
		
	});
	
	
});