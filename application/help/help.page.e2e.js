'use strict';

var Help = function() {
};

Help.prototype = Object.create({}, {
	isCurrentPage : {
		value : function() {
			return element(by.binding('help.title')).isPresent();
		}
	},
	helpFileList : {
		get: function(){
			return element(by.id('helpList'));
		}
	},
	
	helpFileListCount : {
		get: function(){
			return element.all((by.repeater('help in helpCtrl.helpList')));
		}
	},
	
	clickListPdf: {
		value: function(){
			element(by.css('#helpList a:first-child')).click();
		}
	}
	
});

module.exports = Help;