'use strict';

// http://docs.angularjs.org/guide/dev_guide.e2e-testing
var LoginPage= require('../login/login.page.e2e.js');
var HomePage = require('./home.page.e2e.js');

describe('Home page', function() {

    var loginPage = new LoginPage();
    var homePage = new HomePage();

		beforeEach(function() {
            loginPage.load();
            loginPage.navigateToHome();
            homePage.load();
		});
	
		it('should display the current page', function() {		   
		    expect(homePage.isSADCurrentPage()).toBeTruthy();
		});
		
		it('should have a populate welcome message', function() {
		    expect(homePage.welcomePhraseElement.getText()).toEqual('Welcome (karulmo1)');
		});
		
		it('should display the logged in user role', function() {
			expect(homePage.userRole.getText()).toEqual('SAD, ALL');
		});
				
		xit('should display error message when user chooses go without selecting the RAD Region', function() {
			expect(homePage.hasRequiredRADRegionFieldError()).toBeFalsy();
            homePage.chooseGo();
			expect(homePage.hasRequiredRADRegionFieldError()).toBeTruthy();
		});
		
		it('should navigate to RAD Home page when user chooses RAD Region and go ', function() {
            homePage.chooseRADRegion();
            homePage.chooseGo();
			expect(homePage.isRADCurrentPage()).toBeTruthy();
		});
		


	

});