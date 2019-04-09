'use strict';

/*
 * Define components module
 */
angular.module('WebCore.Components', []);

jQuery.fn.exists = function () {
    return this.length !== 0;
};

jQuery.fn.outerHTML = function() {
	return jQuery("<div>").append(this.eq(0).clone()).html();
};


