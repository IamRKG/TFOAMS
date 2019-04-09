'use strict';

angular.module('TfoamsUiApp.Components').directive('vinNumber', function () {
  return {
    require: 'ngModel', 
    link: function (scope, elem, attr, ctrl) {
 
		ctrl.$parsers.unshift(function(value) {
			if(value) {
				if(value.length >= 17 || value == 'N/A' || value == 'n/a' || value == 'N/a' || value == 'n/A' || value == undefined) {
					ctrl.$setValidity('max', true);
				} else{
					ctrl.$setValidity('max', false);
				}
		} else{
			ctrl.$setValidity('max', true);
		}

			return value;
		});
    }
   };
 });