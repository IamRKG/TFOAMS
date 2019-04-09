'use strict';

angular.module('TfoamsUiApp.Home')
    .controller('UserMaintenanceUIC', ['_', 'DeleteUserModalUIS','$scope', '$state', 'UserMaintenanceUIBF', 'UserUIRM','radRole','radTerritory','radRegions','sadTerritory','AlertMessagingService',
        function(_, DeleteUserModalUIS, $scope, $state, UserMaintenanceUIBF, UserUIRM,radRole,radTerritory,radRegions,sadTerritory, AlertMessagingService) {

			var inputUserDetails = {};
            this.selectedRegion=[];
			 this.initTerritory = function() {
	                this.selectedTerritory=[];
	            };
	            this.initTerritory();
 
          this.user = UserUIRM.userInformation;
          
          this.radRoleList = radRole;
          
          this.radTerritoryList = radTerritory;
          
          this.radRegionsList = radRegions;
          
          this.sadTerritory = sadTerritory;
          
			AlertMessagingService.setup($scope, this);
			
			this.close = function(){
				AlertMessagingService.removeMessages();
			};
			


		this.SADUserRoles = [{'code': "NAD", 'description': "Regional Admin"},{'code': "SAD", 'description': "System Admin"}];

        if (this.user.jobRole == 'SAD') {
        	//this.selectedCountry= this.userMaintenance.countryList[0].code;
			this.loadCountry = function() {
				if(this.selectedRole == null){
								
					this.selectedTerritory=[];
					this.selectedCountry = [];
				}

				else if(this.selectedRole=='NAD'){
                    this.selectedTerritory = [];
                    this.sadTerritoryList=[];
					this.selectedCountry= this.sadTerritory.countryList[0].code;
                    this.sadTerritoryList = this.sadTerritory.territoriesByCountry.USA;
                    for(var i=0; i<this.sadTerritoryList.length; i++) {
                        this.selectedTerritory.push(this.sadTerritoryList[i].code);
                    };
				}
				else {
					this.selectedCountry= 'ALL';
                    var _this = this;
                    _this.selectedTerritory=[];
                    _this.sadTerritoryList=[];
                    angular.forEach(this.sadTerritory.territoriesByCountry, function(country, index) {
                        angular.forEach(country, function(value, index){
                            _this.sadTerritoryList.push(value);
                            _this.selectedTerritory.push(value.code);
                        });
                    });

				};
			

            };

			this.loadTerritory = function() {
                this.selectedTerritory = [];
                this.sadTerritoryList = [];
                this.sadTerritoryList = this.sadTerritory.territoriesByCountry[this.selectedCountry];
                for(var i=0; i<this.sadTerritoryList.length; i++) {
                    this.selectedTerritory.push(this.sadTerritoryList[i].code);
                };

            };


        }



        if (this.user.jobRole == 'NAD' || this.user.jobRole == 'RAD') {
        	this.loadTerritoryRegion = function() {
        		this.selectedTerritory = [];
            	this.selectedRegion = [];
            	if(this.selectedRole==undefined){
            		this.selectedTerritory = [];
                	this.selectedRegion = [];
            	}
            	else if(this.selectedRole =='GUR' || this.selectedRole =='MGR') {
            		for(var i=0; i<this.radRegionsList.regionList.length; i++) {

                        this.selectedRegion.push(this.radRegionsList.regionList[i].code);
                    }
            	}
            	else {
            		for(var i=0	; i<this.radTerritoryList.territoryList.length; i++) {
                        this.selectedTerritory.push(this.radTerritoryList.territoryList[i].code);
                    }
            	}
        	};


        };

        this.searchUser = function(userAction) {
        	if(this.inputCDSId == undefined){
        		$scope.userMaintenance.role.$setValidity('required', true);
        		if(this.user.jobRole == 'SAD'){
	        		$scope.userMaintenance.country.$setValidity('required', true);
	        		$scope.userMaintenance.sadTerritory.$setValidity('required', true);
        		}else{
            		$scope.userMaintenance.radTerritory.$setValidity('required', true);
            		$scope.userMaintenance.region.$setValidity('required', true);
        		}

        		
            	this.validateCSDID();
        	}
        	else {
         		UserMaintenanceUIBF.setUserParams(userAction, this.user.id, this.user.country, this.user.originalJobRole, this.user.jobRole, this.inputCDSId);
         		$scope.userMaintenance.$setPristine();
			return UserMaintenanceUIBF.getInputUserMaintDetails().then(angular.bind(this, function(response){
					inputUserDetails = response;
					   if(inputUserDetails == undefined){
						   this.isFormSubmitted = false;
               				$scope.userMaintenance.$setPristine();
	                    	this.inputCDSId = undefined;
	                     	this.selectedRole= undefined;
	                     	this.selectedTerritory = undefined;
	                     	this.selectedCountry = undefined;
	                    	
	                    }else{
		                    this.selectedCountry=inputUserDetails.selectedCountry;
							this.selectedRole= inputUserDetails.selectedRole;
							this.selectedTerritory=[];
		                    this.sadTerritoryList=[];
		                    this.selectedRegion = [];

                    if(this.selectedRole == 'SAD'){
                    	angular.forEach(this.sadTerritory.territoriesByCountry,angular.bind(this, function(countryObj, CountryIndex){
                         	angular.forEach(countryObj,angular.bind(this,function(value, index){
                         		var sadTerritory =  this.sadTerritoryList.push(value);
                         		var selectedTerritoryObj = _.indexOf(inputUserDetails.selectedTerritory, value.code);
                         		
                         		if(selectedTerritoryObj != -1){
                         			this.selectedTerritory.push(value.code);
                         		}
                       	}));
           			}));
                         		
                         		
                    	
                    }
                    	else if(this.selectedRole =='GUR' || this.selectedRole =='MGR'){
                           	for(var i=0	; i<this.radRegionsList.regionList.length; i++) {
                                var selectedTerritoryObj = _.findWhere(this.radRegionsList.regionList, {code:inputUserDetails.selectedRegion[i]});
                              if(selectedTerritoryObj){
                              	this.selectedRegion.push(selectedTerritoryObj.code);
                              }
                          }

                    }else{
                    	
                    	for(var i=0	; i<this.radTerritoryList.territoryList.length; i++) {
                            var selectedTerritoryObj = _.findWhere(this.radTerritoryList.territoryList, {code:inputUserDetails.selectedTerritory[i]});
                            if(selectedTerritoryObj){
                            	this.selectedTerritory.push(selectedTerritoryObj.code);
                            }
                        }
 
                    }
	                    }
 			}));
        	};
        };
        
        /*Validation*/
        this.validateCSDID = function() {
            this.isFormSubmitted = true;
            if ($scope.userMaintenance.$valid) {


            } else {
                $('#cdsId').focus();
            }

        };

        /*Form Action */
        this.chooseAction = function () {
            this.validateCSDID();
                if(this.selectedAction=='CN'){
                    this.saveUser();
                }
                else if (this.selectedAction == 'UE') {
                	this.saveUser();
                }
                else {
                	if(this.inputCDSId == null){
                    	$scope.userMaintenance.role.$setValidity('required', true);
                		if(this.user.jobRole == "SAD"){
                    		$scope.userMaintenance.country.$setValidity('required', true);	
                    	}else{
                    		return undefined;
                    	}
                    	this.validateCSDID();
                	}else{
                	$scope.userMaintenance.role.$setValidity('required', true);
                    DeleteUserModalUIS.open().then(angular.bind(this,function(){
                    	var params = {userAction:this.selectedAction, inputCdsid:this.inputCDSId, inputRole:this.selectedRole, inputCountry:this.selectedCountry};
                        return UserMaintenanceUIBF.getDeleteInputUserMaintDetails(params).then(angular.bind(this,function(){
                        	this.isFormSubmitted = false;
                			$scope.userMaintenance.$setPristine();
                	        this.inputCDSId = undefined;
                        	this.selectedRole= undefined;
                        	this.selectedTerritory = [];
                        	this.selectedCountry = undefined;
                        	this.selectedRegion = [];
                        }));
                     
                    }));
                	}
                }


             };



            this.saveUser = function() {
            	
            	var territoryANDregion = this.selectedRegion.length == 0 && this.selectedTerritory.length == 0;
            	if(this.inputCDSId == null || this.selectedTerritory == [] ||  this.selectedRegion == [] || territoryANDregion  ||  this.selectedCountry == []){
                	this.validateCSDID();
   
                	 this.customValidationUM();
            		
            	}else{
                UserMaintenanceUIBF.userMaintenance.inputCdsid = this.inputCDSId;
                UserMaintenanceUIBF.userMaintenance.inputRole = this.selectedRole;
                UserMaintenanceUIBF.userMaintenance.inputCountry = this.selectedCountry;
                UserMaintenanceUIBF.userMaintenance.selectedTerritory = this.selectedTerritory;
                UserMaintenanceUIBF.userMaintenance.inputRegion = this.selectedRegion;
                UserMaintenanceUIBF.userMaintenance.loginUserCdsId = this.user.id;
                UserMaintenanceUIBF.userMaintenance.loginUserCountry = this.user.country;
                UserMaintenanceUIBF.userMaintenance.loginUserRole = this.user.jobRole;
                UserMaintenanceUIBF.userMaintenance.loginUserOrgRole = this.user.originalJobRole;
	                if(this.selectedAction == 'CN'){
	                UserMaintenanceUIBF.saveUserMaintenanceDetails().then(angular.bind(this, function(){
	                }));
	            	}
	                else if(this.selectedAction == 'UE'){
		                UserMaintenanceUIBF.updateUserMaintenanceDetails().then(angular.bind(this, function(){
                			this.isFormSubmitted = false;
                			$scope.userMaintenance.$setPristine();
                	        this.inputCDSId = undefined;
                        	this.selectedRole= undefined;
                        	this.selectedTerritory = [];
                        	this.selectedCountry = undefined;
                        	this.selectedRegion = [];
                }));
	                	
	                }
            	}
            };


      this.customValidationUM = function (){
    	
       	$scope.userMaintenance.role.$setValidity('required', false);
    	if(this.user.jobRole == "SAD"){
    		$scope.userMaintenance.sadTerritory.$setValidity('required', false);
    		$scope.userMaintenance.country.$setValidity('required', false);
    		if(this.selectedRole == 'SAD' || this.selectedRole == 'NAD'){
    			$scope.userMaintenance.role.$setValidity('required', true);
        		$scope.userMaintenance.sadTerritory.$setValidity('required', false);
           		$scope.userMaintenance.country.$setValidity('required', true);
    		}else{
    			
    			return undefined;
    			
    		}
    		
    	}else{
    		$scope.userMaintenance.radTerritory.$setValidity('required', false);
    		$scope.userMaintenance.region.$setValidity('required', false);
    		
    		
    		if(this.selectedRole =='GUR' || this.selectedRole =='MGR'){
    			$scope.userMaintenance.role.$setValidity('required', true);
    			$scope.userMaintenance.radTerritory.$setValidity('required', true);
        		$scope.userMaintenance.region.$setValidity('required', false);
    			}
    		else if(this.selectedRole =='FSE' || this.selectedRole =='NAD' ||  this.selectedRole =='OTR' || this.selectedRole =='PDP' || this.selectedRole =='SDP'){
    			$scope.userMaintenance.role.$setValidity('required', true);
    			$scope.userMaintenance.radTerritory.$setValidity('required', false);
        		$scope.userMaintenance.region.$setValidity('required', true);
    			
    		}
    		}
    	  
      };

    }]);
