'use strict';


var HomePage = function () {
};

HomePage.prototype = Object.create({}, {
    load: {
        value: function() {
            browser.get('#/home');
            return browser.wait(function() {
                return element(by.tagName('h1')).isPresent();
            }, 3000, 'Did not find Home page before timeout');
        }
    },
    
    isSADCurrentPage: {
		value: function() {
			browser.wait(function(){			
			 return element(by.tagName('h1')).isPresent();
			},3000);
			return element(by.tagName('h1')).getText().then(function(text){
				return text == 'Home';
			});
			
		}
	},
    isRADCurrentPage: {
        value: function() {
            browser.wait(function(){
                return element(by.tagName('h2')).isPresent();
            },3000);
            return element(by.tagName('h2')).getText().then(function(text){
                return text == 'My Assigned Requests - High Priority';
            });
        }
    },
	navigateToEmailPref:{
		value: function(){
			element(by.css('.navbar-toggle')).click();
			element(by.css('a[ui-sref="emailPreferences"]')).click();
			
		}
		
	},
	navigateToHelp:{
		value: function(){
			element(by.css('.navbar-toggle')).click();
			element(by.css('a[ui-sref="help.helpList"]')).click();
			
		}
		
	},
	welcomePhraseElement: {
		get: function() {
			return element(by.binding('applicationCtrl.userInformation'));
		}
	},
	userRole: {
		get: function() {
			return element(by.binding('applicationCtrl.userInformation.jobRole'));
		}
	},
	navigateToRAD: {
		value: function(){
			this.chooseRADRegion();
			this.chooseGo();	
			expect(homeRAD.isCurrentPage()).toBeTruthy();
		}
	},
	chooseRADRegion: {
		value: function() {
			element(by.name('changeRADRegion')).click();
			element(by.cssContainingText('option', 'RAD - USA')).click();
		}
	},
	chooseGo: {
		value : function() {
			element(by.id('go')).click();
		}
	},
	hasRequiredRADRegionFieldError: {
		value: function() {
			return element(by.id('RADRegionRequired')).isDisplayed();
		}
	},
    chooseUserMaintenance: {
        value: function() {
            element(by.css('.navbar-toggle')).click();
            element(by.css('a[ui-sref="userMaintenance"]')).click();
        }
    }
	
});

module.exports = HomePage;