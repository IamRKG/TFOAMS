'use strict';

angular.module('TfoamsUiApp.Services').
	service('userUIBF', ['$q', 'Restangular','UserUIRM', '$state', function($q, Restangular,UserUIRM, $state){
        
        this.userInformationEndpoint = Restangular.one('Users');

        var pendingRequest = false;
        var savedPromise;

        this.getUserInformation = function() {
        	
        	if (pendingRequest){
        		
        		return savedPromise;
        		
        	}else{
        		
        		pendingRequest = true;
        		var cachedUserInfo = UserUIRM.getCachedUserInfo();
            	
            	if(cachedUserInfo){
            		pendingRequest = false;
            		return $q.when(cachedUserInfo);
            		
            	}else{

            		savedPromise =  this.userInformationEndpoint.get().then(function(response) {
            			response = response.plain();
						if(response.id=='') {
							$state.go("unAuth");
						}
            			pendingRequest = false;
             			return response;
             			
            		}, function(err) {
            			pendingRequest = false;
            			return $q.reject(err);
            		});
            		return savedPromise;
        		
            	}
        	
        		
        	}
        };   	
    		
  }]);
