angular.module('WebCore.Components')
	.directive('formSubmit', function() {
		return {
			restrict: 'A',
			required: '^ngController',
			controller: ['$state', function($state) {
				this.$state = $state;
			}],
			link: function(scope, elem, attr, ctrl) {

				elem.on('click', function() {

					var elemCtrl = elem.controller();
					var formName = elem[0].form.name;
					var formCtrl = scope.$parent[formName];

					// enable display of validation errors
					elemCtrl.isFormSubmitted = true;

					// if form is valid, navigate to requested state and call the given function
					if(formCtrl.$valid) {
						var params = attr.formSubmit.split(',');
						var requestedState = params[0];
						var callback = params[1];

						if(callback) {
							elemCtrl[callback]();
						}
						ctrl.$state.go(requestedState);
					}

					scope.$apply();
				});

			}
		};
	});
