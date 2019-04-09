angular.module('WebCore.Components')
	.directive('alertConsole', function() {
		return {
			restrict: 'A',
			template: '<div id="alert-console"><div class="alert alert-dismissable" ng-swipe-right="closeAlert(alert.uniqueishID)" role="alert" ng-repeat="alert in visibleMessages" type="{{alert.type}}" ng-class="{\'zoom-out-animate\': alert.fadeOut, \'fade-out\': alert.fadeOut, \'alert-success\' : alert.type == \'success\', \'alert-danger\' : alert.type == \'danger\', \'alert-warning\' : alert.type == \'warning\'}">' +
			'<span class="glyphicon" ng-class="{\'glyphicon-ok\': alert.type == \'success\', \'glyphicon-warning-sign\': alert.type == \'warning\', \'glyphicon-remove-circle\': alert.type == \'danger\'}"></span>' +
			'<button class="close" ng-click="closeAlert(alert.uniqueishID)"><span aria-hidden="true">&#120;</span><span class="sr-only">Close</span></button>' +
			'<div><span>{{alert.message}}</span><progressbar ng-if="!alert.persist" class="progress-striped active" value="100 - alert.timeout*10" type="{{alert.type}}"></progressbar></div></div></div>',
			replace: false,
			controller: ['$scope', 'AlertMessagingUIS', '$timeout', function($scope, AlertMessagingUIS, $timeout) {

				$scope.visibleMessages = [];

				$scope.closeAlert = function(uniqueishID) {
					// manually trigger fade out
					AlertMessagingUIS.removeMessage(uniqueishID, true);
				};

				if(AlertMessagingUIS.getSettings().removeErrorOnStateChange) {
					$scope.$on('$stateChangeStart', function() {
						AlertMessagingUIS.removeErrorMessages();
					});
				}

				// watch on alert messages
				$scope.$watch(function() {
					var messages = AlertMessagingUIS.getMessages(true);
					return messages;
				}, function(newMsgs, oldMsgs) {
					$scope.visibleMessages = newMsgs;

					// move user to focus on alert if new message is added
					$timeout(function() {
						if(newMsgs.length > oldMsgs.length) {
							var userYpos = $(document).scrollTop();
							var msgYpos = $('div.alert').last().offset();
							msgYpos = msgYpos.top - 15;

							if(msgYpos < userYpos) {
								$('html, body').animate({ scrollTop: msgYpos},100);
							}
						}
					}, 0);

				}, true);


			}]
		};
	});