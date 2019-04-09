'use strict';

angular.module('TfoamsUiApp.Components').directive('hourSpent', function () {
  return {
    require: 'ngModel', 
    link: function (scope, elem, attr, ctrl) {
    	
    	//var controller = elem.controller();
 
		//scope.$parent.
    	if(elem.val() <= 0) {
			ctrl.$setValidity('notzero', false);
		} else{
			ctrl.$setValidity('notzero', true);
		}
		
    	
		ctrl.$parsers.unshift(function(value) {
			if(value) {
				if(value > 9999.9 ||  value == "") {
					ctrl.$setValidity('lessthan', false);
				} else{
					ctrl.$setValidity('lessthan', true);
				}
		} else{
			ctrl.$setValidity('lessthan', true);
		}
			return value;
		});
		
		ctrl.$parsers.unshift(function(value) {
			if(value) {
				if(value <= 0) {
					ctrl.$setValidity('notzero', false);
				} else{
					ctrl.$setValidity('notzero', true);
				}
		} else{
			ctrl.$setValidity('notzero', true);
		}
			return value;
		});
    }
   };
 });