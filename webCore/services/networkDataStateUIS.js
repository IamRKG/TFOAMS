'use strict';

angular.module('WebCore.Services').
	service('NetworkDataStateService', ['Constants', 'AlertMessagingService', '$translate', '$http', '$window', function(Constants, AlertMessagingService, $translate, $http, $window) {
		
		//give initial values for the expected states
		var _authenticationState = 'authenticated'; //can also be 'nonAuthenticated'
		var _networkState = 'online'; //can also be 'offline'
		var _dataState = 'restangular'; //can also be 'local'
		var _saveNeeded = false;
		var _dataFreshness = 'Sync not completed'; //will be updated by UIS when a call to 'fresh' data has happened. Will contain the time for when it happened
		var _workOffline = true;
		var _currentAngularScope;
		
		//function to call after a data service completes/fails a request. Updates state variables as necessary based on the result
		this.stateCheck = function(dataSource, successful, err) {
			//case for an online request
			if(dataSource == 'restangular') {
				//if it worked, no need to update states. Only update the freshness message
				if(successful) {
					var successTime = new Date();
					this.setDataFreshness('Last updated at ' + successTime.toLocaleTimeString("en-US", {hour12: false}));
				}
				//else it was a failure
				else {
					//failure also could mean internal server error, so in that case don't re-evaluate network state
					if(err.status != 500) {
						this.evaluateNetworkState('onRestError');
					}
				}
			}
		};
		
		//function to trigger a redirect to the WSL login page
		this.doWslRedirect = function() {
			//if we are now nonAuthenticated, we should have the user re-authenticate
			//this function should only be able to be called when nonAuthenticated, but including this check for sanity.
			if(this.getAuthenticationState() == 'nonAuthenticated') {
				//create the redirect url with the current screen's url and then redirect the user.
				var wslUrl = _generateWslUrl($window.location.href);
				this.performRedirect(wslUrl);
			}
		};
		
		this.performRedirect = function(newUrl) {
			$window.location.href = newUrl;
		};
		
		var _generateWslUrl = function(currentLocation) {
			return Constants.wslBaseUrl + encodeURIComponent(currentLocation);
		};
		
		this.evaluateNetworkState = function(state) {
			//skip on initial startup, as our assumptions don't apply in quite the same way as in an error case
			if(state != 'initial') {
				this.verifyNetworkConnectivity();
			}
		};
		
		this.verifyNetworkConnectivity = function() {
			$http({method: 'GET', url: 'ping/index.html'})
			  .success(angular.bind(this, function(data, status, headers, config) {
				  	//if this works, your network connection is good.
					this.setNetworkState('online');
					
					//in our error case that triggers this, this means the authentication is the problem
					var authState = this.getAuthenticationState();
					if(authState == 'authenticated') {
						this.setAuthenticationState('nonAuthenticated');
						
						//inform the user of authentication problems. As the message says, the app goes into local mode at this point.
						$translate('application.wslError').then(angular.bind(this, function(data){
							AlertMessagingService.addMessage(data, 'danger', true, false);
						}), angular.bind(this, function(err){
							AlertMessagingService.addMessage(err, 'danger', true, false);
						}));
						this.setDataState('local');
					}
			  }))
			 .error(angular.bind(this, function(data, status, headers, config) {
					//if we fail, we know we are offline. We could still be authenticated in this case, so the authentication state stays the same as previous
					this.setNetworkState('offline');
			  }));
		};
		
		var _isOnlineAndNotAuthenticated = angular.bind(this,function() {
			return (this.getNetworkState() == 'online' && this.getAuthenticationState() == 'nonAuthenticated');
		});
		
		var _isForcedToWorkOffline = angular.bind(this,function() {
			return (this.getNetworkState() == 'offline' || _isOnlineAndNotAuthenticated());
		});
		
		this.evaluateDataState = function() {
			this.setDataState('restangular');
			
			if(this.getWorkOffline() && _isForcedToWorkOffline()) {
				this.setDataState(Constants.local);
			}
		};
		
		this.setNetworkState = function(state) {
			_networkState = state;
		};
		
		this.getNetworkState = function() {
			return _networkState;
		};
		
		this.setDataFreshness = function(message) {
			_dataFreshness = message;
		};
		
		this.getDataFreshness = function() {
			return _dataFreshness;
		};
		
		this.setWorkOffline = function(val) {
			_workOffline = val;
		};
		
		this.getWorkOffline = function() {
			return _workOffline;
		};	
		
		this.setAuthenticationState = function(state) {
			_authenticationState = state;
		};
		
		this.getAuthenticationState = function() {			
			return _authenticationState;
		};		
		
		this.setDataState = function(state) {
			_dataState = state;
		};	
		
		this.getDataState = function() {
			return _dataState;
		};	
		
		this.saveNeeded = function(value) {
			_saveNeeded = value;
		};
		
		this.isSaveNeeded = function() {
			return _saveNeeded;
		};
		
		this.setCurrentAngularScope = function(scope) {
			_currentAngularScope = scope;
		};
		
		this.getCurrentAngularScope = function() {
			return _currentAngularScope;
		};
}]);
