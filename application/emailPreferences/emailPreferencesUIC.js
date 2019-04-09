'use strict';
angular.module('TfoamsUiApp.Home')
.controller('EmailPreferencesUIC',['$scope','$state','emailPreferences','EmailPreferencesUIBF','EmailPreferences','AlertMessagingService',function($scope,$state, emailPreferences,EmailPreferencesUIBF, EmailPreferences,AlertMessagingService){
	
		this.emailPreferences = new EmailPreferences(emailPreferences);
		
		//set up the controller to take advantage of the messaging service.
		AlertMessagingService.setup($scope, this);
		
		this.close = function(){
			AlertMessagingService.removeMessages();
		};
		
		this.saveDetails = function(){
			var user = $scope.applicationCtrl.userInformation;
			var param = {loginUserCdsId:user.id, loginUserCountry:user.country, loginUserRole:user.jobRole};
			this.emailPreferences.addUserInformation(param);
			EmailPreferencesUIBF.setEmailPreferences(this.emailPreferences);
	   };
	
}]);
