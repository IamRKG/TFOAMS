/*'use strict';

angular.module('TfoamsUiApp.Services').
	service('UserCountryListUIRM',['$window', function($window){

		this.setUserCountryList = function(user) {
	    	angular.forEach(user.countryList, function(country, index){
				if(country.code == 'ALL') { 
					country.roleAndCountry = 'SAD - ' + country.code;
				} else {
					country.roleAndCountry = 'RAD - ' + country.code;
				}
			});
		};
	}]);*/