'use strict';
describe('TfoamsUiApp.Services helpUIBF',function(){
	
	// Dependencies
	var Restangular, $q, $rootScope, $window, $httpBackend;
	var helpUIBF;
	
	beforeEach(function() {
		
		module('TfoamsUiApp.Services');
		
		inject(function($injector) {
			Restangular = $injector.get('Restangular');
			$q = $injector.get('$q');
			$rootScope = $injector.get('$rootScope');
			$window = $injector.get('$window');
			helpUIBF = $injector.get('helpUIBF');
			$httpBackend = $injector.get('$httpBackend');


		});
		
		$httpBackend.when('POST', '/Help/details').respond(200);
	
	});
	
	
	it('defines a helpUIBF', function() {
		expect(helpUIBF).toBeDefined();
	});
	
	describe('helpUIBF()',function(){
		
		it('should load PDF file from server',function(){
			
			spyOn(helpUIBF.helpEndpoint, 'post').and.callFake(function(){
				
				return $q.when('url');
				
			});
			
			spyOn(helpUIBF, 'openPDFFile').and.callThrough();
			
			var param = {fileCode: "GEN", userCountry: "ALL"};
			
			helpUIBF.getHelp(param);
			
			$rootScope.$apply();
			
			expect(helpUIBF.helpEndpoint.post).toHaveBeenCalled();
			expect(helpUIBF.openPDFFile).toHaveBeenCalled();
			
		});	
		
		
	it('should show error when PDF file not load from server',function(){
			
			spyOn(helpUIBF.helpEndpoint, 'post').and.callFake(function() {
				return $q.reject('500 server faild');
			});
			
			var param = {fileCode: "GEN", userCountry: "ALL"};
			
			var actualResponse;
			
			helpUIBF.getHelp(param).then(function(response) {
			console.error('This should not happen', response);
	        },function(error) {
	        	actualResponse = error;
			});;
			
			$rootScope.$apply();
			
			expect(actualResponse).toEqual('500 server faild');
			
		});	
		
	});
	
	
});