angular.module('TfoamsUiApp.Components')
    .service('EmailSummaryModalUIS', ['$modal', function ($modal) {
        this.open = function (userAction) {
            var emailSummaryInstance = $modal.open({
                templateUrl: './application/components/emailSummaryModal/emailSummaryModal.html',
                controller: 'EmailSummaryModalInstanceUIC as emailSummaryModalInstanceCtrl'

            });
            this.emailSummaryData = {};
            this.userAction = userAction;
            return emailSummaryInstance;

        };


    }]);

