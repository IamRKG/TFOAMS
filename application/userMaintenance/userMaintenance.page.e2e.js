'use strict';


var UserMaintenance = function () {
};

UserMaintenance.prototype = Object.create({}, {
	isCurrentPage: {
		value: function() {
			return element(by.binding('application.navigation.links.userMaintenance')).isPresent();
		}
	},
	cdsIDField: {
		get: function() {
			return element(by.id('cdsId'));
		}
	},
	roleField: {
		get: function() {
			return element(by.id('SAD-roles'));
		}
	},	
	countryField: {
		get: function() {
			return element(by.id('country'));
		}
	},
	territoryField: {
		get: function() {
			return element(by.id('territorySAD'));
		}
	},
    selectActionField: {
        get: function() {
            return element(by.id('select-action'));
        }
    },
    chooseRole: {
        value: function() {
            element(by.name('SAD-roles')).click();
            element(by.cssContainingText('option', 'Regional Admin')).click();
        }
    },
	chooseCancel: {
		get: function() {
			return element(by.id('cancel')).click();
		}
	},
	chooseDelete: {
		get: function() {
            element(by.cssContainingText('option', 'Delete User')).click();
		}
	},
	hasRequiredCDSIDFieldError: {
		value: function() {
			return element(by.id('cdsIdRequired')).isDisplayed();
		}
	},
	enterCDSID: {
		value: function() {
			this.cdsIDField.click();
			this.cdsIDField.sendKeys('karulmo1');
			}
	},
	populateCountryFieldSAD: {
		value: function() {
			this.roleField.click();
			element(by.cssContainingText('option', 'System Admin')).click();
			this.countryField.click();
			}
	},
    selectedCountry: {
        get: function() {
          return element(by.model("userMaintenanceCtrl.selectedCountry"));
        }
    }
			
	
});

module.exports = UserMaintenance;