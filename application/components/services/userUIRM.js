'use strict';

angular.module('TfoamsUiApp.Services').
	service('UserUIRM',['$window','$q',function($window, $q){
		
		this.userInformation={};
        this.trackingNumber ='';
		
		this.userInfo = function(){
			
			return $q.when(this.userInformation);
			
		};
		
	    this.setCachedUserInfo = function(user) {
	    	$window.sessionStorage.user = angular.toJson(user);
			this.userInformation=user;
		};

		this.getCachedUserInfo = function() {
			return angular.fromJson($window.sessionStorage.user);
		};
		this.userInformation = this.getCachedUserInfo();
	}]);