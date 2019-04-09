'use strict';

angular.module('TfoamsUiApp.Models')
	.factory('UserMaintenance', function(){
		
		function UserMaintenance(userMaintenanceObject) {
            this.loginUserCdsId = '';
            this.loginUserCountry = '';
           // this.userCountry = '';
            this.loginUserRole = '';
            this.inputCdsid = '';
            this.inputRole = '';
            this.inputCountry = '';
            this.selectedTerritory = [];
            this.inputRegion =[];
            

            if(userMaintenanceObject) {
                angular.extend(this, userMaintenanceObject);
            }
			

		};
		
		UserMaintenance.prototype = {
			createFrom: function(userMaintenanceObject) {
				if(userMaintenanceObject) {
					angular.extend(this, userMaintenanceObject);				
				}			
			}
		};
		
		return UserMaintenance;
	});
