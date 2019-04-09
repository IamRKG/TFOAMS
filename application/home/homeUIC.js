'use strict';

angular.module('TfoamsUiApp.Home')
	.controller('HomeUIC', ['$scope', '$state', 'UserMaintenanceUIBF', 'reportsUIBF','modalService','AuthorizationUIBF','reportsServices','UserUIRM','countryListUIBF','userUIBF','home','report','UpdateRequestUIBF','reportPDP',
	                       function($scope, $state, UserMaintenanceUIBF,reportsUIBF,modalService,AuthorizationUIBF,reportsServices,UserUIRM,countryListUIBF,userUIBF,home,report,UpdateRequestUIBF,reportPDP) {

		this.isFormSubmitted = false;
		userUIBF.getUserInformation().then(angular.bind(this,function(userInformation){
			this.selectedRoleRegion = userInformation.country;
			return userInformation;
		}));
		
		this.countryList = home;
	    	angular.forEach(this.countryList.countryList, function(country, index){
				if(country.code == 'ALL') { 
					country.roleAndCountry = 'SAD - ' + country.code;
				} else {
					country.roleAndCountry = 'RAD - ' + country.code;
				}
			});
	    	
        
        this.reports = report;
        this.reportPDP = reportPDP;
        this.UpdateRequestUIBF=UpdateRequestUIBF;
        
		this.chooseRole = function() {
			this.isFormSubmitted = true;
			if($scope.homePage.$valid) {
				if(this.selectedRoleRegion!='ALL'){
					$scope.applicationCtrl.setUserRoleCountry('NAD',this.selectedRoleRegion);
					this.reports = {};
					var user = UserUIRM.userInformation;
					var param = {reportType:'RPM', cdsId:user.id, userCountry:user.country, userRole:user.jobRole};
					reportsUIBF.getReports(param).then(angular.bind(this,function(response){
						this.reports = response;
						return this.reports;
						
					}));
				} else {
					$scope.applicationCtrl.setUserRoleCountry('SAD',this.selectedRoleRegion);
				}

				$state.go('home');
				user = UserUIRM.getCachedUserInfo();
				$scope.applicationCtrl.selectedRole = user.jobRole;
                this.callUserMaint();
			}
		};

		
        this.callUserMaint = function() {
        	var user = UserUIRM.userInformation;
            UserMaintenanceUIBF.setUserParams(null, user.id, user.country, user.originalJobRole, user.jobRole, null);
        };

        this.callUserMaint();
        
        
        /*Report*/
    	
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
    					return '<a href="javascript:;" ng-click="homePageCtrl.UpdateRequestUIBF.sendTrackingNumber('+report.trackingNumber+')">'+report.trackingNumber+'</a>';
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
    		'mData': null,
    		'aTargets': [3],
    		'sWidth' : '25%',
    		'sDefaultContent':'',
			mRender: function() {
				var report = arguments[2];
				if(report.errorMsg){
					return '';
				}else{
					return '<a href="javascript:;" ng-click="homePageCtrl.masterDetailsModal(\''+report.trackingNumber+'\')">{{"reports.details" | translate}}</a>';
				}
			}
    	}];
    	
    	this.reportTable.columnDefs = reportsServices.columnDefs;
    	this.reportTable.overrideOptions = reportsServices.overrideOptions;
    	 this.masterDetailsModal = function (trackingNumber) {
    		 var data = _.findWhere(this.reports, {trackingNumber: trackingNumber}) || _.findWhere(this.reportPDP, {trackingNumber: trackingNumber});
    		 var modalOptions = {
   			      actionButtonText: 'Close Window',
   			      data:data
   			      
    		 };
    		 modalService.showModal({}, modalOptions);
    	 };

	}]);
