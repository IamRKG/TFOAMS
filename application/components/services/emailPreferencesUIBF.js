'use strict';

angular.module('TfoamsUiApp.Services').
	service('EmailPreferencesUIBF',['$q', 'Restangular','EmailPreferences','AlertMessagingService','$timeout',function($q, Restangular, EmailPreferences,AlertMessagingService,$timeout){
		
		this.emailPreferencesEndpoint = Restangular.all('EmailPref');

		this.getEmailPreferences = function (param) {
			return this.emailPreferencesEndpoint.post({loginUserCdsId: param.loginUserCdsId,loginUserCountry: param.loginUserCountry,loginUserRole: param.loginUserRole}).then(function(response){
				response = response.plain();
				return response;
			}, function(err) {
				return $q.reject(err);
			});
		};
		
		this.setEmailPreferences = function (emailPreferences) {
			return this.emailPreferencesEndpoint.doPUT(emailPreferences).then(function(response){
				response = response.plain();
				AlertMessagingService.addMessage(response.errorMsg, 'success', true);
				/*TODO:Add alert focus when ng-click*/
				 //$('#header').focus();
			      $timeout(function(){
			    	  AlertMessagingService.removeMessages();
			      }, 5000);
				return response;
			},function(failure) {
            	//AlertMessagingService.addMessage(failure.responseMsg, 'danger', true);
            	return $q.reject(failure);
            });
			
		};
		
	}]);