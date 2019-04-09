'use strict';

angular.module('TfoamsUiApp.Home')
	.controller('UnAuthUIC', ['$scope', 'countryList', 'resolvedFCSDRegion', 'UnAuthUIBF', 'AlertMessagingService', function($scope, countryList, resolvedFCSDRegion, UnAuthUIBF, AlertMessagingService) {

		this.isFormSubmitted = false;

		AlertMessagingService.setup($scope, this);
		this.close = function () {
			AlertMessagingService.removeMessages();
		};

		this.countryList = countryList.countryList;
		this.fcsdRegion = resolvedFCSDRegion.regionList;

		this.selectedCountry = 'USA';

		this.loadRegion = function() {
			this.selectedRegion = [];
			UnAuthUIBF.country = this.selectedCountry;
			return UnAuthUIBF.getFcsdRegions().then(angular.bind(this,function (response) {
				this.fcsdRegion = response.regionList;
			}));
		};

		this.submit = function() {
			this.isFormSubmitted = true;
				var params = {
				name: this.name,
				cdsid: this.cdsid,
				country: this.selectedCountry,
				regions: this.selectedRegion,
				reason: this.businessReason
			};
			return UnAuthUIBF.sendEmail(params).then(angular.bind(this, function(response){
				AlertMessagingService.addMessage(response, 'success', true);
				return response;
			}));
		}

	}]);
