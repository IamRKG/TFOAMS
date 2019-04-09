'use strict';

/*
 * Define booking module
 */
angular.module('TfoamsUiApp.Home', [
    'ngCookies',
    'restangular',
    'ui.router',
    'pascalprecht.translate',
    'WebCore.Components',
    'WebCore.Services',
    'TfoamsUiApp.Components',
    'TfoamsUiApp.Models',
    'ui.bootstrap'
]);


angular.module('TfoamsUiApp.Home')
    .config(['$urlRouterProvider', '$stateProvider',
        function ($urlRouterProvider, $stateProvider) {


            $urlRouterProvider
                //.when('', '/homeLogin')
                .when('', '/home')
                .when('#/searchRequest', '/searchRequest')
                .when('#/userMaintenance', '/userMaintenance')

          

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'application/home/views/home.html',
                    controller: 'HomeUIC',
                    controllerAs: 'homePageCtrl',
                    resolve: {
                        home: ['countryListUIBF', function (countryListUIBF) {
                            return countryListUIBF.getCountryList();
                        }],

                        report: ['$q', 'reportsUIBF', 'UserUIRM', 'userUIBF', function ($q, reportsUIBF, UserUIRM, userUIBF) {
                            //set up the controller to take advantage of the messaging service.
                            //	AlertMessagingService.setup($scope, this);
                            return userUIBF.getUserInformation().then(function (user) {
                                if (user.jobRole != 'SAD'&& user.id!='') {
                                    var param = {
                                        reportType: 'RPM',
                                        cdsId: user.id,
                                        userCountry: user.country,
                                        userRole: user.jobRole
                                    };
                                    return reportsUIBF.getReports(param);
                                } else {
                                    return undefined;
                                }
                            });
                        }],
                        reportPDP: ['reportsUIBF', 'userUIBF', function (reportsUIBF, userUIBF) {
                            return userUIBF.getUserInformation().then(function (user) {
                                if (user.jobRole != 'SAD' && user.jobRole != 'RAD' && user.jobRole != 'NAD' && user.id!='') {
                                    var param = {
                                        reportType: 'OPA',
                                        cdsId: user.id,
                                        userCountry: user.country,
                                        userRole: user.jobRole
                                    };
                                    return reportsUIBF.getReportsPDP(param);
                                } else {
                                    return undefined;
                                }
                            });
                        }]
                    }
                });

            $stateProvider
                .state('searchRequests', {
                    url: '/searchRequest',
                    templateUrl: 'application/searchRequest/views/searchRequests.html',
                    controller: 'SearchRequestsUIC',
                    controllerAs: 'searchRequestsCtrl',
                    resolve: {
                        search: ['UserUIRM', 'searchReqestUIBF', '$q', function (UserUIRM, searchReqestUIBF, $q) {
                            var user = UserUIRM.userInformation;
                            var param = {userCountry: user.country, category: ''};
                            return searchReqestUIBF.getRequestType(param);
                        }]
                    }

                });

            $stateProvider
                .state('userMaintenance', {
                    url: '/userMaintenance',
                    templateUrl: 'application/userMaintenance/views/userMaintenance.html',
                    controller: 'UserMaintenanceUIC',
                    controllerAs: 'userMaintenanceCtrl',
                    resolve: {
                        radRole: ['UserMaintenanceUIBF', 'UserUIRM', function (UserMaintenanceUIBF, UserUIRM) {
                            var user = UserUIRM.userInformation;
                            var param = user.country;
                            return UserMaintenanceUIBF.getRADUserRole(param);
                        }],

                        radTerritory: ['UserMaintenanceUIBF', 'UserUIRM', function (UserMaintenanceUIBF, UserUIRM) {
                            var user = UserUIRM.userInformation;
                            var param = user.country;
                            return UserMaintenanceUIBF.getRADTerritory(param);
                        }],

                        radRegions: ['UserMaintenanceUIBF', 'UserUIRM', function (UserMaintenanceUIBF, UserUIRM) {
                            var user = UserUIRM.userInformation;
                            var param = user.country;
                            return UserMaintenanceUIBF.getRADRegion(param);
                        }],

                        sadTerritory: ['UserMaintenanceUIBF', function (UserMaintenanceUIBF) {
                            return UserMaintenanceUIBF.getSADUserTerritory();
                        }],
                        onExit: ['AlertMessagingService', function (AlertMessagingService) {
                            AlertMessagingService.removeMessages();
                        }]


                    }
                });

            $stateProvider
                .state('createRequest', {
                    url: '/createRequest',
                    templateUrl: 'application/createRequest/views/createRequest.html',
                    controller: 'CreateRequestUIC',
                    controllerAs: 'createRequestCtrl',
                    resolve: {
                        requestSourceType: ['CreateRequestUIBF', function (CreateRequestUIBF) {
                            return CreateRequestUIBF.getRequestSourceType().then(function (response) {
                                return response;
                            });
                        }],

                        RFADetails: ['UpdateRequestUIBF', function (UpdateRequestUIBF) {
                            if (UpdateRequestUIBF.isUpdating) {
                                return UpdateRequestUIBF.configureEndPoint(UpdateRequestUIBF.trackingNumber).then(function (response) {
                                    UpdateRequestUIBF.isUpdating = false;
                                    return response;
                                });
                            }
                            else {
                                if (!UpdateRequestUIBF.RFADetails) {
                                    UpdateRequestUIBF.createRFADetails();
                                };
                                return UpdateRequestUIBF.RFADetails;
                            }
                        }],

                        resolvedGeoRegion: ['CreateRequestUIBF', function (CreateRequestUIBF) {
                            return CreateRequestUIBF.getGeoRegion().then(function (response) {
                                return response;
                            });
                        }],

                        resolvedRootCauseData: ['UpdateRequestUIBF', function (UpdateRequestUIBF) {
                            if (UpdateRequestUIBF.isUpdating) {
                                return UpdateRequestUIBF.getRootCauseData().then(function (response) {
                                    return response;
                                });
                            }
                            else {
                            	 return UpdateRequestUIBF.getRootCauseData().then(function (response) {
                                     return response;
                                 });
                            }
                        }]

                    }

                });

            $stateProvider
                .state('reports', {
                    url: '/reports',
                    templateUrl: 'application/reports/views/reports.html',
                    controller: 'ReportsUIC',
                    controllerAs: 'reportsCtrl',
                    resolve: {
                        reports: ['$q', function ($q) {
                            return $q.when([]);
                        }]
                    }

                })
                .state('reports.reportList', {
                    url: '/reportLists',
                    templateUrl: 'application/reports/views/reportsList.html'
                })
                .state('reports.detailTable', {
                    url: '/:reportType',
                    templateUrl: 'application/reports/views/requestsReportType.html',
                    controller: 'ReportsUIC',
                    controllerAs: 'reportsCtrl',
                    resolve: {
                        reports: ['UserUIRM', '$stateParams', 'reportsUIBF', '$q', 'reportsServices', function (UserUIRM, $stateParams, reportsUIBF, $q, reportsServices) {
                            if ($stateParams.reportType) {
                                var user = UserUIRM.userInformation;
                                var param = {
                                    reportType: $stateParams.reportType,
                                    cdsId: user.id,
                                    userCountry: user.country,
                                    userRole: user.jobRole
                                };
                                return reportsUIBF.getReports(param);
                            } else {

                                return $q.when([]);

                            }
                            ;
                        }],
                        onExit: ['AlertMessagingService', function (AlertMessagingService) {
                            AlertMessagingService.removeMessages();
                        }]
                    }
                });

            $stateProvider
                .state('emailPreferences', {
                    url: '/emailPreferences',
                    templateUrl: 'application/emailPreferences/views/emailPreferences.html',
                    controller: 'EmailPreferencesUIC',
                    controllerAs: 'emailPreferencesCtrl',
                    resolve: {

                        emailPreferences: ['EmailPreferencesUIBF', 'UserUIRM', function (EmailPreferencesUIBF, UserUIRM) {
                            var user = UserUIRM.userInformation;
                            var param = {
                                loginUserCdsId: user.id,
                                loginUserCountry: user.country,
                                loginUserRole: user.jobRole
                            };

                            return EmailPreferencesUIBF.getEmailPreferences(param);

                        }]
                    }
                });

            $stateProvider
                .state('help', {
                    url: '/help',
                    templateUrl: 'application/help/views/help.html',
                    controller: 'HelpUIC',
                    controllerAs: 'helpCtrl'
                })
                .state('help.helpList', {
                    url: '/helpLists',
                    templateUrl: 'application/help/views/helpList.html'
                });

            $stateProvider
                .state('unAuth', {
                    url: '/unAuth',
                    templateUrl: 'application/unAuth/views/unAuth.html',
                    controller: 'UnAuthUIC',
                    controllerAs: 'unAuthCtrl',
                    resolve: {
                        countryList: ['UnAuthUIBF', function (UnAuthUIBF) {
                            return UnAuthUIBF.getCountryList().then(function (response) {
                                return response;
                            });
                        }],
                        resolvedFCSDRegion: ['UnAuthUIBF', function (UnAuthUIBF) {
                            return UnAuthUIBF.getFcsdRegions().then(function (response) {
                                return response;
                            });
                        }]
                    }

                });


        }]);

	
