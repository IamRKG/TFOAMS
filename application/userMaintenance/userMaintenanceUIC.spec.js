'use strict';

describe('TfoamsUiApp.Home UserMaintenanceUIC:', function() {

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
        "AUS": [{code: "code1", description: "description1", codeAndDescription: "codeAndDescription1"}],
        "CAN": [{code: "code2", description: "description2", codeAndDescription: "codeAndDescription2"}]
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
			//UserMaintenanceUIBF = $injector.get('UserMaintenanceUIBF');
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

            expect(scope.userMaintenanceCtrl.userMaintenance).toEqual(testUserMaintenanceDetails);
        });

		describe('loadCountry(): ', function() {


			it('should load and set default country when role option is RAD',function(){
                scope.userMaintenanceCtrl.selectedRole = 'NAD';
                console.log(scope.userMaintenanceCtrl.selectedTerritory);
				scope.userMaintenanceCtrl.loadCountry();
                $rootScope.apply();
				expect(scope.userMaintenanceCtrl.selectedRole).toEqual('NAD');
				expect(scope.userMaintenanceCtrl.selectedCountry).toEqual('USA');
                expect(scope.userMaintenanceCtrl.selectedTerritory).toEqual('IND-TEST');
			});

            it('should load and set default country when role option is SAD',function(){
                scope.userMaintenanceCtrl.selectedRole = 'SAD';
                console.log(scope.userMaintenanceCtrl.selectedRole);
                scope.userMaintenanceCtrl.loadCountry();
                expect(scope.userMaintenanceCtrl.selectedRole).toEqual('SAD');
                expect(scope.userMaintenanceCtrl.selectedCountry).toEqual('ALL');
                expect(scope.userMaintenanceCtrl.selectedTerritory).toEqual([ 'codeAndDescription1', 'codeAndDescription2']);
            });

		});
		
		describe('loadTerritory(): ', function() {
			 
			it('should populate territory data in the controller when job role is SAD',function(){
                scope.userMaintenanceCtrl.selectedRole = 'NAD';
                scope.userMaintenanceCtrl.selectedCountry = 'USA';
                scope.userMaintenanceCtrl.loadTerritory();
				expect(scope.userMaintenanceCtrl.selectedTerritory).toEqual('IND-TEST');
				
			});
		});

        describe('loadTerritoryRegion(): ', function() {
            beforeEach(function(){
                ApplicationUIC();
                UserMaintenanceUIC();
                scope.userMaintenanceCtrl.user.jobRole = 'NAD';
            });
            it('should populate territory data in the controller when job role is NAD',function(){
                console.log(scope.userMaintenanceCtrl.user.jobRole);
                scope.userMaintenanceCtrl.selectedRole = 'GUR';
                scope.userMaintenanceCtrl.loadTerritoryRegion();
                console.log(scope.userMaintenanceCtrl.selectedTerritory);
                expect(scope.userMaintenanceCtrl.selectedTerritory).toEqual([]);

            });
        });

        describe('searchUser(): ', function() {
            it('should populate all data in the form field when users search against cdsid',function(){
                spyOn(UserMaintenanceUIBF, 'setInputUserParams');
                UserMaintenanceUIBF.setInputUserParams('GO', 'karulmo1', 'ALL', 'SAD', 'SAD', 'MVIKAS1');
                var actualInputResponse = {
                    selectedCountry: "ALL",
                    selectedRegion: [],
                    selectedRole: "SAD",
                    selectedTerritory: ["AT1", "AT2", "AT3", "AT4", "CAN", "C2"],
                    userCdsId: "MVIKAS1"
                };
                scope.userMaintenanceCtrl.searchUser('go');
                expect(scope.userMaintenanceCtrl.UserMaintenanceUIBF.setInputUserParams).toHaveBeenCalledWith('GO', 'karulmo1', 'ALL', 'SAD', 'SAD', 'MVIKAS1');
                expect(scope.userMaintenanceCtrl.inputUserDetails).toEqual(actualInputResponse);
                expect(scope.userMaintenanceCtrl.selectedRole).toEqual(actualInputResponse.userCdsId);

            });
        });

        describe('loadTerritoryRegion(): ', function() {
            beforeEach(function(){
                scope.userMaintenanceCtrl.user.jobRole = 'NAD';
            });
            xit('should populate territory data in the controller when job role is NAD',function(){
                scope.userMaintenanceCtrl.user.jobRole = 'NAD';
                console.log(scope.userMaintenanceCtrl.user.jobRole);
                scope.userMaintenanceCtrl.selectedRole = 'GUR';
                scope.userMaintenanceCtrl.loadTerritoryRegion();
                console.log(scope.userMaintenanceCtrl.selectedTerritory);
                expect(scope.userMaintenanceCtrl.selectedTerritory).toEqual([]);

            });
        });

        describe('chooseAction(): ', function() {
            it('should validate CDSID and perform save',function(){
                scope.userMaintenanceCtrl.validateCSDID();
                scope.userMaintenanceCtrl.selectedAction = 'CN';
                scope.userMaintenanceCtrl.saveUser();
                expect(scope.userMaintenanceCtrl.selectedAction).toEqual('CN');
            });
        });

        describe('saveUser(): ', function() {
            it('should save the user details into Database ',function(){
                scope.userMaintenanceCtrl.selectedAction = 'CN';
                scope.userMaintenanceCtrl.saveUser();
                expect(UserMaintenanceUIBF.userMaintenance.userAction).toEqual('CN');
            });
        });

        describe('validateCSDID(): ', function() {
            it('should validate the cdsid ',function(){
                scope.userMaintenanceCtrl.isFormSubmitted = true;
                scope.userMaintenanceCtrl.validateCSDID();
                expect($scope.userMaintenance.$valid).toEqual(true);
            });
        });



    });
	
});
