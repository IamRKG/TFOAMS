angular.module('WebCore.Components')
	.directive('fileModel', ['$parse', function ($parse) {

		return {
			scope: {
				fileModel: "="
			},     //create a new scope
			link: function (scope, el, attrs) {
				el.bind('change', function (event) {
					var files = event.target.files;
					for (var i=0, f; f=files[i]; i++) {
						var reader = new FileReader();
						reader.onload = (function (f) {
							return function(e) {
								scope.$apply(function () {
									scope.fileModel = {
										lastModified: f.lastModified,
										lastModifiedDate: f.lastModifiedDate,
										attachmentFileName: f.name,
										attachmentFileSize: f.size,
										type: f.type,
										filedata: e.target.result
									};

									scope.$emit("fileSelected", {file: scope.fileModel});

								});
							}
						})(f);
						reader.readAsDataURL(f);
					}
				});
			},
		};

	}]);