angular.module('WebCore.Components')
    .directive('multipleEmails', function () {

        var emailRegul = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z\,]{2,4}$/;

        return {
            require: ['^form', 'ngModel'],
            link: function ($scope, elm, attr, ctls) {
                var $form = ctls.shift(),
                    $model = ctls.shift(),
                    doValidate = function () {
                        if ($model.$viewValue === undefined) {
                            return false;
                        }
                        ;
                        var emailIds = $model.$viewValue;
                        var emailIdsArr = emailIds.split(",");
                        if (emailIds != "") {
                            var emailIdsArr = emailIds.split(",");
                            angular.forEach(emailIdsArr, function (value, key) {
                                if (emailRegul.test(value)) {
                                    $model.$setValidity('EmailId', true);
                                } else {
                                    $model.$setValidity('EmailId', false);
                                }
                            });
                        }
                    };

                $scope.$on('Validations', doValidate);
            }
        };
    });