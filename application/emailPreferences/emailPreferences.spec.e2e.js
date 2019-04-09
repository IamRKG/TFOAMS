'use strict';

//http://docs.angularjs.org/guide/dev_guide.e2e-testing
var LoginPage= require('../login/login.page.e2e.js');
var HomePage = require('../home/home.page.e2e.js');
var EmailPreferences = require('./emailPreferences.page.e2e.js');

describe('EmailPreferences', function() {
	var loginPage = new LoginPage();
	var homePage = new HomePage();
	var emailPreferences = new EmailPreferences();
	
	beforeEach(function(){
		loginPage.load();
		loginPage.navigateToHome();
		homePage.navigateToEmailPref();
		//browser.sleep(3000);	
		//browser.get('#/emailPreferences');
	});
	
	it('should navigate to Email Preferences Page', function() {		   
	    expect(emailPreferences.isCurrentPage()).toBeTruthy();
	});
	
	it('should change checkbox value', function(){
		expect(emailPreferences.getValueN()).toBe('N');
		emailPreferences.clickChecbox();
		expect(emailPreferences.getValueY()).toBe('Y');
		
	});/*TODO:Per shanikia review comments need to test page flow after web services ready*/
	
	it('should navigate to Home page when user click save changes button',function(){
		emailPreferences.clickSaveChanges();
		expect(homePage.isSADCurrentPage()).toBeTruthy();
	});
	
	it('should navigate to Home page when user click Cancel',function(){
		emailPreferences.clickCancel();
		expect(homePage.isSADCurrentPage()).toBeTruthy();
	});
	
});
