'use strict';

angular.module('TfoamsUiApp.Home')
   .controller('CreateRequestUIC', ['$window', '$filter', 'FileUploadUIBF', 'resolvedRootCauseData', 'resolvedGeoRegion', 'RFADetails', 'SelectDealerModalUIS', 'RequestHistoryModalUIS', 'requestSourceType', 'UpdateRequestUIBF', '_', '$scope', '$state', 'TfoamsUiAppConstants', 'SelectDealerUIBF', 'EmailSummaryModalUIS', 'DeleteRequestModalUIS', 'AlertMessagingService', '$timeout', 'UserUIRM', '$anchorScroll', '$location',
        function ($window, $filter, FileUploadUIBF, resolvedRootCauseData, resolvedGeoRegion, RFADetails, SelectDealerModalUIS, RequestHistoryModalUIS, requestSourceType, UpdateRequestUIBF, _, $scope, $state, TfoamsUiAppConstants, SelectDealerUIBF, EmailSummaryModalUIS, DeleteRequestModalUIS, AlertMessagingService, $timeout, UserUIRM, $anchorScroll, $location) {




            this.isUpdating = UpdateRequestUIBF.isUpdating;

            this.open = function ($event, opened) {
                $event.preventDefault();
                $event.stopPropagation();

                this[opened] = true;
            };

            this.datePickerOptions = {
                'year-format': 'yyyy',
                'starting-day': 0,
                'show-weeks': false
            };
            $scope.$watch('createRequestCtrl.RFADetails.initialContactDate', angular.bind(this, function(newVal) {
                this.RFADetails.initialContactDate = $filter('date')(this.RFADetails.initialContactDate, 'dd-MMM-yyyy');
            }));
            $scope.$watch('createRequestCtrl.RFADetails.actualVisitDate', angular.bind(this, function(newVal) {
                this.RFADetails.actualVisitDate = $filter('date')(this.RFADetails.actualVisitDate, 'dd-MMM-yyyy');
            }));



            AlertMessagingService.setup($scope, this);

            this.close = function () {
                AlertMessagingService.removeMessages();
            };

            this.RFADetails = RFADetails;


            this.model = {};
            

            this.rootCauseData = resolvedRootCauseData;
            
            this.additionalRootCausesData = [];
            
            for(var i=0;i<this.rootCauseData.length;i++){
            	this.additionalRootCausesData.push(this.rootCauseData[i]);
            }
            
            this.geoRegionList = resolvedGeoRegion;

            this.getGCQISReport = function () {
                if (this.RFADetails.gcqisReportNumber == undefined || this.RFADetails.gcqisReportNumber == '') {
                    this.gcqisReportFieldValidation();
                }
                else {
                    var reportNum = this.RFADetails.gcqisReportNumber;
                    UpdateRequestUIBF.sendGCQISReportNumber(reportNum);
                    return UpdateRequestUIBF.getGCQISReport().then(angular.bind(this, function (response) {
                        this.gcqisReportDetail = response;
                        this.RFADetails = this.gcqisReportDetail;
                        this.isTechnicianCertified = this.RFADetails.isTechnicianCertified==''?'PSL':this.RFADetails.isTechnicianCertified;
                        this.vehicleDown = this.RFADetails.vehicleDown==''?'PSL':this.RFADetails.vehicleDown;
                        this.specificDealer = this.RFADetails.dealerName;
                        this.dealerGoRegionDescription = this.RFADetails.geoRegionDescription;
                    }));
                }
            };

            this.trackingNumber = this.RFADetails.trackingNumber;

            this.requestSourceType = requestSourceType;

            this.requestSource = [];
            this.requestSource = this.requestSourceType.requestSourceList;
            this.RFADetails.requestSourceCode = !this.trackingNumber ? this.requestSource[0].code : this.RFADetails.requestSourceCode;
            
    		this.shoudeHideEmailContact = function(){
				this.shoudeHideEmailContactIfTrue = {
						value:this.RFADetails.requestSourceCode == 'BBB' || 
				    	  this.RFADetails.requestSourceCode == 'LGL' || 
				    	  this.RFADetails.requestSourceCode == 'CAT' || 
				    	  this.RFADetails.requestTypeCode == 'LGL'
						
				};
			};       
      
      
            this.loadResourceType = function () {
                this.requestType = _.findWhere(this.requestSourceType.requestSrcTypeVOs, {reqSourceCode: this.RFADetails.requestSourceCode});
                this.requestTypeList = [];
                this.requestTypeList = this.requestType ? this.requestType.reqTypeList : [];
                this.RFADetails.requestTypeCode = this.requestTypeList.length > 0 ? this.requestTypeList[0].code : '';
                this.shoudeHideEmailContact();
            };


            if (this.trackingNumber) {
                this.RFADetails.dealerName = this.selectedDealerDetails ? this.selectedDealerDetails.dealershipName : this.RFADetails.dealerName;
                if (this.RFADetails.requestTypeCode) {
                    this.loadResourceType();
                }
            }
            else {
                this.RFADetails.gcqisReportNumber = '';
            }

            this.isTechnicianCertified = this.trackingNumber?this.RFADetails.isTechnicianCertified:'PSL';
            this.vehicleDown = this.trackingNumber?this.RFADetails.vehicleDown:'PSL';


            this.selectedDealerDetails = null;
            this.selectDealer = function () {
                SelectDealerModalUIS.open().then(angular.bind(this, function (response) {
                    this.selectedDealerDetails = response;
                    this.RFADetails.dealerName = this.selectedDealerDetails.dealershipName;
                    this.RFADetails.pandACode = this.selectedDealerDetails.paCode;
                    this.RFADetails.geoRegionDescription = this.selectedDealerDetails.geoRegionDescription;
                    this.RFADetails.facingRegion = this.selectedDealerDetails.facingRegionDescription;
                    this.RFADetails.salesZone = this.selectedDealerDetails.salesZone;
                    this.RFADetails.technicalZone = this.selectedDealerDetails.technicalZone;
                    this.selectedSalesZone = this.selectedDealerDetails.salesZone;
                    this.selectedTechnicalZone = this.selectedDealerDetails.technicalZone;
                }));
            };

            this.showRequestHistory = function () {
                RequestHistoryModalUIS.trackingNumber = this.RFADetails.trackingNumber;
                UpdateRequestUIBF.trackingNumber = this.RFADetails.trackingNumber;
                RequestHistoryModalUIS.rfaStatusDescription = this.RFADetails.rfaStatusDescription;
                RequestHistoryModalUIS.currentAssignee = this.RFADetails.currentAssignee;
                return RequestHistoryModalUIS.getRFAHistoryDetails().then(angular.bind(this, function (response) {
                    this.RFAHistoryDetails = response;
                    RequestHistoryModalUIS.open(this.RFAHistoryDetails);
                }));

            };

            this.exportGCQIS = function () {
                if (this.RFADetails.gcqisReportNumber == "" ||
                    this.RFADetails.initialContactDate == "" ||
                    this.RFADetails.personContacted == "" ||
                    this.RFADetails.isDealerVisitPlanned == "Y" && this.RFADetails.actualVisitDate == "") {
                    this.isValidExportGCQIS();
                } else {

                    var params = {
                        gcqisReportNumber: this.RFADetails.gcqisReportNumber,
                        initialContactDate: this.RFADetails.initialContactDate,
                        personContacted: this.RFADetails.personContacted,
                        isDealerVisitPlanned: this.RFADetails.isDealerVisitPlanned,
                        actualVisitDate: this.RFADetails.actualVisitDate
                    };
                    return UpdateRequestUIBF.exportGCQIS(this.RFADetails).then(angular.bind(this, function (response) {
                        this.GCQISDetails = response;
                    }));
                }
            };

            this.refreshCommentsTar = function () {
            	if(this.RFADetails.gcqisReportNumber == "" || this.RFADetails.gcqisReportNumber == null){
            		this.isValidGCQISRefresh();
                    		
            	}else{
            	     UpdateRequestUIBF.gcqisNo = this.RFADetails.gcqisReportNumber;
                     return UpdateRequestUIBF.getRefreshData().then(angular.bind(this, function(response){
                         this.RFADetails.gcqisComments = response.gcqisComment;
                         this.RFADetails.isTarOpen = response.tarStatus;
                     }));
            	}
           
            };

            if (this.RFADetails.dealerName === "NOT DEALER SPECIFIC") {
                this.notDealerSpecific = true;
                this.geoRegionDetails = _.findWhere(this.geoRegionList, {'code': this.RFADetails.geoRegion});
            }
            else {
                this.notDealerSpecific = false;
            };

            this.specificDealer = this.RFADetails.dealerName;
            this.dealerGoRegionDescription = this.RFADetails.geoRegionDescription;

            this.isDealerSpecific = function () {
                if (this.notDealerSpecific) {
                    this.RFADetails.dealerName = "NOT DEALER SPECIFIC";
                    this.selectedDealerDetails = null;
                    this.geoRegionList = resolvedGeoRegion;

                }
                else {
                    this.RFADetails.dealerName = this.specificDealer;
                    this.RFADetails.geoRegionDescription = this.dealerGoRegionDescription;
                    this.geoRegionList = [];
                }
            };

            this.getRFAGeoRegion = function () {
                this.RFADetails.geoRegion = this.geoRegionDetails ? this.geoRegionDetails.code : '';
                this.RFADetails.geoRegionDescription = this.geoRegionDetails ? this.geoRegionDetails.description : '';
            };


            this.chooseAction = function () {
            	this.shouldgotoTopFormActionClick();
                if (this.selectedAction == 'save') {
                    this.RFADetails.userAction = 'CNS';
                    this.saveUser();
                }
                else if (this.selectedAction == 'submit/Assign') {
                    this.RFADetails.userAction = 'SBA';
                    if (this.RFADetails.rfaStatusDescription == 'Submitted') {
                        $scope.createRequest.totalSpentHours.$setValidity('notzero', true);
                        this.setSBA();
                    } else {
                        this.setSBA();
                    }

                }
                else if (this.selectedAction == 'close') {
                    this.RFADetails.userAction = 'CLS';
                    if (this.RFADetails.totalHoursSpent <= 0) {
                        $scope.createRequest.totalSpentHours.$setValidity('notzero', false);
                    } else {
                        $scope.createRequest.totalSpentHours.$setValidity('notzero', true);
                    }
                    this.isGCQISReporFormSubmittedEmailSummary = false;
                    this.NotisValidGcqisReportEmailSummary();
                    this.closeRequestFSCComments();
                    this.dealershipVisitplanned();
                    this.notValidExportGCQIS();
                    this.isValideNotTAR();
                    if ($scope.createRequest.$invalid) {
                    	this.status.isOpenFSCDetails = true;

                    		if($scope.createRequest.exportGCQISReport.$invalid){

                    			this.status.isOpenRequestInfo = true;
                    			this.status.isOpenFSCDetails = false;

                    		}else{

                    		}

                    	AlertMessagingService.addMessage('Please fill out all mandatory fields', 'danger', true);
                        this.createRFAFormValidation();
                    } else {
                    	AlertMessagingService.removeMessages();
                        this.saveUser();
                        this.isValide = false;
                        this.isFormSubmitted = false;
                        $scope.createRequest.$setPristine();
                    }
                }
                else if (this.selectedAction == 'returnToDispatcher') {
                    this.RFADetails.userAction = 'RTD';
                    this.saveUser();
                }
                else if (this.selectedAction == 'emailSummary') {

                	if(this.RFADetails.requestTypeCode == 'TAR' && this.RFADetails.gcqisReportNumber == '' && $scope.applicationCtrl.userInformation.gcqisAccess == true ||
                	   this.RFADetails.requestTypeCode == 'TAR' && this.RFADetails.gcqisReportNumber == undefined && $scope.applicationCtrl.userInformation.gcqisAccess == true)
                	{
                		this.isGCQISReporFormSubmittedEmailSummary = true;
                		this.isValidGcqisReportEmailSummary();
                		this.status.isOpenRequestInfo = true;
                	}else{
                		this.isGCQISReporFormSubmittedEmailSummary = false;
	                    if(this.RFADetails.trackingNumber) {
	                    this.RFADetails.userAction = 'CNS';
	                    this.saveUser();
	                    this.showEmailSummary("emailSummary");
	                    }
	                    else {
	                        AlertMessagingService.addMessage('Request not found to send email summary', 'danger', true);
	                        $timeout(function () {
	                            AlertMessagingService.removeMessages();
	                        }, 7000);

	                    }
                	}
                }
                else if (this.selectedAction == 'bypassDispatcher') {
                    this.RFADetails.userAction = 'BYP';
                    this.RFADetails.byPass = 'Y';
                    if (this.RFADetails.rfaStatusDescription == 'Submitted') {
                        $scope.createRequest.totalSpentHours.$setValidity('notzero', true);
                        this.setSBA();
                    } else {
                        this.setSBA();
                    }
                }
                else if (this.selectedAction == 'emailContactReport') {
                    this.RFADetails.userAction = 'CNS';
                    this.saveUser();
                    this.showEmailSummary("sendcontact");
                }
                else if (this.selectedAction == 'generateContactReport') {
                    this.RFADetails.userAction = '';
                }
                else if (this.selectedAction == 'delete') {
                    this.RFADetails.userAction = 'DEL';
                    this.deleteRequest();
                }
                else {

                }
            };

            this.removeFile = function(index,action) {
                var fileToRemove = this.RFADetails.attachmentList[index];
                this.uploadFile(fileToRemove.attachmentId, fileToRemove, action);
            };
            this.removeFileFromList = function(index) {
                this.RFADetails.attachmentList.splice(index, 1);
            };


            this.downloadFile = function(index) {
                this.fileToDownload = this.RFADetails.attachmentList[index];
                this.fileUrl = '/WipsWeb/WIPS/REST/Attachment/ViewAttachment/' + this.RFADetails.userCountry + '/' + this.RFADetails.trackingNumber + '/' + this.fileToDownload.attachmentId;
                $window.open(this.fileUrl);
            };


            this.fileModel = [];

            //listen for the file selected event
            $scope.$on("fileSelected", angular.bind(this, function (event, arg) {
                    if ((arg.file.attachmentFileSize / 1024 / 1024) > 2) {
                        this.maxFileSize = true;
                    }
                    else {
                        this.maxFileSize = false;
                        this.uploadFile('', arg.file, 'uploadFile');
                    }

            }));


            this.uploadFile = function(attachmentId, file, uploadAction) {
                this.uploadAction = uploadAction;
                var params = {
                    attachmentId :attachmentId,
                    trackingNumber:this.RFADetails.trackingNumber,
                    userCountry:this.RFADetails.userCountry,
                    lastUpdatedCDSID:this.RFADetails.lastUpdatedByCDSID,
                    attachmentFileSize:file.attachmentFileSize,
                    attachmentFileName:file.attachmentFileName,
                    filedata:file.filedata,
                    userAction:uploadAction,
                };
                return FileUploadUIBF.fileUpload(params).then(angular.bind(this, function(response) {
                    this.fileUploadResponse = response;
                    if(uploadAction==='uploadFile') {
                        this.RFADetails.attachmentList.push(response);
                    };
                    file.attachmentFileSize = Math.round(file.attachmentFileSize/1024);
                }));
            };

            this.saveUser = function () {
		AlertMessagingService.removeMessages();

                this.RFADetails.userCountry = UserUIRM.userInformation.country;
                this.RFADetails.dealerName = this.selectedDealerDetails ? this.selectedDealerDetails.dealershipName : this.RFADetails.dealerName;
                this.RFADetails.pandACode = this.selectedDealerDetails ? this.selectedDealerDetails.paCode : this.RFADetails.pandACode;
                this.RFADetails.geoRegion = this.selectedDealerDetails ? this.selectedDealerDetails.geoRegion : this.RFADetails.geoRegion;
                this.RFADetails.geoRegionDescription = this.selectedDealerDetails ? this.selectedDealerDetails.geoRegionDescription : this.RFADetails.geoRegionDescription;
                this.RFADetails.facingRegionDescription = this.selectedDealerDetails ? this.selectedDealerDetails.facingRegionDescription : this.RFADetails.facingRegionDescription;
                this.RFADetails.salesZone = this.selectedDealerDetails ? this.selectedDealerDetails.salesZone : this.RFADetails.salesZone;
                this.RFADetails.technicalZone = this.selectedDealerDetails ? this.selectedDealerDetails.technicalZone : this.RFADetails.technicalZone;
                UpdateRequestUIBF.saveRFADetails(this.RFADetails).then(angular.bind(this, function (response) {
                    this.updatedRFADetails = response;

                    /* Alert Messaging */
                    if (this.updatedRFADetails) {
                        AlertMessagingService.addMessage(this.updatedRFADetails.successMsg, 'success', true);
                        $timeout(function () {
                            AlertMessagingService.removeMessages();
                        }, 7000);
                    };

                    /*Based on the response action buttons add/remove.*/
                    this.RFADetails = this.updatedRFADetails;
                    this.buttonShowHide();




                }));
                if (this.updatedRFADetails) {
                    this.RFADetails.trackingNumber = this.updatedRFADetails.trackingNumber;
                };


            };

            this.showEmailSummary = function (userAction) {
                EmailSummaryModalUIS.trackingNumber = this.RFADetails.trackingNumber;
                EmailSummaryModalUIS.requestTypeDescription = this.RFADetails.requestTypeDescription;
                EmailSummaryModalUIS.dealerName = this.RFADetails.dealerName;
                EmailSummaryModalUIS.open(userAction);
            };

            this.deleteRequest = function () {
            	this.isFormSubmitted = false;
            	this.isGCQISReporFormSubmittedEmailSummary = false;
    			$scope.createRequest.$setPristine();
    			AlertMessagingService.removeMessages();

                return DeleteRequestModalUIS.open(this.RFADetails).then(angular.bind(this, function (response) {
                    this.updatedRFADetails = response;

                    /*Based on the response action buttons add/remove.*/
                    this.RFADetails = this.updatedRFADetails;
                    this.buttonShowHide();
                    this.shoudeHideEmailContact();


                }));
            };


            /*Validation*/
            this.createRFAFormValidation = function () {
                this.isFormSubmitted = false;
                if ($scope.createRequest.$valid) {
                } else {
                    this.isFormSubmitted = true;
                }
            };

            this.gcqisReportFieldValidation = function () {
                this.isValid = false;
                if ($scope.GCQISReportNumberForm.$valid) {
                } else {
                    this.isValid = true;
                }
            };

            this.ifValidHours = function () {

                if (this.RFADetails.rfaStatusDescription == 'Assigned' || this.RFADetails.rfaStatusDescription == 'Submitted') {

                    if (this.RFADetails.totalHoursSpent == "" || this.RFADetails.totalTimeSpent == "" || this.RFADetails.totalCost == "") {
                        $scope.createRequest.totalSpentHours.$setValidity('required', false);
                        $scope.createRequest.travelTime.$setValidity('required', false);
                        $scope.createRequest.travelCost.$setValidity('required', false);
                    }
                    else {
                        $scope.createRequest.totalSpentHours.$setValidity('required', true);
                        $scope.createRequest.travelTime.$setValidity('required', true);
                        $scope.createRequest.travelCost.$setValidity('required', true);
                    }
                }
                else {
                    return undefined;
                }
            };


            this.isValideNotTAR = function () {
                if (this.RFADetails.isDealerVisitPlanned == undefined) {
                    $scope.createRequest.visit.$setValidity('required', false);
                }
                else if (this.RFADetails.isDealerVisitPlanned == 'Y' && this.RFADetails.actualVisitDate == undefined) {
                    $scope.createRequest.actualVisitDate.$setValidity('required', false);


                } else if (this.RFADetails.isDealerVisitPlanned == 'Y' && this.RFADetails.isActualDealerVisitOccur == undefined) {
                    $scope.createRequest.visitOccur.$setValidity('required', false);

                }
                else if (this.RFADetails.isDealerVisitPlanned == 'Y' && this.RFADetails.totalHoursSpent == undefined) {
                    $scope.createRequest.totalSpentHours.$setValidity('required', false);
                }

                else if (this.RFADetails.isDealerVisitPlanned == "N" && this.RFADetails.totalHoursSpent == undefined) {

                    $scope.createRequest.totalSpentHours.$setValidity('required', false);

                } else if (this.RFADetails.isDealerVisitPlanned == 'N' && this.RFADetails.totalHoursSpent == undefined) {
                    $scope.createRequest.actualVisitDate.$setValidity('required', true);

                } else if (this.RFADetails.isDealerVisitPlanned == 'N' && this.RFADetails.totalHoursSpent == undefined) {
                    $scope.createRequest.visitOccur.$setValidity('required', true);
                }
            };


            this.validExportGCQIS = function () {
                this.requiredExportGCQIS = {
                    required: 'Yes',
                    status: 'All'
                };
                $timeout(function () {
                    $scope.$apply();
                }, 0);
            };

            this.notValidExportGCQIS = function () {
                this.requiredExportGCQIS = {
                    required: 'Not Valid',
                    status: 'Not Valid'
                };
                $timeout(function () {
                    $scope.$apply();
                }, 0);

            };


            this.isValidGcqisReportEmailSummary = function(){

                this.requiredExportGCQISEmailSummary = {
                        requiredEmail: 'Yes'
                    };
                    $timeout(function () {
                        $scope.$apply();
                    }, 0);

            };

            	this.NotisValidGcqisReportEmailSummary = function(){

                this.requiredExportGCQISEmailSummary = {
                        requiredEmail: 'No'
                    };
                    $timeout(function () {
                        $scope.$apply();
                    }, 0);

            };


            this.isValidExportGCQIS = function () {
                this.validExportGCQIS();
                this.isGCQISReporFormSubmitted = true;
            };


       this.isValidGCQISRefresh = function(){
    	   if(this.gcqisAccess.gcqisAccess){
    	   	   this.isGCQISReporFormSubmitted = false;
    	   }else{
    	   	   this.isGCQISReporFormSubmitted = true;
        	   this.validExportGCQIS();
    	   }
       };

       this.saveBtn = {
    		   allStatus : this.RFADetails.rfaStatusDescription == '' || this.RFADetails.rfaStatusDescription == 'Draft' ||
			               this.RFADetails.rfaStatusDescription =='Assigned' ||
			               this.RFADetails.rfaStatusDescription =='Closed' && $scope.applicationCtrl.userInformation.jobRole=='NAD' ||
			               this.RFADetails.rfaStatusDescription =='Closed' && $scope.applicationCtrl.userInformation.jobRole=='PDP' ||
			               this.RFADetails.rfaStatusDescription =='Closed' && $scope.applicationCtrl.userInformation.jobRole=='SDP' ||
			               this.RFADetails.rfaStatusDescription =='Deleted' && $scope.applicationCtrl.userInformation.jobRole=='NAD' ||
			               this.RFADetails.rfaStatusDescription =='Deleted' && $scope.applicationCtrl.userInformation.jobRole=='PDP' ||
			               this.RFADetails.rfaStatusDescription =='Deleted' && $scope.applicationCtrl.userInformation.jobRole=='SDP' ||
			               this.RFADetails.rfaStatusDescription =='Submitted' && $scope.applicationCtrl.userInformation.jobRole=='NAD'||
			               this.RFADetails.rfaStatusDescription =='Submitted' && $scope.applicationCtrl.userInformation.jobRole=='PDP'||
			               this.RFADetails.rfaStatusDescription =='Submitted' && $scope.applicationCtrl.userInformation.jobRole=='SDP'
       };

       this.deleteBtn = {
    		   allStatus : this.RFADetails.rfaStatusDescription =='Draft' || this.RFADetails.rfaStatusDescription =='Submitted' ||
			               this.RFADetails.rfaStatusDescription =='Assigned' ||
			               this.RFADetails.rfaStatusDescription =='Closed' && $scope.applicationCtrl.userInformation.jobRole=='NAD' ||
			               this.RFADetails.rfaStatusDescription =='Closed' && $scope.applicationCtrl.userInformation.jobRole=='PDP' ||
			               this.RFADetails.rfaStatusDescription =='Closed' && $scope.applicationCtrl.userInformation.jobRole=='SDP'

            };

            this.submitAndAssign = {
                allStatus: this.RFADetails.rfaStatusDescription == 'Submitted' || this.RFADetails.rfaStatusDescription == 'Draft' || this.RFADetails.rfaStatusDescription == ''
            };

            this.closeRequest = {
                allStatus: this.RFADetails.rfaStatusDescription == 'Assigned'
            };


            this.returnToDispatcher = {
                allStatus: this.RFADetails.rfaStatusDescription == 'Assigned' ||
                this.RFADetails.rfaStatusDescription == 'Closed' && $scope.applicationCtrl.userInformation.jobRole == 'NAD' ||
                this.RFADetails.rfaStatusDescription == 'Closed' && $scope.applicationCtrl.userInformation.jobRole == 'PDP' ||
                this.RFADetails.rfaStatusDescription == 'Closed' && $scope.applicationCtrl.userInformation.jobRole == 'SDP' ||
                this.RFADetails.rfaStatusDescription == 'Deleted' && $scope.applicationCtrl.userInformation.jobRole == 'NAD' ||
                this.RFADetails.rfaStatusDescription == 'Deleted' && $scope.applicationCtrl.userInformation.jobRole == 'PDP' ||
                this.RFADetails.rfaStatusDescription == 'Deleted' && $scope.applicationCtrl.userInformation.jobRole == 'SDP'
            };
            this.emailSummary = {
                allStatus: this.RFADetails.rfaStatusDescription == 'Draft' || this.RFADetails.rfaStatusDescription == 'Assigned' || this.RFADetails.rfaStatusDescription == 'Closed' || this.RFADetails.rfaStatusDescription == '' ||
                this.RFADetails.rfaStatusDescription == 'Submitted' && $scope.applicationCtrl.userInformation.jobRole == 'NAD' ||
                this.RFADetails.rfaStatusDescription == 'Submitted' && $scope.applicationCtrl.userInformation.jobRole == 'PDP' ||
                this.RFADetails.rfaStatusDescription == 'Submitted' && $scope.applicationCtrl.userInformation.jobRole == 'SDP'
            };
            this.bypassDispatcher = {
                allStatus: $scope.applicationCtrl.userInformation.jobRole == 'FSE' && this.RFADetails.rfaStatusDescription == '' ||
                $scope.applicationCtrl.userInformation.jobRole == 'OTR' && this.RFADetails.rfaStatusDescription == '' ||
                $scope.applicationCtrl.userInformation.jobRole == 'FSE' && this.RFADetails.rfaStatusDescription == 'Draft' ||
                $scope.applicationCtrl.userInformation.jobRole == 'OTR' && this.RFADetails.rfaStatusDescription == 'Draft'
            };

            this.emailContactReport = {
                allStatus: this.RFADetails.rfaStatusDescription == 'Assigned'
            };


            this.showOnlyCancel = {
                allStatus: this.RFADetails.rfaStatusDescription == '' || this.RFADetails.rfaStatusDescription == 'Draft' || this.RFADetails.rfaStatusDescription == 'Closed' ||
                this.RFADetails.rfaStatusDescription == 'Submitted' && $scope.applicationCtrl.userInformation.jobRole == 'NAD' ||
                this.RFADetails.rfaStatusDescription == 'Submitted' && $scope.applicationCtrl.userInformation.jobRole == 'PDP' ||
                this.RFADetails.rfaStatusDescription == 'Submitted' && $scope.applicationCtrl.userInformation.jobRole == 'SDP' ||
                this.RFADetails.rfaStatusDescription == 'Assigned' && $scope.applicationCtrl.userInformation.jobRole == 'NAD' ||
                this.RFADetails.rfaStatusDescription == 'Assigned' && $scope.applicationCtrl.userInformation.jobRole == 'PDP' ||
                this.RFADetails.rfaStatusDescription == 'Assigned' && $scope.applicationCtrl.userInformation.jobRole == 'SDP' ||
                this.RFADetails.rfaStatusDescription == 'Deleted' && $scope.applicationCtrl.userInformation.jobRole == 'NAD' ||
                this.RFADetails.rfaStatusDescription == 'Deleted' && $scope.applicationCtrl.userInformation.jobRole == 'PDP' ||
                this.RFADetails.rfaStatusDescription == 'Deleted' && $scope.applicationCtrl.userInformation.jobRole == 'SDP' ||
                this.RFADetails.rfaStatusDescription == 'Assigned' && $scope.applicationCtrl.userInformation.id.toUpperCase() == this.RFADetails.currentAssignee.toUpperCase()
            };

            if (this.saveBtn.allStatus) {

                this.selectedAction = 'save';

            } else {
                this.selectedAction = 'emailSummary';

            }

            this.buttonShowHide = function () {
                this.deleteBtn = {
                    allStatus: this.updatedRFADetails.rfaStatusDescription == 'Draft' || this.updatedRFADetails.rfaStatusDescription == 'Submitted' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Assigned' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Closed' && $scope.applicationCtrl.userInformation.jobRole == 'NAD' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Closed' && $scope.applicationCtrl.userInformation.jobRole == 'PDP' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Closed' && $scope.applicationCtrl.userInformation.jobRole == 'SDP'

                };

                this.saveBtn = {
                    allStatus: this.updatedRFADetails.rfaStatusDescription == '' || this.updatedRFADetails.rfaStatusDescription == 'Draft' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Assigned' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Closed' && $scope.applicationCtrl.userInformation.jobRole == 'NAD' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Closed' && $scope.applicationCtrl.userInformation.jobRole == 'PDP' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Closed' && $scope.applicationCtrl.userInformation.jobRole == 'SDP' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Deleted' && $scope.applicationCtrl.userInformation.jobRole == 'NAD' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Deleted' && $scope.applicationCtrl.userInformation.jobRole == 'PDP' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Deleted' && $scope.applicationCtrl.userInformation.jobRole == 'SDP' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Submitted' && $scope.applicationCtrl.userInformation.jobRole == 'NAD' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Submitted' && $scope.applicationCtrl.userInformation.jobRole == 'PDP' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Submitted' && $scope.applicationCtrl.userInformation.jobRole == 'SDP'
                };

                this.submitAndAssign = {
                    allStatus: this.updatedRFADetails.rfaStatusDescription == 'Submitted' || this.updatedRFADetails.rfaStatusDescription == 'Draft' || this.updatedRFADetails.rfaStatusDescription == ''
                };

                this.closeRequest = {
                    allStatus: this.updatedRFADetails.rfaStatusDescription == 'Assigned'
                };


                this.returnToDispatcher = {
                    allStatus: this.updatedRFADetails.rfaStatusDescription == 'Assigned' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Closed' && $scope.applicationCtrl.userInformation.jobRole == 'NAD' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Closed' && $scope.applicationCtrl.userInformation.jobRole == 'PDP' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Closed' && $scope.applicationCtrl.userInformation.jobRole == 'SDP' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Deleted' && $scope.applicationCtrl.userInformation.jobRole == 'NAD' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Deleted' && $scope.applicationCtrl.userInformation.jobRole == 'PDP' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Deleted' && $scope.applicationCtrl.userInformation.jobRole == 'SDP'
                };
                this.emailSummary = {
                    allStatus: this.updatedRFADetails.rfaStatusDescription == 'Draft' || this.updatedRFADetails.rfaStatusDescription == 'Assigned' || this.updatedRFADetails.rfaStatusDescription == 'Closed' || this.updatedRFADetails.rfaStatusDescription == '' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Submitted' && $scope.applicationCtrl.userInformation.jobRole == 'NAD' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Submitted' && $scope.applicationCtrl.userInformation.jobRole == 'PDP' ||
                    this.updatedRFADetails.rfaStatusDescription == 'Submitted' && $scope.applicationCtrl.userInformation.jobRole == 'SDP'
                };
                this.bypassDispatcher = {
                    allStatus: $scope.applicationCtrl.userInformation.jobRole == 'FSE' && this.updatedRFADetails.rfaStatusDescription == '' ||
                    $scope.applicationCtrl.userInformation.jobRole == 'OTR' && this.updatedRFADetails.rfaStatusDescription == '' ||
                    $scope.applicationCtrl.userInformation.jobRole == 'FSE' && this.updatedRFADetails.rfaStatusDescription == 'Draft' ||
                    $scope.applicationCtrl.userInformation.jobRole == 'OTR' && this.updatedRFADetails.rfaStatusDescription == 'Draft'
                };

                this.emailContactReport = {
                    allStatus: this.updatedRFADetails.rfaStatusDescription == 'Assigned'
                };

                this.showOnlyCancel = {
                        allStatus: this.updatedRFADetails.rfaStatusDescription == '' || this.updatedRFADetails.rfaStatusDescription == 'Draft' ||
                        this.updatedRFADetails.rfaStatusDescription == 'Closed' ||
                        this.updatedRFADetails.rfaStatusDescription == 'Submitted' && $scope.applicationCtrl.userInformation.jobRole == 'NAD' ||
                        this.updatedRFADetails.rfaStatusDescription == 'Submitted' && $scope.applicationCtrl.userInformation.jobRole == 'PDP' ||
                        this.updatedRFADetails.rfaStatusDescription == 'Submitted' && $scope.applicationCtrl.userInformation.jobRole == 'SDP' ||
                        this.updatedRFADetails.rfaStatusDescription == 'Assigned' && $scope.applicationCtrl.userInformation.jobRole == 'NAD' ||
                        this.updatedRFADetails.rfaStatusDescription == 'Assigned' && $scope.applicationCtrl.userInformation.jobRole == 'PDP' ||
                        this.updatedRFADetails.rfaStatusDescription == 'Assigned' && $scope.applicationCtrl.userInformation.jobRole == 'SDP' ||
                        this.updatedRFADetails.rfaStatusDescription == 'Deleted' && $scope.applicationCtrl.userInformation.jobRole == 'NAD' ||
                        this.updatedRFADetails.rfaStatusDescription == 'Deleted' && $scope.applicationCtrl.userInformation.jobRole == 'PDP' ||
                        this.updatedRFADetails.rfaStatusDescription == 'Deleted' && $scope.applicationCtrl.userInformation.jobRole == 'SDP' ||
                        this.updatedRFADetails.rfaStatusDescription == 'Assigned' && $scope.applicationCtrl.userInformation.id == this.updatedRFADetails.currentAssignee
                };

                if (this.saveBtn.allStatus) {
                    this.selectedAction = 'save';
                } else {
                    this.selectedAction = 'emailSummary';
                }

            };

            this.setSBA = function () {
            	this.isGCQISReporFormSubmittedEmailSummary = false;
            	this.NotisValidGcqisReportEmailSummary();
                this.notValidExportGCQIS();
                this.setValidityVehicleDown();
                this.validatorPSLValue();
                if ($scope.createRequest.$invalid) {
              		this.requestSourcePanel = {};
              		this.contactInfoPanel = {};
              		this.dealerInfoPanel = {};
              		this.vehicleInfoPanel = {};
              		this.requestSourcePanel.requestSourcePanelOpen = $scope.createRequest.requestType.$invalid || $scope.createRequest.requestDescription.$invalid;
              		this.contactInfoPanel.contactInfoPanelOpen = $scope.createRequest.primaryContactName.$invalid || $scope.createRequest.primaryContactPhone.$invalid;
              		this.dealerInfoPanel.dealerInfoPanelOpen = this.notDealerSpecific == false || $scope.createRequest.geographicRegion.$invalid;
              		this.vehicleInfoPanel.vehicleInfoPanelOpen = $scope.createRequest.vinNumber.$invalid || $scope.createRequest.vehicleYearModel.$invalid
              													 ||  $scope.createRequest.vehicleDown.$invalid;

              			if(this.RFADetails.rfaStatusDescription == 'Submitted'){
              				this.requestSourcePanel.requestSourcePanelOpen = $scope.createRequest.assignToFSE.$invalid || $scope.createRequest.priority.$invalid;
              			}

            		if(this.requestSourcePanel.requestSourcePanelOpen){
            			this.status.isOpenRequestInfo = true;
            		}else {

            		}

            		if(this.contactInfoPanel.contactInfoPanelOpen){
            			this.status.isOpenContactInfo = true;
            		}else{

            		}

            		if(this.dealerInfoPanel.dealerInfoPanelOpen){
            			this.status.isOpenDelearInfo = true;
            		}else{

            		}

            		if(this.vehicleInfoPanel.vehicleInfoPanelOpen){
            			this.status.isOpenVehicleInfo = true;
            		}else{

            		}

                	AlertMessagingService.addMessage('Please fill out all mandatory fields', 'danger', true);
                    this.createRFAFormValidation();
                } else {
                	AlertMessagingService.removeMessages();
                    this.saveUser();
                    this.isValide = false;
                    this.isFormSubmitted = false;
                    $scope.createRequest.$setPristine();
                }
            };

      this.validatorPSLValue = function(){

    	  if(this.RFADetails.requestSourceCode == "PSL"){

    		  $scope.createRequest.requestSource.$setValidity('required', false);

    	  }else if(this.RFADetails.requestTypeCode == "PSL") {

    		  $scope.createRequest.requestType.$setValidity('required', false);
    	  }else{

    		  return undefined;

    	  }

    	  if(this.RFADetails.requestTypeCode == "PSL") {

    		  $scope.createRequest.requestType.$setValidity('required', false);

    	  }else{

    		  return undefined;
    	  }

      };



       this.shouldOtherRootCauseBeDisabled =  function(){
		   if(this.RFADetails.otherRootCauseList == 'OTR'){
			   return false;
		   }
		   else if(this.RFADetails.otherRootCauseList.indexOf('OTR') > -1 && this.RFADetails.otherRootCauseList.length > 0){
			   return false;
		   }else if(this.RFADetails.otherRootCauseList.length == 0 && this.RFADetails.rootCauseCode == 'OTR'){
			   return false;
		   }
		   return true;
	   };


	   this.ifOther = function(){
    	   var shouldItBeDisabled = this.shouldOtherRootCauseBeDisabled();
    	   this.disabled = {
        		   notOTRotherRootCause: shouldItBeDisabled
    	   };
       };

       this.additionalRootCauses  = function(){
    	   this.ifOther();
       };

       this.primaryRootCause = function(){
    	   this.disabled = {
    		   empty: this.RFADetails.rootCauseCode == null || this.RFADetails.rootCauseCode == "" || this.RFADetails.rootCauseCode == "PSL",
    		   OTR: this.RFADetails.rootCauseCode == 'OTR',
    		   notOTR: this.RFADetails.rootCauseCode != 'OTR'

    	   };
       };


       this.disabled = {
    		   empty: this.RFADetails.rootCauseCode == null || this.RFADetails.rootCauseCode == "" || this.RFADetails.rootCauseCode == "PSL",
    		   OTR: this.RFADetails.rootCauseCode == 'OTR',
    		   notOTR: this.RFADetails.rootCauseCode != 'OTR'

    	   };

       this.otherFiled = function(){
    	   this.primaryRootCause();

    	   this.additionalRootCausesData=[];
    	   for(var i=0;i<this.rootCauseData.length;i++){
           	this.additionalRootCausesData.push(this.rootCauseData[i]);
           }

    	   var myInd=-1;
    	   for(var i=0;i<this.rootCauseData.length;i++){
           	   if(this.rootCauseData[i].code == this.RFADetails.rootCauseCode){
    			   myInd=i;
    			   break;
    		   }
           }
    	   this.additionalRootCausesData.splice(myInd,1);

       };



       this.gcqisAccess = {
    		   gcqisAccess : $scope.applicationCtrl.userInformation.gcqisAccess == false
       };

       this.setValidityVehicleDown = function(){
	       if(this.RFADetails.vehicleDown == "PSL"){
	    	   $scope.createRequest.vehicleDown.$setValidity('required', false);
	       }else{
	    	   $scope.createRequest.vehicleDown.$setValidity('required', true);
	       }
       };

       this.dealershipVisitplanned = function(){
	       if(this.RFADetails.isDealerVisitPlanned == undefined || this.RFADetails.isDealerVisitPlanned == "" || this.RFADetails.isDealerVisitPlanned == "N"){
	    	   $scope.createRequest.actualVisitDate.$setValidity('required', true);
	    	   $scope.createRequest.visitOccur.$setValidity('required', true);
	       }else if(this.RFADetails.isDealerVisitPlanned == "Y" && this.RFADetails.actualVisitDate == "" ||
	    		   this.RFADetails.isDealerVisitPlanned == "Y" && this.RFADetails.isActualDealerVisitOccur == ""
	       ){
	    	   $scope.createRequest.actualVisitDate.$setValidity('required', false);
	    	   $scope.createRequest.visitOccur.$setValidity('required', false);
	       }
       };

      this.closeRequestFSCComments = function(){
    	  if(this.RFADetails.requestSourceCode == 'BBB' ||
    	  this.RFADetails.requestSourceCode == 'LGL' ||
    	  this.RFADetails.requestSourceCode == 'CAT' ||
    	  this.RFADetails.requestTypeCode == 'LGL'){
    		  $scope.createRequest.concernSummary.$setValidity('required', true);
    		  $scope.createRequest.inspectionComments.$setValidity('required', true);
    		  $scope.createRequest.recommendations.$setValidity('required', true);
    	  }else if(
    			  this.RFADetails.requestSourceCode != 'BBB' && this.RFADetails.inspectionComments == '' && this.RFADetails.requestTypeCode == 'TAR' ||
    			  this.RFADetails.requestSourceCode != 'BBB' && this.RFADetails.recommendationForTAR == '' && this.RFADetails.requestTypeCode == 'TAR' ||
    			  this.RFADetails.requestSourceCode != 'BBB' && this.RFADetails.concernSummary == '' && this.RFADetails.requestTypeCode == 'TAR' ||

    			  this.RFADetails.requestSourceCode != 'LGL' && this.RFADetails.inspectionComments == '' && this.RFADetails.requestTypeCode == 'TAR' ||
    			  this.RFADetails.requestSourceCode != 'LGL' && this.RFADetails.recommendationForTAR == '' && this.RFADetails.requestTypeCode == 'TAR' ||
    			  this.RFADetails.requestSourceCode != 'LGL' && this.RFADetails.concernSummary == '' && this.RFADetails.requestTypeCode == 'TAR' ||

    			  this.RFADetails.requestSourceCode != 'CAT' && this.RFADetails.inspectionComments == '' && this.RFADetails.requestTypeCode == 'TAR' ||
    			  this.RFADetails.requestSourceCode != 'CAT' && this.RFADetails.recommendationForTAR == '' && this.RFADetails.requestTypeCode == 'TAR' ||
    			  this.RFADetails.requestSourceCode != 'CAT' && this.RFADetails.concernSummary == '' && this.RFADetails.requestTypeCode == 'TAR' ||

    			  this.RFADetails.requestTypeCode != 'LGL' && this.RFADetails.inspectionComments == '' && this.RFADetails.requestTypeCode == 'TAR' ||
    			  this.RFADetails.requestTypeCode != 'LGL' && this.RFADetails.recommendationForTAR == '' && this.RFADetails.requestTypeCode == 'TAR' ||
    			  this.RFADetails.requestTypeCode != 'LGL' && this.RFADetails.concernSummary == '' && this.RFADetails.requestTypeCode == 'TAR'
    			  ){
    		  $scope.createRequest.concernSummary.$setValidity('required', false);
    		  $scope.createRequest.inspectionComments.$setValidity('required', false);
    		  $scope.createRequest.recommendations.$setValidity('required', false);

    	  }else{
    		  $scope.createRequest.concernSummary.$setValidity('required', true);
       		  $scope.createRequest.inspectionComments.$setValidity('required', true);
    		  $scope.createRequest.recommendations.$setValidity('required', true);


    	  }
      };

      this.status = {
			    		isOpenRequestInfo: true,
			    		isOpenContactInfo: true,
			    		isOpenDelearInfo: true,
			    		isOpenVehicleInfo: true,
			    		isOpenFSCDetails:true
      				};

		this.shoudeHideEmailContactIfTrue = {
				value:this.RFADetails.requestSourceCode == 'BBB' ||
		    	  this.RFADetails.requestSourceCode == 'LGL' ||
		    	  this.RFADetails.requestSourceCode == 'CAT' ||
		    	  this.RFADetails.requestTypeCode == 'LGL'

		};

        this.shouldgotoTopFormActionClick = function(){
			$timeout(function() {
	            $location.hash('content');
	            $anchorScroll();
	        });
        };
        }]);
