'use strict';

describe('List Booking Page', function() {
	
	describe('', function() {
		beforeEach(function(){
			browser.addMockModule('AppMock', function() {
	            angular.module('AppMock', ['ngMockE2E', 'TfoamsUiApp']).run(function($httpBackend) {
	            	var bookingList = '[{"uuid":"ThisTestBookingUuidIsThirtySixChars.","adventureStartDate":1412613745934,"adventureEndDate":1412613745934,"adventure":{"name":"Adventure1"},"code":"ADV-ThisTestBookingUuidIsThirtySixChars.","customer":{"emailAddress":"testCustomer1@ford.com","firstName":"Fred","lastName":"Flintstone"}}]';
	        		$httpBackend.whenGET('http://wwwdev.agtp843.ford.com/Jab7Web/api/bookings').respond(200, bookingList);
	        		//no need to mock the ping file request - it will not be asked for in this case
	        		$httpBackend.whenGET(/.*/).passThrough();
	            });
	        });
			
			browser.ignoreSynchronization = false;
			browser.get('#/');
		});
		
		afterEach(function() {
			browser.executeScript('window.localStorage.clear();');
		});

		it('should indicate network status of online when a booking list is retrieved', function() {
			var networkStatusIndicator;
			//shortcut notation for element(by.css('div.onlineOffline'));
			networkStatusIndicator = $('div.onlineOffline');
		    expect(networkStatusIndicator.getText()).toEqual('Network is online');
		});
		
		it('should indicate authentication status of authenticated when a booking list is retrieved', function() {
			var authenticationStatusIndicator;
			//shortcut notation for element(by.css('div.authStatus'));
			authenticationStatusIndicator = $('div.authStatus');
		    expect(authenticationStatusIndicator.getText()).toEqual('You are authenticated');
		});
		
		it('should indicate a data source of restangular when a booking list is retrieved', function() {
			var dataSourceIndicator;
			//shortcut notation for element(by.css('div.dataSource'));
			dataSourceIndicator = $('div.dataSource');
		    expect(dataSourceIndicator.getText()).toEqual('Data is coming from restangular');
		});
		
		it('should indicate a data freshness message of the current time when a booking list is retrieved', function() {
			var dataFreshnessIndicator;
			//shortcut notation for element(by.css('div.freshness'));
			dataFreshnessIndicator = $('div.freshness');
		    expect(dataFreshnessIndicator.getText()).toEqual('Last updated at ' + new Date().toLocaleTimeString("en-US", {hour12: false}));
		});
		
		it('should not trigger a redirect to the WSL login screen when the user clicks the authenticated text', function() {
			var authenticationStatusText;
			//shortcut notation for element(by.css('div.authStatus'));
			authenticationStatusText = $('div.authStatus');	
			
			//set protractor to ignore sync, as issues arise when doing a redirect and expecting it to sync back up.
			browser.ignoreSynchronization = true;
			authenticationStatusText.click();
			
			expect(browser.getCurrentUrl()).toContain('localhost:9500/Jab7UI');			 
		});
	});
	
	describe('', function(){
		beforeEach(function(){
			browser.addMockModule('AppMock', function() {
	            angular.module('AppMock', ['ngMockE2E', 'TfoamsUiApp']).run(function($httpBackend) {
	            	var error = 'there was an error.';
	            	$httpBackend.whenGET('http://wwwdev.agtp843.ford.com/Jab7Web/api/bookings').respond(404, error);
	            	$httpBackend.whenGET('http://localhost:9500/ping/index.html').respond(200, '');
	        		$httpBackend.whenGET(/.*/).passThrough();
	            });
	        });
			
			browser.ignoreSynchronization = false;
			browser.get('#/');
		});
		
		afterEach(function() {
			browser.executeScript('window.localStorage.clear();');
		});
		
		it('should indicate network status of online when a booking list is not retrieved and grabbing the ping file succeeds', function() {
			var networkStatusIndicator;
			//shortcut notation for element(by.css('div.onlineOffline'));
			networkStatusIndicator = $('div.onlineOffline');
		    expect(networkStatusIndicator.getText()).toEqual('Network is online');
		});
		
		it('should indicate authentication status of nonAuthenticated when a booking list is not retrieved and grabbing the ping file succeeds', function() {		    
		    var authenticationStatusIndicator;
			//shortcut notation for element(by.css('div.authStatus'));
			authenticationStatusIndicator = $('div.authStatus');
		    expect(authenticationStatusIndicator.getText()).toEqual('You are nonAuthenticated');
		});
		
		it('should indicate a data source of local when a booking list is retrieved', function() {
			var dataSourceIndicator;
			//shortcut notation for element(by.css('div.dataSource'));
			dataSourceIndicator = $('div.dataSource');
		    expect(dataSourceIndicator.getText()).toEqual('Data is coming from local');
		});
		
		it('should indicate a data freshness message of sync not completed when a booking list is retrieved', function() {
			var dataFreshnessIndicator;
			//shortcut notation for element(by.css('div.freshness'));
			dataFreshnessIndicator = $('div.freshness');
		    expect(dataFreshnessIndicator.getText()).toEqual('Sync not completed');
		});
		
		it('should trigger a redirect to the WSL login screen when the user clicks the nonAuthenticated text', function() {
			var authenticationStatusText;
			//shortcut notation for element(by.css('div.authStatus'));
			authenticationStatusText = $('div.authStatus');	
			
			//set protractor to ignore sync, as issues arise when doing a redirect and expecting it to sync back up.
			browser.ignoreSynchronization = true;
			authenticationStatusText.click();
			
			expect(browser.getCurrentUrl()).toContain('https://www.wsl.ford.com/login.cgi');			 
		});
	});
	
	//TODO: network status offline - the app manifest needs some love before we can trigger this situation.
	//since the app currently doesn't get into this case, there is no testing to be done.
	//revisit once the app manifest is working again and test further.
});
