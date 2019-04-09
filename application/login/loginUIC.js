'use strict';

angular.module('TfoamsUiApp.Home')
	.controller('LoginUIC', ['$scope', '$state', 'AuthorizationUIBF', '$cookieStore',  
										function($scope, $state, AuthorizationUIBF, $cookieStore) {
		
		$scope.applicationCtrl.userInformation = {};
											
		this.toHomePage = function(){
			
			return AuthorizationUIBF.configureEndPoint(this.cdsid).then(angular.bind(this, function(response){
				console.log(response);
					$scope.applicationCtrl.setCachedUserInfo(response);
					$state.go('home');
					return response;
							
			})); 
			
		};
		

	}]);
