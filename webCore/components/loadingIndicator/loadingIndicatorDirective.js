angular.module('WebCore.Components')
	.directive('loadingIndicator', function() {
		return {
			restrict: 'A',
			template: '<div id="loading-cover"></div><div id="loading-indicator"><span>Loading...</span></div>',
			controller: ['$scope', 'Restangular', function($scope, Restangular) {

				var requestCount = 0;
				var pendingStateChange = false;

				this.showLoadingIndicator = function() {
					$('#loading-cover').show();
					$('#loading-indicator').show();
				};

				this.hideLoadingIndicator = function() {
					$('#loading-indicator').hide();
					$('#loading-cover').hide();
				};

				this.incrementPendingCounterAndShow = angular.bind(this, function() {
					//increment the counter
					requestCount++;

					//only call to show the indicator when incrementing from 0 to 1.
					//will not need to do so for subsequent calls, as it will already be shown
					if (requestCount === 1) {
						this.showLoadingIndicator();
					}
				});

				this.decrementPendingCounterAndHide = angular.bind(this, function() {
					//decrement the counter
					requestCount--;

					//only call to hide the indicator when decrementing from 1 to 0.
					if (requestCount === 0) {
						this.hideLoadingIndicator();
					}
				});

				Restangular.addRequestInterceptor(angular.bind(this, function() {
					var element = arguments[0];
					this.incrementPendingCounterAndShow();

					//return the value without doing anything to it
					return element;
				}));

				Restangular.addErrorInterceptor(angular.bind(this, function() {
					if(!pendingStateChange) {
						this.decrementPendingCounterAndHide();
					}

					//we are not handling the error, so return true
					return true;
				}));

				Restangular.addResponseInterceptor(angular.bind(this, function() {
					var data = arguments[0];

					if(!pendingStateChange) {
						this.decrementPendingCounterAndHide();
					}

					return data;
				}));

				$scope.$on('$stateChangeStart', angular.bind(this, function() {
					pendingStateChange = true;
				}));

				$scope.$on('$viewContentLoaded', angular.bind(this, function() {
					requestCount=0;
					pendingStateChange=false;
					this.hideLoadingIndicator();
				}));

				$scope.$on('HideLoadingIndicator', angular.bind(this, function() {
					requestCount=0;
					pendingStateChange=false;
					this.hideLoadingIndicator();
				}));

				return $scope.loadingIndicator = this;
			}]
		};
	});
