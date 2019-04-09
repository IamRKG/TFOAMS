'use strict';

angular.module('TfoamsUiApp.Components')
	.controller('DeleteUserModalInstanceUIC', function ($modalInstance) {

	this.resolve = function () {
		$modalInstance.close();
	};

	this.reject = function () {
		$modalInstance.dismiss();
	};
});