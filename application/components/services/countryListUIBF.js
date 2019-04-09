'use strict';

angular.module('TfoamsUiApp.Services').
	service('countryListUIBF', ['$q', 'Restangular',function($q, Restangular){
        
        this.userInformationEndpoint = Restangular.one('Countries/ALL');

        this.getCountryList = function() {
    		return this.userInformationEndpoint.get().then(angular.bind(this, function(response) {
    			response = response.plain();
     			return response;
    		}), function(err) {
    			return $q.reject(err);
    		});
    	};
    	
    	
	}]);
