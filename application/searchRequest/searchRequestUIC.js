'use strict';

angular.module('TfoamsUiApp.Home')
	.controller('SearchRequestsUIC',['$scope','searchReqestUIBF','modalService','AuthorizationUIBF','reportsServices','search','UpdateRequestUIBF','AlertMessagingService','UserUIRM',function($scope, searchReqestUIBF, modalService, AuthorizationUIBF, reportsServices, search,UpdateRequestUIBF, AlertMessagingService, UserUIRM){
		
		this.user = UserUIRM.userInformation;
		this.searchRequestType = search;
		
		this.category = [
            {
				'name' : 'Tracking #',
				'value' : 'T'
			}, {
				'name' : 'Current Assignee CDSID',
				'value' : 'A'
			}, {
				'name' : 'GCQIS Report #',
				'value' : 'G'
			}, {
				'name' : 'Dealer Name',
				'value' : 'D'
			}, {

				'name' : 'P&A Code',
				'value' : 'P'
			}, {
				'name' : 'VIN',
				'value' : 'V'
			}, {
				'name' : 'FMC360 Case #',
				'value' : 'C'
			}
		 ];
		
		
		this.status = [
             {
 				'name' : 'Draft',
 				'id' : '1'
 			}, {
 				'name' : 'Submitted/Unassigned',
 				'id' : '2'
 			}, {
 				'name' : 'Assigned',
 				'id' : '3'
 			}, {
 				'name' : 'Closed',
 				'id' : '4'
 			}, {
 				'name' : 'Deleted',
 				'id' : '5'
 			}
	    ];	
		this.UpdateRequestUIBF=UpdateRequestUIBF;
		this.searchTable = reportsServices.reportTable;
		if(this.user.jobRole != 'SAD' && this.user.country == 'USA' || this.user.jobRole != 'SAD' && this.user.country == 'CAN'){
		this.searchTable.columns =  reportsServices.columns = [{
			'mData': 0,
			'aTargets': [0],
			'sWidth' : '25%',
			'sDefaultContent':'',
	        mRender: function() {
	            var report = arguments[2];
	            if(report.errorMsg){
					return report.errorMsg;
				}else{
					return '<a href="javascript:;" ng-click="searchRequestsCtrl.UpdateRequestUIBF.sendTrackingNumber('+report.trackingNumber+')">'+report.trackingNumber+'</a>';
				}
	            
	        }
		}, {
			'mData': 'dealerName',
			'aTargets': [1],
			'sWidth' : '25%',
			'sDefaultContent':''
		},{
			'mData': 'cudlCase',
			'aTargets': [2],
			'sWidth' : '25%',
			'sDefaultContent':'',
			"sClass":"cudlCaseCls"
		}, {
			'mData': 'vehicle',
			'aTargets': [3],
			'sWidth' : '25%',
			'sDefaultContent':''
		}, {
			'mData': 4,
			'aTargets': [4],
			'sWidth' : '25%',
			'sDefaultContent':'',
			mRender: function() {
						var searchReport = arguments[2];
						if(searchReport.errorMsg){
							return '';
						}else{
						return '<a href="javascript:;" ng-click="searchRequestsCtrl.masterDetailsModal(\''+searchReport.trackingNumber+'\')">{{"reports.details" | translate}}</a>';
						}
					}
		}];
		}else{
			
			this.searchTable.columns =  reportsServices.columns = [{
				'mData': 0,
				'aTargets': [0],
				'sWidth' : '25%',
				'sDefaultContent':'',
		        mRender: function() {
		            var report = arguments[2];
		            if(report.errorMsg){
						return report.errorMsg;
					}else{
						return '<a href="javascript:;" ng-click="searchRequestsCtrl.UpdateRequestUIBF.sendTrackingNumber('+report.trackingNumber+')">'+report.trackingNumber+'</a>';
					}
		            
		        }
			}, {
				'mData': 'dealerName',
				'aTargets': [1],
				'sWidth' : '25%',
				'sDefaultContent':''
			},{
				'mData': 'vehicle',
				'aTargets': [2],
				'sWidth' : '25%',
				'sDefaultContent':''
			}, {
				'mData': 3,
				'aTargets': [3],
				'sWidth' : '25%',
				'sDefaultContent':'',
				mRender: function() {
							var searchReport = arguments[2];
							if(searchReport.errorMsg){
								return '';
							}else{
							return '<a href="javascript:;" ng-click="searchRequestsCtrl.masterDetailsModal(\''+searchReport.trackingNumber+'\')">{{"reports.details" | translate}}</a>';
							}
						}
			}];
		}
		this.searchTable.columnDefs = reportsServices.columnDefs;
		this.searchTable.overrideOptions = reportsServices.overrideOptions;

		/*Table*/
		$scope.onlyNum = /[^]/;
	
		this.addPattern = function(){

			if(this.selectCategory == 'T'){
				this.isFormSubmitted = false;
				this.enterSearchCriteria = null;
				$scope.onlyNum = /^[0-9]+$/;
				
			}else{
				this.isFormSubmitted = false;
				this.enterSearchCriteria = null;
				$scope.onlyNum = /[^]/;
				
			}
		};
		
		
		
		

		
		this.searchResult = [];
		this.searchRequest = function(){
		 this.searchRequestForm();
		 if(this.selectCategory == null || this.enterSearchCriteria == undefined){
			 this.enterSearchCriteria = undefined;
		 }
		 else{
			var user = $scope.applicationCtrl.userInformation;
			var param = {userCountry :user.country, category:this.selectCategory,rfasearchCriteria :this.enterSearchCriteria,requestType:this.selectRequestType, status:this.selectStatus};
			this.searchResult = [];
			searchReqestUIBF.getSearchReqest(param).then(angular.bind(this, function(response) {
				this.searchResult = response.searchList;
		    	return this.searchResult;
		        }));
		 }
		};
		
		 this.masterDetailsModal = function (trackingNumber) {
			 var modalOptions = {
				      actionButtonText: 'Close Window',
				      data:_.findWhere(this.searchResult, {trackingNumber: trackingNumber})
			};
	         modalService.showModal({}, modalOptions);
		 };
		 /*Validation*/
		 this.searchRequestForm = function(){
			 this.isFormSubmitted = false;
			 if($scope.searchReqest.$valid){
			 }else{
				 this.isFormSubmitted = true;
			 }
		 };
	
	AlertMessagingService.setup($scope, this);
	
	this.close = function(){
		AlertMessagingService.removeMessages();
	};
}]);