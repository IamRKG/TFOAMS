'use strict';

angular.module('TfoamsUiApp.Services').
	service('modalService', ['$q','$modal','reportsUIBF', function ($q,$modal,reportsUIBF) {

		var modalDefaults = {
	            backdrop: true,
	            keyboard: true,
	            modalFade: true,
	            templateUrl: 'application/reports/views/reportsMasterDetailsModal.html'
	            
	        };

	        var modalOptions = {
	        	trackingNumber : 'Tracking',
	        	dealerNumber : 'Dealer',
	        	vehicle : 'Vehicle',
	        	paCode : 'P&A Code',
	        	requestType:'Request Type',
	        	gcqisNumber:'GCQIS Report',
	        	primaryContact:'Primary Contact',
	        	phone:'Phone #',
	        	status:'Status',
	        	fscComments:'FSE Comments',
	            actionButtonText:'Close Window',
	            data:''
	        };

	        this.showModal = function (customModalDefaults, customModalOptions) {
	            if (!customModalDefaults) customModalDefaults = {};
	            customModalDefaults.backdrop = 'static';
	            return this.show(customModalDefaults, customModalOptions);
	        };
		
	        this.show = function (customModalDefaults, customModalOptions) {
	            var tempModalDefaults = {};
	            var tempModalOptions = {};

	            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

	            angular.extend(tempModalOptions, modalOptions, customModalOptions);
	            
            
	            if (!tempModalDefaults.controller) {
	            
	                tempModalDefaults.controller = function ($scope, $modalInstance) {
	                    $scope.modalOptions = tempModalOptions;
	                     
                        $scope.modalOptions.close = function (result) {
	                        $modalInstance.close(result);
	                    };
	                    
	                };
	            }

	            return $modal.open(tempModalDefaults).result;
	        };
		

	}]);