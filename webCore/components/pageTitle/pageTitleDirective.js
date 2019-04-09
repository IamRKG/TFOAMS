angular.module('WebCore.Components')
	.directive('pageTitle', function() {
		return {
			restrict: 'A',
			controller: ['$scope', '$state', '$rootElement', function($scope, $state, $rootElement) {

				$scope.pageTitle = '';

				this.cleanUpName = function(name) {

					var cleanName = name;

					cleanName = cleanName.replace(/-/g, ' ');

					cleanName = cleanName.replace(/\b./g, function(m) {
						return m.toUpperCase();
					});

					return cleanName;
				};

				this.updatePageTitle = function() {

					// grab app name
					var appName = $rootElement.attr('ng-app');

					// grab state name
					var stateName = this.cleanUpName($state.$current.name);

					// grab parent state's name (if applicable - e.g. workflows)
					var parentStateName;
					if($state.$current.parent) {
						parentStateName = this.cleanUpName($state.get($state.$current.parent).name);
					}

					var tempPageTitle;

					if(parentStateName) {
						tempPageTitle = parentStateName + ': ' + stateName + ' | ' + appName;
					} else {
						tempPageTitle = stateName + ' | ' + appName;
					}

					$scope.pageTitle = tempPageTitle;

				};

				$scope.$on('$stateChangeSuccess', angular.bind(this, function() {
					this.updatePageTitle();
				}));

			}]

		};
	});