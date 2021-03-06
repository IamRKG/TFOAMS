'use strict';

describe('WebCore.Components DateRangePicker:', function() {

	//Dependencies
	var DateRangePicker, $rootScope, $event;

	beforeEach(function() {
		module('WebCore.Components');

		inject(function($injector) {
			DateRangePicker = $injector.get('DateRangePicker');
			$rootScope = $injector.get('$rootScope');
		});

		$event = {
			preventDefault: function() {},
			stopPropagation: function() {}
		};
	});

	it('should set a minEndDate based on the startDate changing', function() {
		var originalMinDate = new Date('10-14-2014');
		var dateRangePicker = new DateRangePicker(null, null, originalMinDate);

		$rootScope.$apply();

		expect(dateRangePicker.minEndDate).toEqual(originalMinDate);

		dateRangePicker.startDate = new Date('10-15-2014');

		$rootScope.$apply();

		expect(dateRangePicker.minEndDate).toEqual(dateRangePicker.startDate);
	});

	it('should set a maxStartDate based on the endDate changing', function() {
		var originalMaxDate = new Date('10-21-2014');
		var dateRangePicker = new DateRangePicker(null, null, null, originalMaxDate);

		$rootScope.$apply();

		expect(dateRangePicker.maxStartDate).toEqual(originalMaxDate);

		dateRangePicker.endDate = new Date('10-20-2014');

		$rootScope.$apply();

		expect(dateRangePicker.maxStartDate).toEqual(dateRangePicker.endDate);
	});

	it('should set a maxStartDate based on the endDate', function() {
		var originalEndDate = new Date('10-14-2014');
		var dateRangePicker = new DateRangePicker(null, originalEndDate);

		expect(dateRangePicker.maxStartDate).toEqual(originalEndDate);
	});

	it('should set a minEndDate based on the startDate', function() {
		var originalStartDate = new Date('10-14-2014');
		var dateRangePicker = new DateRangePicker(originalStartDate);

		expect(dateRangePicker.minEndDate).toEqual(originalStartDate);
	});

	it('should close the startDate window if it is already open', function() {
		var dateRangePicker = new DateRangePicker();
		dateRangePicker.isStartDateOpen = true;

		dateRangePicker.openStartDate($event);

		expect(dateRangePicker.isStartDateOpen).toBeFalsy();
	});

	it('should open the startDate window if it is closed and close the endDate window', function() {
		var dateRangePicker = new DateRangePicker();
		dateRangePicker.isStartDateOpen = false;
		dateRangePicker.isEndDateOpen = true;

		dateRangePicker.openStartDate($event);

		expect(dateRangePicker.isStartDateOpen).toBeTruthy();
		expect(dateRangePicker.isEndDateOpen).toBeFalsy();
	});

	it('should close the endDate window if it is already open', function() {
		var dateRangePicker = new DateRangePicker();
		dateRangePicker.isEndDateOpen = true;

		dateRangePicker.openEndDate($event);

		expect(dateRangePicker.isEndDateOpen).toBeFalsy();
	});

	it('should open the endDate window if it is closed and close the startDate window', function() {
		var dateRangePicker = new DateRangePicker();
		dateRangePicker.isEndDateOpen = false;
		dateRangePicker.isStartDateOpen = true;

		dateRangePicker.openEndDate($event);

		expect(dateRangePicker.isEndDateOpen).toBeTruthy();
		expect(dateRangePicker.isStartDateOpen).toBeFalsy();
	});
});