'use strict';

angular.module('TfoamsUiApp.Services').
    service('UpdateRequestUIBF', ['$q', 'Restangular', 'UserUIRM', '$state', 'CreateRequest', 'AlertMessagingService', '$timeout', 'FileUploadUIBF', function ($q, Restangular, UserUIRM, $state, CreateRequest, AlertMessagingService, $timeout, FileUploadUIBF) {

        this.RFADetails;
        this.gcqisReportNumber;
        this.gcqisNo;

        this.createRFADetails = function () {
            this.RFADetails = new CreateRequest();
            this.country = UserUIRM.userInformation.country;
        };

        
        this.isUpdating = false;

        this.sendTrackingNumber = function (trackingNum) {
            this.trackingNumber = trackingNum;
            this.isUpdating = true;
            $state.go("createRequest");
        };

        this.getTrackingNumber = function () {
            return this.trackingNumber;
        };

        this.getRFADetails = function () {
            return this.RFADetailsEndpoint.customGET().then(function (response) {
                response = response.plain();
                return response;
            }, function (err) {
                return $q.reject(err);
            });
        };

        this.configureEndPoint = function (trackingNum) {
            this.country = UserUIRM.userInformation.country;
            this.trackingNumber = trackingNum;

            FileUploadUIBF.country = this.country;
            FileUploadUIBF.trackingNumber = this.trackingNumber;

            this.RFADetailsEndpoint = Restangular.all('RFADetails/' + this.country + '/' + this.trackingNumber);
            return this.getRFADetails().then(angular.bind(this, function (response) {
                return FileUploadUIBF.getUploadedFiles().then(function (attachedFilesResponse) {
                    angular.forEach(attachedFilesResponse, function(key, value) {
                        response.attachmentList.push(key);
                    });
                    return response;
                });
            }));
        };


        this.getRootCauseData = function () {
            this.country = UserUIRM.userInformation.country;
            this.rootCauseDataEndPoint = Restangular.all('RootCause/' + this.country);
            return this.rootCauseDataEndPoint.customGET().then(function (response) {
                response = response.plain();
                return response;
            }, function (err) {
                return $q.reject(err);
            });
        };


        this.sendGCQISReportNumber = function (gcqisReportNumber) {
            this.gcqisReportNumber = gcqisReportNumber;
        };

        this.getGCQISReport = function () {
            this.country = UserUIRM.userInformation.country;
            this.GCQISReportEndPoint = Restangular.all('GCQISDetails/' + this.gcqisReportNumber + '/' + this.country);
            return this.GCQISReportEndPoint.customGET().then(function (response) {
                response = response.plain();
                return response;
            }, function (err) {
                return $q.reject(err);
            });
        };

        this.saveRFADetailsEndPoint = Restangular.all('rfa');
        this.saveRFADetails = function (RFADetails) {

           return this.saveRFADetailsEndPoint.post(RFADetails).then(angular.bind(this, function (response) {
               response = response.plain();

               return response;

            }), function(errorMsg) {
            });
        };

        this.deleteRequest = function(params) {
           return this.saveRFADetailsEndPoint.post(params).then(angular.bind(this, function (response) {
               response = response.plain();
               AlertMessagingService.addMessage('Request has been successfully deleted', 'success', true);
               $timeout(function(){
                   AlertMessagingService.removeMessages();
               }, 3000);
               return response;
           }), function(errorMsg) {
           });
        };

        this.RFAHistoryEndPoint = Restangular.all('RFAHistory');
        this.getRFAHistory = function() {
            return this.RFAHistoryEndPoint.post({trackingNumber: this.trackingNumber}).then(function (response) {
                response = response.plain();
                return response;
            }, function(failure) {
                return $q.reject(failure);
            });
        };

        this.exportGCQISEndPoint = Restangular.all('ExportGcqis');
        this.exportGCQIS = function(params) {
            return this.exportGCQISEndPoint.post(params).then(function (response) {
                //response = response.plain();
                return response;
            }, function(failure) {
                return $q.reject(failure);
            });
        };

        this.getRefreshData = function () {
            this.getRefreshDataEndPoint = Restangular.all('Refresh/' + this.gcqisNo);
            return this.getRefreshDataEndPoint.customGET().then(function (response) {
                response = response.plain();
                return response;
            }, function (err) {
                return $q.reject(err);
            });
        };



    }]);
