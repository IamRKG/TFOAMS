angular.module('WebCore.Components')
	.factory('DateRangePicker', ['$rootScope', function($rootScope) {
		function DateRangePicker(startDate, endDate, minDate, maxDate) {

			this.isStartDateOpen = false;
			this.isEndDateOpen = false;

			this.load(startDate, endDate, minDate, maxDate);

			$rootScope.$watch(angular.bind(this, function() {
				return this.startDate;
			}), angular.bind(this, function(newValue) {
				this.minEndDate = newValue ? newValue : this.minDate;
			}));

			$rootScope.$watch(angular.bind(this, function() {
				return this.endDate;
			}), angular.bind(this, function(newValue) {
				this.maxStartDate = newValue ? newValue : this.maxDate;
			}));
		}

		DateRangePicker.prototype.load = function(startDate, endDate, minDate, maxDate) {
			this.startDate = startDate || null; //The day the start datepicker defaults to
			this.endDate = endDate || null; //The day the end datepicker defaults to

			this.minDate = minDate || null; //The minimum day the start datepicker can have
			this.maxDate = maxDate || null; //The maximum day the end datepicker can have

			this.minStartDate = this.minDate;
			this.maxStartDate = this.endDate ? this.endDate : this.maxDate; //TODO: verify endDate <= maxDate

			this.minEndDate = this.startDate ? this.startDate : this.minDate; //TODO: verify startDate >= minDate
			this.maxEndDate = this.maxDate;
		};

		DateRangePicker.prototype.openStartDate = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			if (this.isStartDateOpen === true) {
				this.isStartDateOpen = false;
			} else {
				this.isStartDateOpen = true;
				this.isEndDateOpen = false;
			}
		};

		DateRangePicker.prototype.openEndDate = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			if (this.isEndDateOpen === true) {
				this.isEndDateOpen = false;
			} else {
				this.isEndDateOpen = true;
				this.isStartDateOpen = false;
			}
		};

		return DateRangePicker;
	}]);