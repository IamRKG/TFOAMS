'use strict';

describe('WebCore.Components OfflineIndicatorDirective:', function() {

	//Dependencies
	var $compile, $rootScope, Restangular, $httpBackend, $window, NetworkDataStateUIS, $filter, $q;

	//variable to hold the compiled element
	var compiledElem;

	//variable to hold the compileDirective function
	var compileDirective;

	beforeEach(function() {
		//the loadingIndicatorDirective lives in the components module, so include it first.
		module('WebCore.Components');
		//the supporting services live in the services module, so include it next.
		module('WebCore.Services');

		inject(function($injector) {
			$compile = $injector.get('$compile');
			$rootScope = $injector.get('$rootScope');
			Restangular = $injector.get('Restangular');
			$httpBackend = $injector.get('$httpBackend');
			$window = $injector.get('$window');
			NetworkDataStateUIS = $injector.get('NetworkDataStateUIS');
			$filter = $injector.get('$filter');
			$q = $injector.get('$q');
		});

		//we need a function to compile a sample of our directive, to test its behaviors
		//for the passed in sample code, this function will compile the chunk against the rootScope
		compileDirective = function(sampleTag) {
			compiledElem = $compile(sampleTag)($rootScope);
			//digest after compiling to ensure changes make their way back to angular
			$rootScope.$digest();
		};
	});

	it('should compile the given template and produce a valid element',function(){
		compileDirective('<div offline-indicator></div>');
		var offlineIndicator = angular.element(compiledElem).find('#offline-indicator');

		expect(compiledElem).toBeDefined();
		expect(offlineIndicator).toBeDefined();
	});

	it('should show the offline indicator when the "ShowOfflineIndicator" event is fired',function(){
		compileDirective('<div offline-indicator></div>');
		spyOn($rootScope.offlineIndicator,'showOfflineIndicator');

		$rootScope.$broadcast('ShowOfflineIndicator');

		expect($rootScope.offlineIndicator.showOfflineIndicator).toHaveBeenCalled();
	});

	it('should hide the offline indicator when the "HideOfflineIndicator" event is fired',function(){
		compileDirective('<div offline-indicator></div>');
		spyOn($rootScope.offlineIndicator,'hideOfflineIndicator');

		$rootScope.$broadcast('HideOfflineIndicator');

		expect($rootScope.offlineIndicator.hideOfflineIndicator).toHaveBeenCalled();
	});

	it('should check the network state on demand',function(){
		compileDirective('<div offline-indicator></div>');

		spyOn(NetworkDataStateUIS,'getNetworkState').and.callFake(function(){
			return $q.when('offline');
		});

		$rootScope.offlineIndicator.checkNetworkState();

		expect($rootScope.checking).toBe(true);

		$rootScope.$apply();

		expect($rootScope.checking).toBe(false);

		expect(NetworkDataStateUIS.getNetworkState).toHaveBeenCalled();
	});

	it('should hide the indicator by default',function(){
		spyOn($.fn,'hide');

		compileDirective('<div offline-indicator></div>');

		expect($.fn.hide).toHaveBeenCalled();
	});

	it('should hide the indicator on demand',function(){
		compileDirective('<div offline-indicator></div>');
		spyOn($.fn,'hide');

		$rootScope.offlineIndicator.hideOfflineIndicator();

		expect($.fn.hide).toHaveBeenCalled();
	});


	it('should not create a new timestamp if there is already a timestamp present',function(){
		compileDirective('<div offline-indicator></div>');
		spyOn($rootScope.offlineIndicator,'showOfflineIndicator');

		var dateTime =  new Date();
		$rootScope.timestamp = dateTime;

		$rootScope.$broadcast('ShowOfflineIndicator');
		expect($rootScope.timestamp).toEqual(dateTime);

		expect($rootScope.offlineIndicator.showOfflineIndicator).toHaveBeenCalled();
	});

	it('should show the indicator on demand',function(){
		compileDirective('<div offline-indicator></div>');
		spyOn($.fn,'show');

		$rootScope.offlineIndicator.showOfflineIndicator();

		expect($.fn.show).toHaveBeenCalled();
	});

});