/*
'use strict';

 http://docs.angularjs.org/guide/dev_guide.e2e-testing 
var Home = require('../home/home.page.e2e.js');
var UserMaintenance = require('./UserMaintenance.page.e2e.js');

describe('SAD UserMaintenance', function() {
	
	var home = new Home();
	var userMaintenance = new UserMaintenance();
		
		beforeEach(function() {
            home.chooseUserMaintenance();
			
		});

		it('should navigate to User Maintenance Page', function() {		   
		    expect(userMaintenance.isCurrentPage()).toBeTruthy();
		});
		
		it('should allow user to input the form', function() {
			expect(userMaintenance.cdsIDField.isPresent()).toBeTruthy();
			expect(userMaintenance.roleField.isPresent()).toBeTruthy();
			expect(userMaintenance.countryField.isPresent()).toBeTruthy();
			expect(userMaintenance.territoryField.isPresent()).toBeTruthy();
            expect(userMaintenance.selectActionField.isPresent()).toBeTruthy();

		});
		
		it('should navigate to Home page when user chooses Cancel', function() {
			expect(userMaintenance.chooseCancel);
			expect(home.isSADCurrentPage()).toBeTruthy();
		});

        xit('should populate country when the role is chosen', function() {
            userMaintenance.chooseRole();
            expect(userMaintenance.selectedCountry).toBe('USA');
        });

		xit('should display error message when user chooses Delete when CDSID is empty', function() {
			expect(userMaintenance.hasRequiredCDSIDFieldError()).toBeFalsy();
			expect(userMaintenance.chooseDelete);
			expect(userMaintenance.hasRequiredCDSIDFieldError()).toBeTruthy();
			expect(userMaintenance.enterCDSID());
			expect(userMaintenance.chooseDelete);
		});
		
		xit('should populate country according to role user chooses', function() {
			expect(userMaintenance.populateCountryFieldSAD());
			expect(userMaintenance.countryField.isEnabled()).toBeFalsy();
			//var a=element(by.selectedOption('userMaintenanceCtrl.selectedCountry'));
			expect(userMaintenance.countryField.count()).toBe(2);
		});
		

		
		
	

});*/
