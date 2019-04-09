'use strict';

angular.module('TfoamsUiApp.Models')
	.factory('EmailPreferences',function(){
		
		function EmailPreferences(emailPreferencesObject){
			
			this.emailCreated = null;
			this.emailSaved = null;
			this.emailSubmited = null;
			this.emailAssigned = null;
			this.emailReturned = null;
			this.emailClosed = null;
			this.emailDeleted = null;
			this.emailNoAuto = null;
			
			if (emailPreferencesObject) {
				angular.extend(this, emailPreferencesObject);
			}
		};
		
		EmailPreferences.prototype = {
				createFrom: function(emailPreferencesObject) {
					if (emailPreferencesObject) {
						angular.extend(this, emailPreferencesObject);
					}
				},
				addUserInformation : function(userInformationObject){
					angular.extend(this, userInformationObject);
				}
				
		};
		
		return EmailPreferences;	
	});