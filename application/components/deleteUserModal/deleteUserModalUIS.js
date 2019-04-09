angular.module('TfoamsUiApp.Components')
	.service('DeleteUserModalUIS', ['$modal',function($modal) {
        this.open = function() {
            var deleteModalInstance = $modal.open({
                templateUrl: './application/components/deleteUserModal/deleteUserModal.html',
                controller: 'DeleteUserModalInstanceUIC as deleteUserModalInstanceCtrl'
 
            });

            return deleteModalInstance.result;
            
        };
	}]);

