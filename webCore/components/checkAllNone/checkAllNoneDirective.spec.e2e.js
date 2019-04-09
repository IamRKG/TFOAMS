'use strict';

var ListBookingPage = require('../../../application/booking/listBooking/listBooking.page.e2e.js');

describe('checkAllNoneDirective', function() {

	var page;

	beforeEach(function() {
		page = new ListBookingPage();
		page.load();
		// Ensure that we are acting as agent
		page.selectUserRoleAgent();
		expect(page.userRole()).toEqual('Booking Agent');
	});

	it('should create links for selecting all items or no items in a targeted datatable', function() {
		expect(page.checkAll.getText()).toEqual('Select All');
		expect(page.checkNone.getText()).toEqual('Select None');
	});

	it('should check all checkboxes in the targeted datatabled on click of the "Check All" link', function() {
		// Ensure that each checkbox is NOT checked at this point
		expect(page.allCheckboxesSelected()).toBeFalsy();

		page.checkAll.click();

		// Ensure that each checkbox is checked
		expect(page.allCheckboxesSelected()).toBeTruthy();
	});

	it('should un-check all checkboxes in the targeted datatable on click of the "Check None" link', function() {
		page.checkAll.click();

		// Ensure that each checkbox is checked at this point
		expect(page.allCheckboxesSelected()).toBeTruthy();

		page.checkNone.click();

		// Ensure that each checkbox is NOT checked
		expect(page.allCheckboxesSelected()).toBeFalsy();
	});

	it('should only un-check checkboxes on current table page on click of the "Check None" link', function() {
		// Check boxes on page 1
		page.checkAll.click();

		// Navigate to page 2
		page.nextPageLink.click();

		// Check boxes on page 2
		page.checkAll.click();

		// Navigate to page 1
		page.previousPageLink.click();

		// Uncheck boxes on page 1
		page.checkNone.click();

		// Navigate to page 2
		page.nextPageLink.click();

		// Verify checkboxes on page 2 are still checked
		expect(page.allCheckboxesSelected()).toBeTruthy();
	});
});