//http://docs.angularjs.org/guide/dev_guide.e2e-testing
var LoginPage= require('../login/login.page.e2e.js');
var HomePage = require('../home/home.page.e2e.js');
var Help = require('./help.page.e2e.js');

describe('Help', function() {
	var loginPage = new LoginPage();
	var homePage = new HomePage();
	var help = new Help();
	
	beforeEach(function(){
		loginPage.load();
		loginPage.navigateToHome();
		homePage.navigateToHelp();
		browser.sleep(3000);	
		browser.get('#/help/helpLists');
	});
	
	it('should navigate to Email Preferences Page', function() {		   
	    expect(help.isCurrentPage()).toBeTruthy();
	});
	
	it('should display help file list',function(){
		expect(help.helpFileList.isPresent()).toBeTruthy();
	});
	
	it('should display 3 list of the help', function() {		   
		expect(help.helpFileListCount.count()).toEqual(3);
	});
	
	it('should open to pdf file when user click help list link',function(){
		help.clickListPdf();
		expect(false).toBeTruthy();/*TODO: Need R&D for test open in new window*/
		
	});

	
});