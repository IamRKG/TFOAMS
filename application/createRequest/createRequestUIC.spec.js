'use strict';

describe('TfoamsUiApp.home UserMaintenanceUIC:', function() {

	// Dependencies
	var scope, $rootScope, $state, $controller, $q, $httpBackend, $templateCache, Restangular, UserMaintenanceUIC;
	var UserMaintenance, UserMaintenanceUIBF, TfoamsUiAppConstants, userMaintenanceDetails ;

	// Controllers
	var controllerFactory;
	
	function ApplicationUIC() {
		var controller = $controller('ApplicationUIC as applicationCtrl', {
			$scope : scope
		});
		return controller;
	};
	
	function UserMaintenanceUIC(){
		var controller = controllerFactory('UserMaintenanceUIC as userMaintenanceCtrl', {
				$scope : scope,
            userMaintenanceDetails : testUserMaintenanceDetails
		});
		
		return controller;
	}
	

	
	// Test data
	var restangularizedTestUserMaintenance, testUserMaintenanceDetails = {
			"id": "karulmo1",
			"jobRole": "SAD",
			"lastName": "arul",
			"firstName": "  arul",
			"country": "ALL",
			"subCountry": "ALL",
			"originalJobRole": "SAD",
			
        "countryList": [{code: "USA", description: "USA", codeAndDescription: "USA-USA"},
                        {code: "AUS", description: "AUS", codeAndDescription: "AUS-AUS"}],
   "territoriesByCountry": {
        "AUS": [{code: "AT1", description: "AT1-AUS Territory C", codeAndDescription: "AT1-AT1-AUS Territory C"}],
        "CAN": [{code: "CAN", description: "CAN-CANADAREG", codeAndDescription: "CAN-CAN-CANADAREG"}]
   }
    };

	beforeEach(function(){
		module('TfoamsUiApp.Home');
		module('TfoamsUiApp.Services');
		module('TfoamsUiApp');
		
		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$controller = $injector.get('$controller');
			$q = $injector.get('$q');
			$httpBackend = $q = $injector.get('$httpBackend');
			$templateCache = $injector.get('$templateCache');
            UserMaintenance = $injector.get('UserMaintenance');
			Restangular = $injector.get('Restangular');
			UserMaintenanceUIBF = $injector.get('UserMaintenanceUIBF');
			TfoamsUiAppConstants = $injector.get('TfoamsUiAppConstants');
		});



		controllerFactory = $controller;
		
		scope = $rootScope.$new();
		ApplicationUIC();
		scope.applicationCtrl = {};
		scope.applicationCtrl.userInformation = {};
				
		restangularizedTestUserMaintenance = Restangular.restangularizeElement({}, angular.copy(testUserMaintenanceDetails));
		
		 $httpBackend.when('GET', 'application/languages/en_US.json').respond(200);
		 
		 $httpBackend.when('POST', 'http://localhost:11000/TFOAMS_MobileWeb/TFOAMS/REST/userMaintenance').respond(200);
		
		$templateCache.put('application/home/views/home.html', '');
		$templateCache.put('application/login/views/login.html', '');
	});

	it('should be registered', function() {
		expect(UserMaintenanceUIC).toBeDefined();
	});


	describe('when job role is SAD:', function() {
	
		beforeEach(function(){
			ApplicationUIC();
            UserMaintenanceUIC();
			scope.userMaintenanceCtrl.user.jobRole = 'SAD';

		});

		it('should have resolved userMaintenance data', function() {
		
            expect(scope.userMaintenanceCtrl.userMaintenanceDetails).toEqual(testUserMaintenanceDetails);
        });

		describe('loadCountry(): ', function() {
			
			beforeEach(function(){			
					scope.userMaintenanceCtrl.selectedRole = 'NAD';
			});
		
			xit('should load and set default country when role option is RAD',function(){
				scope.userMaintenanceCtrl.selectedRole = 'NAD';
				scope.userMaintenanceCtrl.loadCountry();
				expect(scope.userMaintenanceCtrl.selectedRole).toEqual('NAD');
				expect(scope.userMaintenanceCtrl.selectedCountry).toEqual('USA');
			});

            xit('should set default country when role option is SAD',function(){
                scope.userMaintenanceCtrl.selectedRole = 'SAD';
                scope.userMaintenanceCtrl.loadCountry();
                expect(scope.userMaintenanceCtrl.selectedCountry).toEqual('ALL');
            });

		});
		
		/*describe('loadTerritorySAD(): ', function() {
			 
			it('should populate territory data in the controller when job role is SAD',function(){
				scope.userMaintenanceCtrl.selectedCountrySAD = {};
				scope.userMaintenanceCtrl.selectedCountrySAD.territory = userMaintenanceOptions[0].roleOptions[0].country[0].territory;
				
				scope.userMaintenanceCtrl.loadTerritorySAD();
							
				expect(scope.userMaintenanceCtrl.selectedTerritorySAD).toEqual(userMaintenanceOptions[0].roleOptions[0].country[0].territory);
				
			});
		});*/
	});
	
});
