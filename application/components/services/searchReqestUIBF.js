'use strict';

angular.module('TfoamsUiApp.Services').
	service('searchReqestUIBF', ['$q', 'Restangular','AlertMessagingService','$timeout',function($q, Restangular, AlertMessagingService,$timeout){

          this.searchReqestEndpoint = Restangular.all('SearchRFA');
           
          
			this.getRequestType = function (param) {
				return this.searchReqestEndpoint.post({userCountry: param.userCountry,category: param.category}).then(function(response){
					response = response.plain();
					return response;
				}, function(err) {
					return $q.reject(err);
				});
			};
          
			this.getSearchReqest = function (param) {
			return this.searchReqestEndpoint.post({userCountry: param.userCountry,category: param.category,rfasearchCriteria: param.rfasearchCriteria,requestType:param.requestType, status: param.status}).then(function(response){
				response = response.plain();
			
					AlertMessagingService.addMessage('Matching records found', 'success', true);
	                $timeout(function(){
				    	  AlertMessagingService.removeMessages();
				      }, 5000);
		
				return response;
			}, function(err) {
				AlertMessagingService.addMessage('No matching records found', 'danger', true);
                $timeout(function(){
			    	  AlertMessagingService.removeMessages();
			      }, 5000);
				return $q.reject(err);
			});
		};
		
	}]);
