'use strict';

describe('TfoamsUiApp Module:', function(){
	//Module
	var TfoamsUiAppModule;
	
	//Dependencies
	var $translate, $httpBackend, RestangularProvider;
	
	beforeEach(function(){
		module('TfoamsUiApp');
		
		inject(function ($injector) {
			$translate = $injector.get('$translate');
			$httpBackend = $injector.get('$httpBackend');
		});
		
		TfoamsUiAppModule = angular.module('TfoamsUiApp');
		
		$httpBackend.when('GET', 'application/languages/en_US.json').respond({HEADER: 'Application.js Test'});
	});
	
	it('should ensure TfoamsUiApp module was registered', function(){
		expect(TfoamsUiAppModule).toBeDefined();
	});
	
	describe('Configuration:', function() {
	
		
		xit('should have the proper Restangular baseUrl set', inject(function(Restangular){
			expect(Restangular.configuration.baseUrl).toContain('/TFOAMS_MobileWeb/TFOAMS/REST');
		}));
		
		it('should route to / on an unknown path', inject(function($rootScope, $location, $urlRouter){
			var scope = $rootScope.$new();

			$location.path("/unknownpath");
			scope.$emit("$locationChangeSuccess");
			expect($location.path()).toEqual("/");
		}));

		it('should have a default translation language of en_US', function () {
			expect($translate.preferredLanguage()).toEqual('en_US');
		});

		it('should have a translation language file prefix and suffix set', function () {
			$httpBackend.expectGET('application/languages/en_US.json');
			$translate.use('en_US');
			$httpBackend.flush();
		});	
	});	
});


