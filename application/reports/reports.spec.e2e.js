'use strict';

//http://docs.angularjs.org/guide/dev_guide.e2e-testing 
var Reports = require('./reports.page.e2e.js');

describe('Reports', function() {
	
	
	var reports = new Reports();
		
		beforeEach(function() {
			browser.get('#/reports/0/RAM');			
			
		});
		
		it('should display the current page', function() {		   
		    expect(reports.isCurrentPage()).toBeTruthy();
		});

		it('should display report data table', function() {
		    expect(reports.reportTable.isPresent()).toBeTruthy();		
		});
		
		it('should display 20 rows of the request', function() {		   
			expect(reports.reportTableRows.count()).toEqual(20);
		});
		
		it('should display report detail link', function() {
		    expect(reports.reportDetailLink).toBeTruthy();
		});
		
		it('should click on the report table detail link and open modal window', function() {
			reports.clickReportDetailLink();
			expect(reports.reportModal.isPresent()).toBeTruthy();
		});
	
});