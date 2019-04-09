var HtmlReporter = require('protractor-html-screenshot-reporter');
var path = require('path');

exports.config = {
	
	allScriptsTimeout: 11000,
	
	specs: [ '../**/*.spec.e2e.js' ],

	capabilities: {
		'browserName' : 'chrome'
	},

	baseUrl: 'http://localhost:11000/TFOAMS_MobileUIWeb/',

	framework: 'jasmine',

	jasmineNodeOpts: {
		defaultTimeoutInterval : 30000,
		includeStackTrace: true
	},
	
	
		            
	onPrepare: function() {	
		
         //set browser size
      browser.manage().window().setSize(320, 568);
		
		require('jasmine-reporters');
		jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter('test_out/e2e', true, true));
	}
};
