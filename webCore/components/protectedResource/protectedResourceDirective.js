angular.module('WebCore.Components')
	.directive('protectedResource', function() {
		return {
			restrict: 'A',
			require: ['protectedResource', '?^datatable'],
			controller: ['AuthorizationUIS', '$element', '$attrs',
				function(AuthorizationUIS, $element, $attrs) {
					this.checkAuthorization = function() {
						var criteria = null;
						var policies = $attrs.protectedResource;

						if (policies) {

							// check to see if we have an authorization criteria in-line
							if (policies.indexOf('|') > -1) {
								// extract "any" or "all"
								criteria = policies.slice(policies.indexOf('|') + 1, policies.length).toString().trim();
							}

							// if we have a criteria, clean up string so we can easily extract policies
							if (criteria) {
								policies = policies.slice(0, policies.indexOf('|'));
							}

							// support multiple policies
							policies = policies.split(',');

							// remove whitespace
							for (var i = 0; i < policies.length; i++) {
								policies[i] = policies[i].trim();
							}

						} else {
							policies = [];
						}

						var isAuth = AuthorizationUIS.isAuthorized(policies, criteria);

						isAuth.then(function(authorized) {
							if (authorized === false) {
								$element.remove();
							}
						});
					};
				}
			],
			compile: function() {
				return {
					post: function() {
						var controllers = arguments[3];
						var protectedResourceCtrl = controllers[0];
						var datatableCtrl = controllers[1];
						if (datatableCtrl) {
							datatableCtrl.checkAuthorization = protectedResourceCtrl.checkAuthorization();
						}
						protectedResourceCtrl.checkAuthorization();
					}

				};
			}
		};
	});