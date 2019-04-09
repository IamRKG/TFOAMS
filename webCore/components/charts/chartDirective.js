'use strict';

angular.module('WebCore.Components')
	.directive('chart', function() {
		return {
			restrict: 'E',
			scope: {
				data: '&data',
				format: '@format',
				events: '&events',
				draw: '&draw',
				options: '&options',
				responsiveOptions: '&responsiveOptions'
			},
			controller: [ '$scope', '$window', '$timeout',
				function($scope, $window, $timeout) {

					if(!$window.Chartist) {
						throw('Missing required dependency - Chartist.js');
					}

					this.data = $scope.data();
					this.format = $scope.format;
					this.events = $scope.events() || [];
					this.options = $scope.options() || null;
					this.responsiveOptions = $scope.responsiveOptions() || null;

					this.bindEvents = function(chart) {
						this.events.forEach(function(curVal) {
							var eventHandler = function() {
								curVal.handler();
								$timeout(function(){$scope.$apply();});
							};
							chart.bind(curVal.name, eventHandler);
						});
					};

					this.render = function($element) {
						return Chartist[this.format]($element, this.data, this.options, this.responsiveOptions);
					};
				}
			],
			link: function($scope, $element, $attrs, ctrl) {

				// Create Chart
				var element = $element[0];
				var chart = ctrl.render(element);
				ctrl.bindEvents($element);

				// Add Draw Event Separately
				var drawFunc = $scope.draw();
				if (drawFunc) {
					chart.on('draw',drawFunc);
				}

				// Watch for Changes to Data Set
				$scope.$watch(
					function(){
						return $scope.data();
					},
					function(newData, oldData){
						if(newData !== oldData) {
							chart.update();
						}
				}, true);
			}
		};
	});