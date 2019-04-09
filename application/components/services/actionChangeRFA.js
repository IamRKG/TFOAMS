   'use strict';

   angular.module('TfoamsUiApp.Services').
   	service('actionChangeRFA', ['$q',function($q){
        this.draftStatusAll = function(){
            this.draftStatus = {
         		   allStatus : this.RFADetails.rfaStatusDescription =='Draft' || this.RFADetails.rfaStatusDescription =='Submitted' ||
                    this.RFADetails.rfaStatusDescription =='Assigned' ||
                    this.RFADetails.rfaStatusDescription =='Closed' && this.userInformation.jobRole=='NAD' ||
                    this.RFADetails.rfaStatusDescription =='Closed' && this.userInformation.jobRole=='PDP' ||
                    this.RFADetails.rfaStatusDescription =='Closed' && this.userInformation.jobRole=='SDP' ||
                    this.RFADetails.rfaStatusDescription =='Deleted' && this.userInformation.jobRole=='NAD' ||
                    this.RFADetails.rfaStatusDescription =='Deleted' && this.userInformation.jobRole=='PDP' ||
                    this.RFADetails.rfaStatusDescription =='Deleted' && this.userInformation.jobRole=='SDP'
            };
            };
   		
   	}]);