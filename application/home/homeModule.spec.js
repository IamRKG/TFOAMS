'use strict';
describe('TfoamsUiApp.Home Module', function () {

    //Module
    var TfoamsUiAppModule;

    beforeEach(function () {

        module('TfoamsUiApp.Home');
        module('TfoamsUiApp.Services');

        TfoamsUiAppModule = angular.module('TfoamsUiApp.Home');

    });

    it('should ensure TfoamsUiApp.Home module was registered', function () {
        expect(TfoamsUiAppModule).toBeDefined();
    });

    describe('Configuration:', function () {

        describe('Routes:', function () {
            var $state, $rootScope, $templateCache, UserMaintenanceUIBF, $httpBackend, $q;
            beforeEach(function () {

                inject(function ($injector) {

                    $httpBackend = $injector.get('$httpBackend');
                    $state = $injector.get('$state');
                    $rootScope = $injector.get('$rootScope');
                    $templateCache = $injector.get('$templateCache');
                    $q = $injector.get('$q');
                    UserMaintenanceUIBF = $injector.get('UserMaintenanceUIBF');

                });

                spyOn(UserMaintenanceUIBF, 'getUserMaintDetails');

                $rootScope.$on('$stateChangeError', function () {
                    var error = arguments[5];
                    console.error('$stateChangeError: ', error);
                });

            });

            describe('State [emailPreferences]:', function () {

                beforeEach(function () {

                    $httpBackend.expectPOST('/EmailPref').respond(200);

                    // We need add the template entry into the templateCache if we ever specify a templateUrl
                    $templateCache.put('application/home/views/home.html', '');
                    $templateCache.put('application/login/views/login.html', '');
                    $templateCache.put('application/emailPreferences/views/emailPreferences.html', '');
                });

                it('should ensure a state named emailPreferences was registered', function () {
                    var state = $state.get('emailPreferences');
                    expect(state).not.toBeNull();
                });

                it('should define the URL /emailPreferences', function () {
                    expect($state.href('emailPreferences')).toEqual('#/emailPreferences');
                });

                it('should populate emailPreferences via resolve', function () {

                    var state = $state.get('emailPreferences');

                    $state.go('homeLogin');
                    $rootScope.$digest();

                    $state.go('home');
                    $rootScope.$digest();

                    $state.go('emailPreferences');
                    $rootScope.$digest();

                    expect($state.current).toBe(state);

                });

            });

            describe('State [userMaintenance]:', function () {

                beforeEach(function () {
                    // We need add the template entry into the templateCache if we ever specify a templateUrl
                    $templateCache.put('application/home/views/home.html', '');
                    $templateCache.put('application/userMaintenance/views/userMaintenance.html', '');

                });

                it('should ensure a state named userMaintenance was registered', function () {
                    var state = $state.get('userMaintenance');
                    expect(state).not.toBeNull();
                });

                it('should define the URL /userMaintenance', function () {
                    expect($state.href('userMaintenance')).toEqual('#/userMaintenance');
                });

                it('should return userMaintenance details via resolve', function () {
                    var currentUser;
                    currentUser = {
                        id: 'karulmo1',
                        role: 'SAD'
                    };
                    $httpBackend.expectPOST('/UserMaintenance/details').respond(200);
                    var expectedState = $state.get('userMaintenance');

                    $state.go('home');
                    $rootScope.$digest();
                    $state.go('userMaintenance');
                    $rootScope.$digest();

                    expect($state.current).toBe(expectedState);
                    expect(UserMaintenanceUIBF.getUserMaintDetails).toHaveBeenCalled();
                });

            });

        });


    });

});