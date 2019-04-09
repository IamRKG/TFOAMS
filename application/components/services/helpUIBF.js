'use strict';

angular.module('TfoamsUiApp.Services').
	service('helpUIBF', ['$q', 'Restangular','$window','_',function($q, Restangular, $window, _){
	
   
	       this.helpEndpoint = Restangular.withConfig(function(RestangularConfigurer) {
	    	    RestangularConfigurer.setDefaultHttpFields({responseType:'arraybuffer'});
	    	  }).all('Help/details');
       
	       this.openPDFFile = function(response){
	    	   var file = new Blob([response], {type: 'application/pdf'});
	    	   var url =  ($window.URL) ? $window.URL.createObjectURL(file) : $window.webkitURL.createObjectURL(file);
		       var openWindow =  $window.open(url,'Popup Window','width=320,height=568,resizable,scrollbars=yes');
	       };
	       
           
			this.getHelp = function (param) {
				return this.helpEndpoint.post({fileCode:param.fileCode, userCountry:param.userCountry}).then(angular.bind(this, function(response){
					this.openPDFFile(response);
				}), function(err) {
					return $q.reject(err);
				});
			};
		
		
		
	}]);
	 
     