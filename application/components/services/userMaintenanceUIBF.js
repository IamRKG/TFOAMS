'use strict';

angular.module('TfoamsUiApp.Services').
	service('UserMaintenanceUIBF', ['$q', 'Restangular', 'UserMaintenance','AlertMessagingService','$timeout',function($q, Restangular, UserMaintenance,AlertMessagingService,$timeout){
		
		this.userAction = '';
        this.id = '';
        this.country = '';
        //this.userCountry = '';
        this.originalJobRole = '';
        this.jobRole = '';
        this.inputCdsid = '';
        this.inputRole = '';
        this.inputCountry = '';
        this.inputTerritory = [];
        this.inputRegion = [];
        this.loginUserCdsId= "";
        this.loginUserCountry= "";
        this.loginUserRole= "";
        this.loginUserOrgRole = "";

 
        this.userMaintenance = new UserMaintenance();
        

	    this.userEndpoint = Restangular.all('UserMaintenance');
	    
	    /*RAD END POINT*/
	    this.radUserRoleEndpoint = Restangular.all('Roles');
	    this.radTerritoryEndpoint = Restangular.all('Territory');
	    this.radRegionsEndpoint = Restangular.all('Regions');
	    
	    /*SAD END POINT*/
	    this.sadUserTerritoryEndpoint = Restangular.one('Territory');

		this.setUserParams = function(userAction, id, country, originalJobRole, jobRole, inputCdsid) {
        	this.userAction = userAction;
            this.id = id;
            this.country = country;
            this.originalJobRole = originalJobRole;
            this.jobRole = jobRole;
			this.inputCdsid = inputCdsid;
        };

        
        this.getRADUserRole = function(param){
        	
        	return this.radUserRoleEndpoint.customGET(param).then( function(response) {
                response = response.plain();
                return response;
            }, function(failure) {
                return $q.reject(failure);
            });
        };
        
        this.getRADTerritory = function(param){
        	return this.radTerritoryEndpoint.customGET(param).then( function(response) {
                response = response.plain();
                return response;
            }, function(failure) {
                return $q.reject(failure);
            });
        };
        
        this.getRADRegion = function(param){
        	return this.radRegionsEndpoint.customGET(param).then( function(response) {
                response = response.plain();
                return response;
            }, function(failure) {
                return $q.reject(failure);
            });
        };

        this.getSADUserTerritory = function(param){
        	return this.sadUserTerritoryEndpoint.get().then( function(response) {
                response = response.plain();
                return response;
            }, function(failure) {
                return $q.reject(failure);
            });
        };
        
  
        
        
        this.getUserMaintDetails = function() {
            var params = {
           		//'userAction' : this.userAction,
                'loginUserCdsId': this.id,
                'loginUserCountry': this.country,
                'loginUserOrgRole' : this.originalJobRole,
                'loginUserRole': this.jobRole
            };
            console.log(params);
            return this.userEndpoint.post(params).then( function(response) {
                response = response.plain();
                console.log(response);
                return response;
            }, function(failure) {
                return $q.reject(failure);
            });
	    };
		
		 this.getInputUserMaintDetails = function() {
               	
            var params = {
           		'userAction' : this.userAction,
                'loginUserCdsId': this.id,
                'loginUserCountry': this.country,
                'loginUserOrgRole' : this.originalJobRole,
                'loginUserRole': this.jobRole,
				'inputCdsid': this.inputCdsid
            };
            return this.userEndpoint.post(params).then( function(response) {
                response = response.plain();
                return response;               
            }, function(failure) {
            	 AlertMessagingService.addMessage('User does not exists', 'danger', true);
                 $timeout(function(){
 			    	  AlertMessagingService.removeMessages();
 			      }, 5000);
                return $q.reject(failure);
            });
	    };
	    
	    this.getDeleteInputUserMaintDetails = function(params) {
	    	
	    	var params = params;
            
	    	
	    	return this.userEndpoint.post(params).then(angular.bind(this, function(response) {
	    		response = response.plain();
	    		AlertMessagingService.addMessage('User successfully deleted', 'success', true);
	    		$timeout(function(){
			    	  AlertMessagingService.removeMessages();
			      }, 5000);
                  return response;
            }), function(failure) {
	    		AlertMessagingService.addMessage('User does not deleted successfully', 'danger', true);
	    		$timeout(function(){
			    	  AlertMessagingService.removeMessages();
			      }, 5000);
            	return $q.reject(failure);
            });
	      };
	    


        this.saveUserMaintenanceDetails = angular.bind(this, function() {
            var params = {
               // 'userAction' : this.userAction,
                'inputCdsid': this.inputCdsid,
                'inputRole': this.inputRole,
                'inputCountry' : this.inputCountry,
                'selectedTerritory': this.inputTerritory,
                'inputRegion': this.inputRegion,
                'loginUserCdsId': this.loginUserCdsId,
                'loginUserCountry': this.loginUserCountry,
                'loginUserRole': this.loginUserRole,
                'loginUserOrgRole': this.loginUserOrgRole
            };
            return this.userEndpoint.doPUT(this.userMaintenance).then(angular.bind(this, function(successMsg) {
            	AlertMessagingService.addMessage('User Saved Successfully', 'success', true);
                $timeout(function(){
			    	  AlertMessagingService.removeMessages();
			      }, 5000);
            }), function(errorMsg) {
            	AlertMessagingService.addMessage('User Not Saved Successfully', 'danger', true);
                $timeout(function(){
			    	  AlertMessagingService.removeMessages();
			      }, 5000);
            });
        });
        
        this.updateUserMaintenanceDetails = angular.bind(this, function() {
            var params = {
               // 'userAction' : this.userAction,
                'inputCdsid': this.inputCdsid,
                'inputRole': this.inputRole,
                'inputCountry' : this.inputCountry,
                'selectedTerritory': this.inputTerritory,
                'inputRegion': this.inputRegion,
                'loginUserCdsId': this.loginUserCdsId,
                'loginUserCountry': this.loginUserCountry,
                'loginUserRole': this.loginUserRole,
                'loginUserOrgRole': this.loginUserOrgRole
            };
            return this.userEndpoint.doPUT(this.userMaintenance).then(angular.bind(this, function(successMsg) {
            	AlertMessagingService.addMessage('User has been successfully updated', 'success', true);
                $timeout(function(){
			    	  AlertMessagingService.removeMessages();
			      }, 5000);
            }), function(errorMsg) {
            });
        });

			
	}]);
