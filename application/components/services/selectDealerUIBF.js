'use strict';

angular.module('TfoamsUiApp.Services').
    service('SelectDealerUIBF', ['$q', 'Restangular', function ($q, Restangular) {


        this.isDealerSelected = false;

        this.dealershipDetailEndPoint = Restangular.all('DealerShipDetail');

        this.searchDealer = function(param) {
            return this.dealershipDetailEndPoint.post(param).then( function(response) {
                response = response.plain();
                return response;
            }, function(failure) {
                return $q.reject(failure);
            });
        };



    }]);
