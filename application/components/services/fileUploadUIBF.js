'use strict';

angular.module('TfoamsUiApp.Services').
    service('FileUploadUIBF', ['$q', 'Restangular', '$http', function ($q, Restangular, $http) {


        this.fileUploadEndPoint = Restangular.all('AttachmentDetail');
        this.fileUpload = function(param) {
            return this.fileUploadEndPoint.post(param).then( function(response) {
                response = response.plain();
                return response;
            }, function(failure) {
                return $q.reject(failure);
            });
        };

        this.getUploadedFiles = function () {
            this.getUploadedFilesEndPoint = Restangular.all('AttachmentDetail/' + this.country + '/' + this.trackingNumber);
            return this.getUploadedFilesEndPoint.customGET().then(function (response) {
                //response = response.plain();
                return response;
            }, function (err) {
                return $q.reject(err);
            });
        };





    }]);
