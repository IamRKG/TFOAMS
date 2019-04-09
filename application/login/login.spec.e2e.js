'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

var LoginPage= require('./login.page.e2e.js');
var HomePage= require('../home/home.page.e2e.js');

describe('Login page', function() {

	var loginPage = new LoginPage();
	var homePage = new HomePage();

		beforeEach(function() {			
			loginPage.load();
		});

		it('should display current page', function() {		   
			expect(loginPage.isCurrentPage()).toBeTruthy();
		});
	
		it('should login and navigate to home page', function() {
			expect(loginPage.navigateToHome());
			expect(homePage.isSADCurrentPage()).toBeTruthy();
		});
		
});
