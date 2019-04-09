'use strict';

angular.module('TfoamsUiApp.Components')
    .controller('RequestHistoryModalInstanceUIC', ['$modalInstance', '_', 'RequestHistoryModalUIS', 'RFAHistory', function ($modalInstance, _, RequestHistoryModalUIS, RFAHistory) {


        this.resolve = function () {
            $modalInstance.close();
        };

        this.reject = function () {
            $modalInstance.dismiss();
        };

        this.trackingNumber = RequestHistoryModalUIS.trackingNumber;
        this.rfaStatusDescription = RequestHistoryModalUIS.rfaStatusDescription;
        this.currentAssignee = RequestHistoryModalUIS.currentAssignee;

        this.RFAHistoryDetails = RFAHistory;

        /* search results*/
        this.RFAHistoryTable = this.RFAHistoryDetails.historyList;
        this.RFAHistoryTable.columns = [{
            'mData': 'cdsID',
            'aTargets': [0],
            'sWidth': '25%',
            'sDefaultContent': ''
        }, {
            'mData': 'lastUpdatedDateAndTime',
            'aTargets': [1],
            'sWidth': '50%',
            'sDefaultContent': ''
        }, {
            'mData': 'actionCode',
            'aTargets': [2],
            'sWidth': '25%',
            'sDefaultContent': ''
        }];
        this.RFAHistoryTable.overrideOptions = {
            'bPaginate': false,
            'bInfo':false,
            "bSort": false
        };
        this.RFAHistoryTable.columnDefs = [{
            'bSortable': false,
            'aTargets': [0, 1, 2]
        }];

    }]);