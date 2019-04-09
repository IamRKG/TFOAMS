'use strict';

describe('TfoamsUiApp.Home LoginUIC:', function(){
	
	
	// Dependencies
	var scope, $state, $rootScope, $q, $controller, $httpBackend, $templateCache;
	var AuthorizationUIBF;
	
	// Controllers
	
	function ApplicationUIC() {
		var controller = $controller('ApplicationUIC as applicationCtrl', {
			$scope : scope
		});
		return controller;
	}
	
	function LoginUIC() {
		var controller = $controller('LoginUIC as loginCtrl', {
			$scope : scope
		});
		return controller;
	};
		
		beforeEach(function() {
			module('TfoamsUiApp');
        	module('TfoamsUiApp.Home');
        	module('TfoamsUiApp.Services');
			
		   inject(function($injector) {

				$state = $injector.get('$state');
				$rootScope = $injector.get('$rootScope');
				$controller = $injector.get('$controller');
				$q = $injector.get('$q');
				AuthorizationUIBF = $injector.get('AuthorizationUIBF');
				$httpBackend = $injector.get('$httpBackend');
				$templateCache = $injector.get('$templateCache');
				
			});
		   
		   $httpBackend.when('GET', 'application/languages/en_US.json').respond({HEADER: 'Application.js Test'});
		   $templateCache.put('application/home/views/home.html', '');
		   
		   
		   scope = $rootScope.$new();
		   
		   ApplicationUIC();
		   
		   LoginUIC();
	
		});
	
		it('should be registered', function(){
			expect(LoginUIC).toBeDefined();
		});
		
		describe('toHomePage():', function() {
			
			var testUser = {id:'test', role:'SAD'}, actualResponse;
										
			it('should make the restangular call to configure the endpoint', function() {
			
				spyOn(AuthorizationUIBF, 'configureEndPoint').and.callFake(function() {
					
					return $q.when(testUser);
				});
				
				spyOn(scope.applicationCtrl,'setCachedUserInfo').and.callThrough();
				
				scope.loginCtrl.toHomePage();
						
				scope.$apply();
				
				expect(AuthorizationUIBF.configureEndPoint).toHaveBeenCalled();
				
				expect(scope.applicationCtrl.setCachedUserInfo).toHaveBeenCalled();
				
			});
			
			it('should navigate to Home page for success login', function() {
				spyOn($state, 'go');
				$state.go('home');
				 expect($state.go).toHaveBeenCalledWith('home');
			});
		});
		
		
		

});
