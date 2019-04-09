'use strict';

angular.module('TfoamsUiApp.Services').
	service('UnAuthUIBF', ['$q', 'Restangular',function($q, Restangular){

		this.country = 'USA';
        
        this.countriesEndPoint = Restangular.all('Countries/D');

        this.getCountryList = function() {
    		return this.countriesEndPoint.customGET().then(angular.bind(this, function(response) {
    			response = response.plain();
     			return response;
    		}), function(err) {
    			return $q.reject(err);
    		});
    	};



		this.getFcsdRegions = function() {
			this.fcsdRegionEndPoint = Restangular.all('Regions/'+this.country);
			return this.fcsdRegionEndPoint.customGET().then(angular.bind(this, function(response) {
				response = response.plain();
				return response;
			}), function(err) {
				return $q.reject(err);
			});
		};

		this.sendEmailEndPoint = Restangular.all('SendEmail');
		this.sendEmail = function(params) {
			return this.sendEmailEndPoint.post(params).then(angular.bind(this, function(response) {
				return response;
			}), function(err) {
				return $q.reject(err);
			});
		};
    	
    	
	}]);
