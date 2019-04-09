'use strict';


var Reports = function () {
};

Reports.prototype = Object.create({}, {
	isCurrentPage: {
		value: function() {
			return element(by.binding('reportsCtrl.reportsListOpen.name')).isPresent();
		}
	},
	reportTable: {
		get:function(){
			return element(by.id('reportTable'));
		}
	},
	reportTableRows: {
		get:function(){
			return this.reportTable.element.all(by.css('tbody tr')); /*Try this test with repeater and to find number row/columns dynamically*/
		}
	},
	
	reportDetailLink: {
		value: function() {
			return element(by.cssContainingText('tbody tr td:last-child','Details')).isPresent();
		}
	},
	
	clickReportDetailLink: {
		value: function() {
			return element(by.css('tbody tr td:last-child')).element(by.linkText('Details')).click();
		}
	},
	reportModal: {
		get: function() {
			return element(by.css('.modal'));
		}
	}
	
	/*TODO:Write test for Tracking #*/
});

module.exports = Reports;