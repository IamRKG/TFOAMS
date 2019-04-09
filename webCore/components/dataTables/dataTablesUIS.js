'use strict';

angular.module('WebCore.Services')
	.service('DataTablesUIS', ['$q', '$rootScope', function($q, $rootScope) {

		var clickedRowData = {};

		this.setClickedRowData = function(data) {
			clickedRowData = data;
		};

		this.getClickedRowData = function() {
			return $q.when(clickedRowData);
		};

	}]);