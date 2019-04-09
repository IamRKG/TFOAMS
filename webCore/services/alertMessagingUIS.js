'use strict';

angular.module('WebCore.Services')
	.service('AlertMessagingService', ['_', function(_) { //the function here is what is called when the service is created
		
	/*
		AlertMessagingService.js
		
		This will be accomplished by using an array that contains objects for each of the alert types (success, info, warning, danger).
		It can be accessed by any controller which injects this service. The arrays will hold objects, each of which will have 3 properties:
			msg: the message to log/display
			type: the message type to use
			visible: whether or not to include the message on the screen
		
		Messages can then be added to views by using the ui.bootstrap <alert> directive, using ng-repeat to iterate through the array.
		Items can be omitted from the view by taking advantage of the 'visible' property.
		
		Various helper and getter/setter functions are also provided, to help developers utilize this service in an object-oriented way.
	*/
		
	this._messages = [];
	
	//setup calls to make things work in the controllers without needing to duplicate code
	//create our own variables on the controller scope to show in the view, and add a watch to the message array in the service to update them
	this.setup = function(ctrlScope, ctrlThis) {
		//set up messaging arrays
		ctrlThis.onlyVisibleMessages = [];
		ctrlThis.allMessages = [];
		
		//add watch for messages array in messaging service, to keep this scope in sync with the service 'scope'
		ctrlScope.$watchCollection(angular.bind(this, function(){
				return this._messages;
			}) , angular.bind(this, function(newVal, oldVal){
				ctrlThis.onlyVisibleMessages = this.getMessages(true);
				ctrlThis.allMessages = this.getMessages(false);
		}));
	};
	
	//function used to add a new message
	this.addMessage = function(msg, type, visible, multiple, persist) {
		var messageObj = {
			'msg': msg,
			'type': type,
			'visible': visible
		};
		
		if(persist === undefined) {
			messageObj.persist = false;
		} else {
			messageObj.persist = persist;
		}
		
		//if multiple == false, don't add a duplicate
		if(!multiple) {
			var yesNo = false;
			//check to see if we already put in a message. If we haven't, do it.
			for(var i=0; i<this._messages.length; i++) {
				if(this._messages[i].msg.indexOf(msg) > -1) {
					yesNo = true;
					break;
				}
			}
			if(!yesNo) {
				this._messages.push(messageObj);
			}
		}
		else {
			this._messages.push(messageObj);
		}
		
	};
	
	//function used to get messages by type. Will return the messages of the appropriate type given the type that's passed in.
	//An optional 'onlyVisible' parameter specifies whether only visible messages should be returned. 
	// false will return all messages and true will narrow results to only those that are marked visible.
	this.getMessagesByType = function(type, onlyVisible) {
		var workingArr = [];
		
		for(var i=0; i<this._messages.length; i++){
			//get only the proper type
			if(this._messages[i].type == type){
				//evaluate visible/non-visible based on passed in 'onlyVisible' param
				if(this._messages[i].visible || !onlyVisible) {
					workingArr.push(this._messages[i]);
				}
			}
		};
		
		return workingArr;
	};
	
	//function used to get all messages. An optional 'onlyVisible' parameter specifies whether only visible messages should be returned. 
	//false will return all messages and true will narrow results to only those that are marked visible.
	this.getMessages = function(onlyVisible) {
		var workingArr = [];
		
		for(var i=0; i<this._messages.length; i++){
			//evaluate visible/non-visible based on passed in 'onlyVisible' param
			if(this._messages[i].visible || !onlyVisible) {
				workingArr.push(this._messages[i]);
			}
		};
		
		return workingArr;
	};
	
	//removes the message from the console with the given matching string.
	this.removeMessage = function(msg) {
		for(var i=0; i<this._messages.length; i++) {
			if(this._messages[i].msg.indexOf('Errors found on this page') > -1) {
				this._messages.splice(i, 1);
			}
		}
	};
	
	this.removeMessages = function() {
		this._messages = _.where(this._messages, {'persist': true});
	};
}]);
