'use strict';
angular.module('TfoamsUiApp.Home')
.controller('ReportsUIC',['$scope', '$state', '$stateParams','reportsUIBF','modalService','AuthorizationUIBF','reports','reportsServices', 'UpdateRequestUIBF','AlertMessagingService',function($scope, $state, $stateParams, reportsUIBF, modalService, AuthorizationUIBF,reports,reportsServices,UpdateRequestUIBF,AlertMessagingService){

	/*****************Web Services****************/
	this.reports = reports;


        this.UpdateRequestUIBF=UpdateRequestUIBF;
	this.reportTable = reportsServices.reportTable;
	this.reportTable.columns =  reportsServices.columns = [{
		'mData': 0,
		'aTargets': [0],
		'sWidth' : '25%',
		'sDefaultContent':'',
        mRender: function() {
            var report = arguments[2];
            if(report.errorMsg){
				return report.errorMsg;
			}else{
				return '<a href="javascript:;" ng-click="reportsCtrl.UpdateRequestUIBF.sendTrackingNumber('+report.trackingNumber+')">'+report.trackingNumber+'</a>';
			}
            
        }
	}, {
		'mData': 'dealerName',
		'aTargets': [1],
		'sWidth' : '25%',
		'sDefaultContent':''
	}, {
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
					var report = arguments[2];
					if(report.errorMsg){
						return '';
					}else{
						return '<a href="javascript:;" ng-click="reportsCtrl.masterDetailsModal(\''+report.trackingNumber+'\')">{{"reports.details" | translate}}</a>';
					}
				}
	}];

	this.reportTable.columnDefs = reportsServices.columnDefs;
	this.reportTable.overrideOptions = reportsServices.overrideOptions;
	 this.masterDetailsModal = function (trackingNumber) {
		 var modalOptions = {
			      actionButtonText: 'Close Window',
			      data:_.findWhere(this.reports, {trackingNumber: trackingNumber})
		};
         modalService.showModal({}, modalOptions);
	 };


	/* Report List data*/
	this.reportsList = [{ reportType: 'RAM',  name: "My Assigned Requests"}, {reportType: 'RCM', name: "Requests that I created" },{ reportType: 'ORA', name: "Open Requests for My Team's Region" },{reportType:'OPA', name: "My Submitted Requests"}];
	this.reportsListOpen = _.findWhere(this.reportsList, {reportType: $stateParams.reportType});



}]);
