'use strict';

angular.module('TfoamsUiApp.Services').
	service('reportsUIBF', ['$q', 'Restangular',function($q, Restangular){
	
	 
       /********************************* Web Services Code************************/
		

          this.reportsEndpoint = Restangular.all('Reports');
          this.reportsPDPEndpoint = Restangular.all('PDPReport');
           
			this.getReports = function (param) {
			return this.reportsEndpoint.post({reportType:param.reportType,cdsId: param.cdsId,userCountry: param.userCountry,userRole: param.userRole}).then(function(response){
				response = response.plain();
				return response;
			}, function(failure) {
				return $q.reject(failure);
			});
		};
		
		this.getReportsPDP = function(param){
			return this.reportsPDPEndpoint.post({reportType:param.reportType,cdsId: param.cdsId,userCountry: param.userCountry,userRole: param.userRole}).then(function(response){
				response = response.plain();
				return response;
			}, function(failure) {
				return $q.reject(failure);
			});
		};
		
		 /********************************* Mocks Data************************/
		
		/* this.reportsEndpoint = Restangular.all('reports');
		 
		 this.getReports = function (param) {
				return this.reportsEndpoint.getList().then(function(response){
					response = response.plain();				
					return response;
				}, function(err) {
					return $q.reject(err);
				});
			};*/
  
	}]);
