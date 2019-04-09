'use strict';

describe('TfoamsUiApp.Services AuthorizationUIBF:', function() {

	var AuthorizationUIBF = null, Restangular, $q, $rootScope, $httpBackend;

	var restangularizedTestUsers, testUsers = [ {
		cdsid : 'testUser',
		role : 'SAD'
	} ];

	beforeEach(function() {

		// Module & Providers
		module('TfoamsUiApp.Services');
		inject(function($injector) {
			AuthorizationUIBF = $injector.get('AuthorizationUIBF');
			Restangular = $injector.get('Restangular');
			$q = $injector.get('$q');
			$rootScope = $injector.get('$rootScope');
			$httpBackend = $injector.get('$httpBackend');
		});

		restangularizedTestUsers = Restangular.restangularizeElement({},
				testUsers);
	});

	it('defines a AuthorizationUIBF', function() {
		expect(AuthorizationUIBF).toBeDefined();
	});

	describe('setCDSID():', function() {
		it('should  call  setCDSID and configure endpoint with dynamic id',
				function() {
					var id = 'test', endPoint = 'userDetails';
					AuthorizationUIBF.setCDSID();
					expect(id).toEqual('test');
					expect(endPoint).toEqual('userDetails');

				});

	});

	describe('getUserInfo():', function() {
		it('should fire restangular call and return an array of user details',
				function() {
					spyOn(AuthorizationUIBF.userEndpoint, 'customGET').and
							.callFake(function() {
								return $q.when(restangularizedTestUsers);
							});

					var actualResponse;
					AuthorizationUIBF.setCDSID('testUser1');
					AuthorizationUIBF.getUserInfo().then(function(response) {
						console.log('response', response);
						actualResponse = response;
					}, function(error) {
						console.error('This should not happen', error);
					});

					$rootScope.$apply();

					expect(AuthorizationUIBF.userEndpoint.customGET).toHaveBeenCalledWith('testUser1');
					expect(actualResponse).toEqual(testUsers);			

				});
				
		it('should fire a restangular call and return an error message when the request fails', function() {
			spyOn(AuthorizationUIBF.userEndpoint, 'customGET').and.callFake(function() {
				return $q.reject('Error message');
			});

			var errorMessage;
			AuthorizationUIBF.getUserInfo().then(function() {
				console.error('This should not happen');
			}, function(err) {
				errorMessage = err;
			});

			$rootScope.$apply();

			expect(AuthorizationUIBF.userEndpoint.customGET).toHaveBeenCalledWith('');
			expect(errorMessage).toEqual('Error message');
		});

	});
	
	describe('configureEndPoint():', function() {
		it('should  call  setCDSID and configure endpoint with dynamic id and return an array of userDetails',
				function() {
				spyOn(AuthorizationUIBF, 'setCDSID');
				spyOn(AuthorizationUIBF, 'getUserInfo');
					var actualResponse;
					var cdsid = 'testUser';
					AuthorizationUIBF.configureEndPoint(cdsid);
					AuthorizationUIBF.setCDSID(cdsid);
					AuthorizationUIBF.getUserInfo().then(function(response){
						actualResponse = response;
					});					

					expect(AuthorizationUIBF.setCDSID).toHaveBeenCalledWith('testUser1');
					expect(actualResponse).toEqual(testUsers);		
					

				});

	});

});
