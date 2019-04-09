'use strict';

angular.module('TfoamsUiApp.Models')
    .factory('CreateRequest', function () {

        function CreateRequest(createRequestObject) {

            this.actionCode = "";
            this.actualVisitDate = "";
            this.assignTo = "";
            this.attachmentList = [];
            this.byPass = "";
            this.closedByCDSID = "";
            this.closedDate = "";
            this.concernSummary = "";
            this.createdByCDSId = "";
            this.createdDate = "";
            this.cudlCaseNumber = "";
            this.currentAssignee = "";
            this.customerName = "";
            this.dealerName = "";
            this.deleteFlag = "";
            this.empFullName = "";
            this.facingRegion = "";
            this.fseComments = "";
            this.gcqisComments = "";
            this.gcqisReportNumber = "";
            this.geoRegion = "";
            this.geoRegionDescription = "";
            this.initialContactDate = "";
            this.inspectionComments = "";
            this.isActualDealerVisitOccur = "";
            this.isDealerVisitPlanned = "";
            this.isMissingTools = "";
            this.isRFA = "";
            this.isTarOpen = "";
            this.isTechnicianCertified = "";
            this.lastUpdatedByCDSID = "";
            this.lastUpdatedDate = "";
            this.missingToolsDuringVisit = "";
            this.nativeLang = "";
            this.otherRequestSourceDescription = "";
            this.otherRootCause = "";
            this.pandACode = "";
            this.personContacted = "";
            this.primaryContactEmailId = "";
            this.primaryContactName = "";
            this.primaryContactPhoneNumber = "";
            this.priority = "";
            this.processFlag = "";
            this.recommendationForTAR = "";
            this.repairOrderNumber = "";
            this.requestDescription = "";
            this.requestSourceCode = "";
            this.requestSourceDescription = "";
            /*this.requestSourceDescriptionForAUS="";
             this.requestSourceDescriptionForCAN="";
             this.requestSourceDescriptionForEMS="";
             this.requestSourceDescriptionForMex="";
             this.requestSourceDescriptionForNZL="";
             this.requestSourceDescriptionForUSA="";*/
            this.requestTypeCode = "";
            this.requestTypeDescription = "";
            this.rfaStatus = "";
            this.rfaStatusDescription = "";
            this.rootCauseCode = "";
            this.rootCauseDescription = "";
            /*this.rootCauseDescriptionAllEng= "";*/
            this.salesZone = "";
            this.starsEmpId = "";
            this.successMsg = "";
            this.tarOpenDate = "";
            this.technicalZone = "";
            this.technicianName = "";
            this.totalHoursSpent = "";
            this.totalTimeSpent = "";
            this.trackingNumber = "";
            this.userAction = "";
            this.userCountry = "";
            this.vehicleDown = "";
            this.vehicleInfoModelYear = "";
            this.vehicleMileage = "";
            this.vinNumber = "";


            if (createRequestObject) {
                angular.extend(this, createRequestObject);
            }


        };

        CreateRequest.prototype = {
            createFrom: function (createRequestObject) {
                if (createRequestObject) {
                    angular.extend(this, createRequestObject);
                }
            }
        };

        return CreateRequest;
    });
