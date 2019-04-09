'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Template Page, Header and Footer', function() {

	describe('Header', function() {
	
		beforeEach(function() {
			browser.get('#/');
		});

		it('should have a populate welcome message', function() {
		    var welcomePhraseElement = element(by.binding('applicationCtrl.userInformation'));
		    expect(welcomePhraseElement.getText()).toEqual('Welcome Test User (tuser1)');
		});

	});

});
