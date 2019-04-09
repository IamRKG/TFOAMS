'use strict';
var LoginPage = function () {
};

LoginPage.prototype = Object.create({}, {
	load: {
		value: function() {
			browser.get('#/homeLogin');			
		}
	},
	isCurrentPage: {
		value:function(){
			browser.wait(function(){			
			 return element(by.tagName('h1')).isPresent();
			},3000);
			return element(by.tagName('h1')).getText().then(function(text){
				return text == 'Login';
			});
		}
	},
	login: {
		value: function(){
			element(by.name('loginId')).click();
			element(by.name('loginId')).sendKeys('karulmo1');
		}
	},
	navigateToHome: {
		value: function() {
			this.login();
			element(by.id('login')).click();
            browser.waitForAngular();
		}		
	}
	
	/*clickUserName: {
		value: function() {
			element(by.id('welcomeTxt')).click();
		}
	},
	requestTable: {
		get:function(){
			return element(by.id('requestTable'));
		}
	},
	requestTableRows: {
		get:function(){
			return this.requestTable.element.all(by.css('tbody tr'));
		}
	},
	goButton: {
		get:function(){
				return element(by.id('goBtn'));
			}
	},
	seeAllBtn : {
			get:function(){
				return element(by.id('seeAllBtn'));
			}
	},
	createRequestBtn : {
			get:function(){
				return element(by.id('createRequestBtn'));
			}
	},
	reportsBtn : {
			get:function(){
				return element(by.id('reportsBtn'));
			}
	},
	userMaintenanceBtn : {
			get:function(){
				return element(by.id('userMaintenanceBtn'));
			}
	}*/
	
});

module.exports = LoginPage;
