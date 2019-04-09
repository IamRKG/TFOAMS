'use strict';

angular.module('TfoamsUiApp.Components')
    .controller('SelectDealerModalInstanceUIC', ['$modalInstance', '_', '$scope', 'SelectDealerUIBF', 'UserUIRM', 'AlertMessagingService', '$timeout',
        function ($modalInstance, _, $scope, SelectDealerUIBF, UserUIRM, AlertMessagingService, $timeout) {


        this.resolve = function () {
            $modalInstance.close();
        };

        this.reject = function () {
            $modalInstance.dismiss();
        };
        AlertMessagingService.setup($scope, this);

        this.validateSearch = function(myForm) {
            this.isFormSubmitted = false;
            if (myForm.paCode.$valid||myForm.dealerName.$valid) {
            }
            else {
                this.isFormSubmitted = true;
            }
        };
        this.searchResults = [];
        this.searchDealer = function (myForm) {
            this.validateSearch(myForm);
            if(!this.isFormSubmitted) {
            var params = {
                userCountry: UserUIRM.userInformation.country,
                subCountry: UserUIRM.userInformation.subCountry,
                dealershipName: this.dealershipName,
                paCode: this.selectedPACode ? this.selectedPACode : ''
            };
            SelectDealerUIBF.searchDealer(params).then(angular.bind(this, function (response) {
                this.searchResults = response.dealerList;
                if (this.searchResults<1) {
                    AlertMessagingService.addMessage('No matching records found.', 'danger', true);
                };
                $timeout(function(){
                    AlertMessagingService.removeMessages();
                }, 3000);
            }));
            }
        };

        /* search results*/
        this.searchResultsTable = this.searchResults;
        this.searchResultsTable.columns = [{
            'mData': 'paCode',
            'aTargets': [0],
            'sWidth': '25%',
            'sDefaultContent': '',
            mRender: function () {
                var dealerPACode = arguments[2].paCode;
                return '<a href="javascript:;" ng-click="selectDealerModalInstanceCtrl.updateDealerDetails($event)">' + dealerPACode + '</a>';
            }
        }, {
            'mData': 'dealershipName',
            'aTargets': [1],
            'sWidth': '25%',
            'sDefaultContent': ''
        }, {
            'mData': 'city',
            'aTargets': [2],
            'sWidth': '25%',
            'sDefaultContent': ''
        }, {
            'mData': 'state',
            'aTargets': [3],
            'sWidth': '25%',
            'sDefaultContent': ''
        }];

        this.searchResultsTable.columnDefs = [{
            'bSortable': false,
            'aTargets': [0, 1, 2, 3]
        }];
        this.searchResultsTable.overrideOptions = {
            'bPaginate': false,
            'bInfo': false
        };


        this.updateDealerDetails = function (event) {
            var target = $(event.target);
            var selectedDealer = _.findWhere(this.searchResults, {paCode: target[0].text});
            $modalInstance.close(selectedDealer);
        };
    }]);