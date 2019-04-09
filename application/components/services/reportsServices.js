'use strict';
angular.module('TfoamsUiApp.Services').
service('reportsServices',['$q',function($q){
	
	this.reportTable = {};
	this.overrideOptions = {
			'bPaginate': false,
			'bInfo':false,
			"bSort": false
		};
	this.columns = [{
		'mData': 'trackingNumber',
		'aTargets': [0],
		'sWidth' : '25%',
		'sDefaultContent':''
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
		'mData': null,
		'aTargets': [3],
		'sWidth' : '25%',
		'sDefaultContent':'',
		mRender: function() {
					var report = arguments[2];
					
					return '<a href="javascript:;"  ng-click="reportsCtrl.masterDetailsModal(\''+report.trackingNumber+'\')">{{"reports.details" | translate}}</a>';
					
				}
	}];
	
	this.columnDefs = [{
		'bSortable': false,
		'aTargets': [0,1,2,3]
	}];
}]);


