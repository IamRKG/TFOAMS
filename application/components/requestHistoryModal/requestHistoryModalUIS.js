angular.module('TfoamsUiApp.Components')
    .service('RequestHistoryModalUIS', ['$modal', 'UpdateRequestUIBF', function ($modal, UpdateRequestUIBF) {
        this.open = function (rfaHistory) {
            var showRequestHistory = $modal.open({
                templateUrl: './application/components/requestHistoryModal/requestHistoryModal.html',
                controller: 'RequestHistoryModalInstanceUIC as requestHistoryModalInstanceCtrl',
                resolve: {
                    RFAHistory: function() {
                        return rfaHistory;
                    }
                }

            });
            return showRequestHistory.result;

        };

        this.getRFAHistoryDetails = function () {
            return UpdateRequestUIBF.getRFAHistory().then(angular.bind(this, function (response) {
                return response;
            }));
        };

    }]);

