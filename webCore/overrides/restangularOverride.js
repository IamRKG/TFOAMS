'use strict';

angular.module('WebCore.Services')
	.config(['$provide', function($provide) {

		$provide.decorator('Restangular', function($delegate) {

			/**
			 * setErrorInterceptor Override
			 *
			 * Enable support for multiple error interceptors.
			 */
			var addErrorInterceptor = function(interceptor) {
				$delegate.errorInterceptors.push(interceptor);
				return this;
			};

			// create errorInterceptors Array
			$delegate.errorInterceptors = [];

			//change error interceptor function to call each item in the error interceptors array with the params
			$delegate.configuration.errorInterceptor = function(response, deferred) {

				// ensure that when response error occurs we trigger calls to all the error interceptors
				$delegate.errorInterceptors.forEach(function(element) {
					element(response, deferred);
				});

			};

			// add new method (to enable seamless transition once new version of restangular is implemented)
			$delegate.addErrorInterceptor = addErrorInterceptor;

			// point old method to new one
			$delegate.setErrorInterceptor = $delegate.addErrorInterceptor;

			return $delegate;
		});

	}]);