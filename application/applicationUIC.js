'use strict';

angular.module('TfoamsUiApp').
    controller('ApplicationUIC', ['$scope', '$state', '$rootScope', '$window', 'userUIBF', 'UserUIRM', function ($scope, $state, $rootScope, $window, userUIBF, UserUIRM) {

        this.version = angular.version;

        this.userInformation = {};
        this.displayHeader = false;

        userUIBF.getUserInformation().then(angular.bind(this, function (response) {
            response.jobRoleRAD = 'RAD';
            this.setCachedUserInfo(response);
            if(response.id=='') {
                this.displayHeader = false;
            }
            else {
                this.displayHeader = true;
            }
            return response;
        }));


        this.setCachedUserInfo = function (user) {
            $window.sessionStorage.user = angular.toJson(user);
            this.userInformation = user;
            UserUIRM.userInformation = user;
            UserUIRM.userInformation.jobRoleRAD;
        };


		userUIBF.getUserInformation().then(angular.bind(this,function(response){
			response.jobRoleRAD = 'RAD';
			response.originalJobRoleRAD = "RAD";
			this.setCachedUserInfo(response);
			return response;
		}));
		

		this.setCachedUserInfo = function(user){
	    	$window.sessionStorage.user = angular.toJson(user);
			this.userInformation=user;
			UserUIRM.userInformation = user;
			UserUIRM.userInformation.jobRoleRAD;
		};
	    

		this.getCachedUserInfo = function() {
			return angular.fromJson($window.sessionStorage.user);
		};
		
		this.setUserRoleCountry = function(role,country){
			var userInfo = this.getCachedUserInfo();
			userInfo.jobRole = role;
			userInfo.country = country;
			this.setCachedUserInfo(userInfo);
		};
		
		this.userInformation = this.getCachedUserInfo();
		UserUIRM.userInformation = this.userInformation;

        this.userInformation = this.getCachedUserInfo();
        UserUIRM.userInformation = this.userInformation;


        $rootScope.$on('$stateChangeStart', function () {
            $('nav .in, nav .open').removeClass('in open');
            $(".panel-collapse").first().addClass("in");
        });


        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            console.log('ERROR ($stateChangeError): ', error);
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

        });


    }]);
