'use strict';

angular.module('TfoamsUiApp.Components')
    .controller('DeleteRequestModalInstanceUIC', ['$modalInstance', function ($modalInstance) {


        this.resolve = function () {
            $modalInstance.close();
        };

        this.reject = function () {
            $modalInstance.dismiss();
        };


    }]);