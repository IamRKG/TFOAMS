angular.module('WebCore.Components')
	.directive('offlineIndicator', function() {
		return {
			restrict: 'A',

			template: '<div id="offline-indicator" class="container-fluid" ng-switch on="checking">' +
			'<alert type="warning"><span class="glyphicon glyphicon-warning-sign" ng-switch-when="false"></span><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate" ng-switch-when="true"></span>' +
			'<span>{{\'offlineIndicator.offlineMessage\'|translate}} ' +
			'<a href ng-click="checkNetworkState()">{{\'offlineIndicator.retryConnection\'|translate}}</a></span></alert></div>',
			replace: true,
			controller: ['$scope', '$window', 'NetworkDataStateUIS', '$timeout', '$translate', '$translatePartialLoader', function($scope, $window, NetworkDataStateUIS, $timeout, $translate, $translatePartialLoader) {

				$translatePartialLoader.addPart('WC-offlineIndicator');
				$translate.refresh();

				// Ensure directive is hidden initially
				$('#offline-indicator').hide();

				$scope.checking = false;

				this.showOfflineIndicator = function() {
					$('#offline-indicator').show();
					var alertBox = $('#offline-indicator .alert');
					alertBox.addClass('pulse');
					$timeout(function(){
						alertBox.removeClass('pulse');
					},2000);
					$window.scrollTo(0,1);
				};

				this.hideOfflineIndicator = function() {
					$('#offline-indicator').hide();
				};

				this.checkNetworkState = function() {
					$scope.checking = true;
					NetworkDataStateUIS.getNetworkState().then(function(){
						$scope.checking = false;
					});
				};

				$scope.$on('ShowOfflineIndicator', angular.bind(this, function() {
					this.showOfflineIndicator();
				}));

				$scope.$on('HideOfflineIndicator', angular.bind(this, function() {
					this.hideOfflineIndicator();
				}));


				return $scope.offlineIndicator = this;
			}],
			link: function(scope, elem, attr, ctrl) {
				scope.checkNetworkState = ctrl.checkNetworkState;
			}
		};
	});
