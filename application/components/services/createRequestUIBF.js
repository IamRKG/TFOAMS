'use strict';

angular.module('TfoamsUiApp.Services').
    service('CreateRequestUIBF', ['$q', 'Restangular', 'UserUIRM', function ($q, Restangular, UserUIRM) {


        this.country = UserUIRM.userInformation.country;
        this.requestSourceTypeEndPoint = Restangular.all('RequestSourceNType/'+this.country);

        this.getRequestSourceType = function (param) {
            return this.requestSourceTypeEndPoint.customGET().then(function (response) {
                response = response.plain();
                return response;
            }, function (err) {
                return $q.reject(err);
            });
        };

        this.geoRegionEndPoint = Restangular.all('GeoRegions/'+this.country);

        this.getGeoRegion = function () {
            return this.geoRegionEndPoint.customGET().then(function (response) {
                response = response.plain();
                return response;
            }, function (err) {
                return $q.reject(err);
            });
        };

    }]);
