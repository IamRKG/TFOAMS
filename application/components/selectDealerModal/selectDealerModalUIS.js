angular.module('TfoamsUiApp.Components')
    .service('SelectDealerModalUIS', ['$modal', function ($modal) {
        this.open = function () {
            var selectDealerInstance = $modal.open({
                templateUrl: './application/components/selectDealerModal/selectDealerModal.html',
                controller: 'SelectDealerModalInstanceUIC as selectDealerModalInstanceCtrl'

            });


            return selectDealerInstance.result.then(function (selectedDealer) {
                return selectedDealer;


            });

        };


    }]);

