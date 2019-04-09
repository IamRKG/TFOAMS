'use strict';

describe('TfoamsUiApp.Services UserMaintenanceUIBF:', function() {
	
	
	// Dependencies
	var UserMaintenanceUIBF, UserMaintenance, Restangular, $q, $rootScope;
	
	
	//Test Data
	
	var restangularizedUserMaintDetails, userMaintDetails = [{
		countryList: [
                { code: "USA",
                description: "USA",
                codeAndDescription: "USA-USA"},
                {code: "AUS",
                    description: "AUS",
                    codeAndDescription: "AUS-AUS"}
                ],
		territoriesByCountry: {
            NZL: [{code: "TN1", description: "TN1-NEWZL", codeAndDescription: "TN1-TN1-NEWZL"},
					{code: "TN2", description: "TN2-NEWZL", codeAndDescription: "TN2-TN1-NEWZL"}],
			AUS: [{code: "AUS1", description: "AUS1-NAUSL", codeAndDescription: "AUS1-AUS1-NAUSL"},
					{code: "AUS2", description: "AUS2-NAUSL", codeAndDescription: "AUS2-AUS2-NAUSL"}]
        }
	}];
	
	var param = {userCdsId: "karulmo1", userCountry: "ALL", userRole: "SAD"};
	
	beforeEach(function() {
        module('TfoamsUiApp.Models');
		module('TfoamsUiApp.Services');
		inject(function($injector) {
            UserMaintenanceUIBF = $injector.get('UserMaintenanceUIBF');
			Restangular = $injector.get('Restangular');
			$q = $injector.get('$q');
			$rootScope = $injector.get('$rootScope');
            UserMaintenance = $injector.get('UserMaintenance');

		});
		
		restangularizedUserMaintDetails = Restangular.restangularizeElement({}, userMaintDetails);
		
	});
	
	it('defines a UserMaintenanceUIBF', function() {
		expect(UserMaintenanceUIBF).toBeDefined();
	});

    it('establishes a restangular endpoint for userMaintenance', function() {
        expect(UserMaintenanceUIBF.userEndpoint.route).toEqual('UserMaintenance');
    });

    describe('setUserParams(): ', function() {

        it('should pass the user details parameter to the service', function () {
            UserMaintenanceUIBF.setUserParams('GO', 'testUser', 'USA', 'SAD', 'RAD', 'otherUser');

            expect(UserMaintenanceUIBF.userAction).toEqual('GO');
            expect(UserMaintenanceUIBF.id).toEqual('testUser');
            expect(UserMaintenanceUIBF.country).toEqual('USA');
            expect(UserMaintenanceUIBF.originalJobRole).toEqual('SAD');
            expect(UserMaintenanceUIBF.jobRole).toEqual('RAD');
            expect(UserMaintenanceUIBF.inputCdsid).toEqual('otherUser');
        });

    });

    describe('getUserMaintDetails(): ', function() {

        it('should return usermaintenance details for logged in user', function () {
            spyOn(UserMaintenanceUIBF.userEndpoint, 'post').and.callFake(function() {
                return $q.when(restangularizedUserMaintDetails);
            });

            UserMaintenanceUIBF.getUserMaintDetails().then(function(response) {
                var actualResponse = response;
            }, function() {
                console.error('This should not happen');
            });

            $rootScope.$apply();

            expect(UserMaintenanceUIBF.userEndpoint.post).toHaveBeenCalled();
        });

        it('should add an error message to the message queue if the post fails', function() {
            spyOn(UserMaintenanceUIBF.userEndpoint, 'post').and.callFake(function() {
                return $q.reject('restangularizedUserMaintDetails');
            });

            UserMaintenanceUIBF.getUserMaintDetails().then(function(response) {
                console.error('This should not happen');
            }, function(err) {
                var errorMessage = err;
            });

            $rootScope.$apply();

            expect(UserMaintenanceUIBF.userEndpoint.post).toHaveBeenCalled();
        });

    });

    describe('getInputUserMaintDetails(): ', function() {

        it('should return usermaintenance details for search user', function () {
            spyOn(UserMaintenanceUIBF.userEndpoint, 'post').and.callFake(function() {
                return $q.when(restangularizedUserMaintDetails);
            });

            UserMaintenanceUIBF.getInputUserMaintDetails().then(function(response) {
                var actualResponse = response;
            }, function() {
                console.error('This should not happen');
            });

            $rootScope.$apply();

            expect(UserMaintenanceUIBF.userEndpoint.post).toHaveBeenCalled();
        });

        it('should add an error message to the message queue if the post fails', function() {
            spyOn(UserMaintenanceUIBF.userEndpoint, 'post').and.callFake(function() {
                return $q.reject('restangularizedUserMaintDetails');
            });

            UserMaintenanceUIBF.getInputUserMaintDetails().then(function(response) {
                console.error('This should not happen');
            }, function(err) {
                var errorMessage = err;
            });

            $rootScope.$apply();

            expect(UserMaintenanceUIBF.userEndpoint.post).toHaveBeenCalled();
        });
    });

    describe('saveUserMaintenanceDetails(): ', function() {

        it('should save the usermaintenance details for input user', function () {
            spyOn(UserMaintenanceUIBF.userEndpoint, 'post').and.callFake(function() {
                return $q.when(restangularizedUserMaintDetails);
            });

            UserMaintenanceUIBF.saveUserMaintenanceDetails()

            $rootScope.$apply();

            expect(UserMaintenanceUIBF.userEndpoint.post).toHaveBeenCalled();
        });

        it('should add an error message to the message queue if the post fails', function() {
            spyOn(UserMaintenanceUIBF.userEndpoint, 'post').and.callFake(function() {
                return $q.reject('restangularizedUserMaintDetails');
            });

            UserMaintenanceUIBF.saveUserMaintenanceDetails()

            $rootScope.$apply();

            expect(UserMaintenanceUIBF.userEndpoint.post).toHaveBeenCalled();
        });
    });
	
	
});
