'use strict';

angular.module('TfoamsUiApp.Services').
	service('AuthorizationUIBF', ['$q', 'Restangular', '_', function($q, Restangular, _){
		
		/*TODO:
		 * 1. Change this file/services name like userUIBF and check other file name.
		 * 2. spliting the home moudle. Example request module*/
		
       
        this.id = ''; /*Removed for WSL purpose*/
        this.userEndpoint = Restangular.one('Home');
		            
        this.setCDSID = function(CDSID) { 
            this.id = CDSID; 
		 }; 
		 
		 /* Removed for WSL purpose */
        
 		
		this.getUserInfo = function () {
			return this.userEndpoint.get().then(function(response){
				response = response.plain();			
				return response;
			}, function(err) {
				return $q.reject(err);
			});
		};
           
		
        this.configureEndPoint = function(CDSID){
            this.setCDSID(CDSID); 
            
            return this.getUserInfo().then(angular.bind(this, function(response){
                
            return _.findWhere(response, {id: this.id});	
                
                
			}));
        };/* Removed for WSL purpose */
        
       			

		
	}]);