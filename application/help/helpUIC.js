'use strict';
angular.module('TfoamsUiApp.Home')
.controller('HelpUIC',['$scope', '$state', '$stateParams','helpUIBF','AuthorizationUIBF',function($scope, $state, $stateParams, helpUIBF, AuthorizationUIBF){
	
	/*****************Web Services****************/
	/* help List data*/
	this.helpList = [{fileCode: 'GEN',  name: "General User Help"}, {fileCode: 'DSP', name: "Dispatcher Help" },{fileCode: 'NEW', name: "What's New in TFOAMS" }];
	
	this.contactList = [{ id:0, contactType: 'GEN', label:"To request a change to your user profile",  name: "Bryan Jenkins (bjenkin7)"}, { id:1, contactType: 'NEW', label:"To report a system problem",  name: "Bryan Jenkins (bjenkin7)" },{ id:2, contactType: 'ORZ',label:"General Questions", labelOR:" or your local Tech Support Operations Manager",  name: "Bryan Jenkins (bjenkin7)" }];
	
	this.openPDF = function(fileCode){
		var user = $scope.applicationCtrl.userInformation;
		var param = {fileCode:fileCode, userCountry:user.country};
		helpUIBF.getHelp(param).then(angular.bind(this, function(response) {
			this.help = response;
	    	return this.help;
		}));
	};
	
}]);