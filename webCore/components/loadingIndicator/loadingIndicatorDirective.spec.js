'use strict';

describe('WebCore.Components LoadingIndicatorDirective:', function() {

	//Dependencies
	var $compile, $rootScope, Restangular, $httpBackend;

	//variable to hold the compiled element
	var compiledElem;

	//variable to hold the mock restangular endpoint
	var mockRestangularEndpoint;

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
		});

		mockRestangularEndpoint = $httpBackend.whenGET('/test');

		//we need a function to compile a sample of our directive, to test its behaviors
		//for the passed in sample code, this function will compile the chunk against the rootScope
		compileDirective = function(sampleTag) {
			compiledElem = $compile(sampleTag)($rootScope);
			//digest after compiling to ensure changes make their way back to angular
			$rootScope.$digest();
		};
	});

	describe('Loading Indicator Directive:', function() {
		it('should successfully compile a sample directive tag, including a loading-cover div and a loading-indicator div', function() {
			compileDirective('<div loading-indicator></div>');
			var divLoadingIndicator = angular.element(compiledElem).find('#loading-indicator')[0];
			var divLoadingCover = angular.element(compiledElem).find('#loading-cover')[0];

			expect(compiledElem).toBeDefined();
			expect(divLoadingCover).toBeDefined();
			expect(divLoadingIndicator).toBeDefined();
		});

		it('should attach interceptors to Restangular request, response and error handlers', function() {
			spyOn(Restangular, 'addRequestInterceptor').and.callThrough();
			spyOn(Restangular, 'addResponseInterceptor').and.callThrough();
			spyOn(Restangular, 'addErrorInterceptor').and.callThrough();

			compileDirective('<div loading-indicator></div>');

			expect(Restangular.addRequestInterceptor).toHaveBeenCalled();
			expect(Restangular.addResponseInterceptor).toHaveBeenCalled();
			expect(Restangular.addErrorInterceptor).toHaveBeenCalled();
		});

		it('should call the incrementPendingCounterAndShow and decrementPendingCounterAndHide functions once for each request', function() {
			compileDirective('<div loading-indicator></div>');

			spyOn($rootScope.loadingIndicator, 'incrementPendingCounterAndShow').and.callThrough();
			spyOn($rootScope.loadingIndicator, 'decrementPendingCounterAndHide').and.callThrough();

			mockRestangularEndpoint.respond(200, 'success');
			$httpBackend.expectGET('/test');

			Restangular.one('test').get();
			Restangular.one('test').get();
			$httpBackend.flush();

			expect($rootScope.loadingIndicator.incrementPendingCounterAndShow.calls.count()).toEqual(2);
			expect($rootScope.loadingIndicator.decrementPendingCounterAndHide.calls.count()).toEqual(2);
		});

		it('should still call the decrementPendingCounterAndHide function when an error response is returned', function() {
			compileDirective('<div loading-indicator></div>');

			spyOn($rootScope.loadingIndicator, 'decrementPendingCounterAndHide').and.callThrough();

			mockRestangularEndpoint.respond(404, 'fail');
			$httpBackend.expectGET('/test');

			Restangular.one('test').get();
			$httpBackend.flush();

			expect($rootScope.loadingIndicator.decrementPendingCounterAndHide).toHaveBeenCalled();
		});

		it('should call the show function when a request is made', function() {
			compileDirective('<div loading-indicator></div>');

			spyOn($rootScope.loadingIndicator, 'showLoadingIndicator').and.callThrough();

			mockRestangularEndpoint.respond(200, 'success');
			$httpBackend.expectGET('/test');

			Restangular.one('test').get();
			$httpBackend.flush();

			expect($rootScope.loadingIndicator.showLoadingIndicator).toHaveBeenCalled();
		});

		it('should call the show function only once when multiple requests are in flight', function() {
			compileDirective('<div loading-indicator></div>');

			spyOn($rootScope.loadingIndicator, 'showLoadingIndicator').and.callThrough();

			mockRestangularEndpoint.respond(200, 'success');
			$httpBackend.expectGET('/test');

			Restangular.one('test').get();
			Restangular.one('test').get();
			$httpBackend.flush();

			expect($rootScope.loadingIndicator.showLoadingIndicator.calls.count()).toEqual(1);
		});

		it('should call the hide function when a request finishes', function() {
			compileDirective('<div loading-indicator></div>');

			spyOn($rootScope.loadingIndicator, 'hideLoadingIndicator').and.callThrough();

			mockRestangularEndpoint.respond(200, 'success');
			$httpBackend.expectGET('/test');

			Restangular.one('test').get();
			$httpBackend.flush();

			expect($rootScope.loadingIndicator.hideLoadingIndicator).toHaveBeenCalled();
		});

		it('should call the hide function when a $viewContentLoaded event fires', function() {
			compileDirective('<div loading-indicator></div>');

			spyOn($rootScope.loadingIndicator, 'hideLoadingIndicator').and.callThrough();

			mockRestangularEndpoint.respond(404, 'failure');
			$httpBackend.expectGET('/test');
			$rootScope.$broadcast('$viewContentLoaded');
			Restangular.one('test').get();
			$httpBackend.flush();

			expect($rootScope.loadingIndicator.hideLoadingIndicator).toHaveBeenCalled();
		});

		it('should call the hide function when a HideLoadingIndicator event fires', function() {
			compileDirective('<div loading-indicator></div>');

			spyOn($rootScope.loadingIndicator, 'hideLoadingIndicator').and.callThrough();

			mockRestangularEndpoint.respond(404, 'failure');
			$httpBackend.expectGET('/test');
			$rootScope.$broadcast('HideLoadingIndicator');
			Restangular.one('test').get();
			$httpBackend.flush();

			expect($rootScope.loadingIndicator.hideLoadingIndicator).toHaveBeenCalled();
		});

		it('should not call the hide function when a request finishes during a state transition', function() {
			compileDirective('<div loading-indicator></div>');

			spyOn($rootScope.loadingIndicator, 'hideLoadingIndicator').and.callThrough();

			mockRestangularEndpoint.respond(200, 'success');
			$httpBackend.expectGET('/test');
			Restangular.one('test').get();
			$rootScope.$broadcast('$stateChangeStart');
			$httpBackend.flush();

			expect($rootScope.loadingIndicator.hideLoadingIndicator).not.toHaveBeenCalled();
		});

		it('should call the hide only once when multiple requests finish', function() {
			compileDirective('<div loading-indicator></div>');

			spyOn($rootScope.loadingIndicator, 'hideLoadingIndicator').and.callThrough();

			mockRestangularEndpoint.respond(200, 'success');
			$httpBackend.expectGET('/test');

			Restangular.one('test').get();
			Restangular.one('test').get();
			$httpBackend.flush();

			expect($rootScope.loadingIndicator.hideLoadingIndicator.calls.count()).toEqual(1);
		});

		it('should always call the show function before the hide function', function() {
			compileDirective('<div loading-indicator></div>');

			spyOn($rootScope.loadingIndicator, 'showLoadingIndicator').and.callThrough();
			spyOn($rootScope.loadingIndicator, 'hideLoadingIndicator').and.callThrough();

			mockRestangularEndpoint.respond(200, 'success');
			$httpBackend.expectGET('/test');

			Restangular.one('test').get();

			expect($rootScope.loadingIndicator.showLoadingIndicator).toHaveBeenCalled();
			expect($rootScope.loadingIndicator.hideLoadingIndicator).not.toHaveBeenCalled();

			//reset spy objects to clear out the call counts
			$rootScope.loadingIndicator.showLoadingIndicator.calls.reset();
			$rootScope.loadingIndicator.hideLoadingIndicator.calls.reset();
			//make the mock backend finish the request
			$httpBackend.flush();

			expect($rootScope.loadingIndicator.hideLoadingIndicator).toHaveBeenCalled();
			expect($rootScope.loadingIndicator.showLoadingIndicator).not.toHaveBeenCalled();
		});
	});
});