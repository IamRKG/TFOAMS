'use strict';

var EmailPreferences = function() {
};

EmailPreferences.prototype = Object.create({}, {
	isCurrentPage : {
		value : function() {
			return element(by.binding('emailPreferences.title')).isPresent();
		}
	},
	getValueN:{  /*TODO:Code review: Change function name*/
		value: function(){
			return element(by.model('emailPreferencesCtrl.emailPreferences.emailCreated')).getAttribute('ng-false-value');
		}
	},
	clickChecbox:{/*TODO:Code review(Optional comment): Advance checkbox selction like select all with index. Refer protractor API*/
		value : function(){
			element(by.model('emailPreferencesCtrl.emailPreferences.emailCreated')).click();
		}
	},
	getValueY:{  /*TODO:Code review: Change function name*/
		value: function(){
			return element(by.model('emailPreferencesCtrl.emailPreferences.emailCreated')).getAttribute('ng-true-value');
		}
	},
	clickSaveChanges:{
		value: function(){
			element(by.id('saveChanges')).click();
		}
	},
	clickCancel:{
		value: function(){
			element(by.id('cancel')).click();
		}
	},
});

module.exports = EmailPreferences;