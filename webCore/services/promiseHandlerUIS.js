'use strict';

angular.module('WebCore.Services')
	.service('PromiseHandlerService', ['AlertMessagingService', '$translate', function(AlertMessagingService, $translate) {

		this.getResolvedDataOrError = function(resolvedObject, translationKey) {
			var parsedObject = {};
			
			if(resolvedObject.error) {
				this.addTranslatedMessage('danger', translationKey, {error: resolvedObject.error});
			} else {		
				parsedObject = resolvedObject;
			}
			
			return parsedObject;
		};
		
		this.getDataOrErrorPromise = function(promise) {
			return promise.then(function(data){
				return data;
			},function(err){
				return {error: err};
			});
		};
		
		this.addTranslatedMessage = function(type, translationKey, resolvedObject) {
			if(resolvedObject === undefined) resolvedObject = {};
			
			return $translate(translationKey, resolvedObject).then(function(data){
				AlertMessagingService.addMessage(data, type, true, true);
			}, function(err){
				AlertMessagingService.addMessage(err, 'danger', true, true);
			});			
		};
	}]);
