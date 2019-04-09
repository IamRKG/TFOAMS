'use strict';

angular.module('TfoamsUiApp.Services').
    service('EmailSummaryUIBF', ['$q', 'Restangular', function ($q, Restangular) {



        this.emailSummaryEndPoint = Restangular.all('RFAEmailSummary');

        this.emailSummary = function(param) {
            return this.emailSummaryEndPoint.post(param).then( function(response) {
                response = response.plain();
                return response;
            }, function(failure) {
                return $q.reject(failure);
            });
        };



    }]);
