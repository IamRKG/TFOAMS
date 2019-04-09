'use strict';

angular.module('TfoamsUiApp.Components').directive('checker', function () {
  return {
    require: 'ngModel', 
    link: function (scope, elem, attr, ctrl) {
    	var elemCtrl = elem.controller();
        elem.bind('blur', function () {

        	if(elem.val()){
                 ctrl.$setValidity('required', true);
                 
        	}else{
        		ctrl.$setValidity('required', false);
        		
        	}
        });

    }
   };
 });