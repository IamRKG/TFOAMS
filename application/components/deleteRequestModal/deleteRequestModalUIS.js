angular.module('TfoamsUiApp.Components')
    .service('DeleteRequestModalUIS', ['$modal', 'UpdateRequestUIBF', 'UserUIRM', function ($modal, UpdateRequestUIBF, UserUIRM) {
        this.open = function (rfaDetails) {
            var deleteRequest = $modal.open({
                templateUrl: './application/components/deleteRequestModal/deleteRequestModal.html',
                controller: 'DeleteRequestModalInstanceUIC as deleteRequestModalInstanceCtrl'

            });

            return deleteRequest.result.then(angular.bind(this, function() {
                return UpdateRequestUIBF.deleteRequest(rfaDetails);
            }));

        };


    }]);

