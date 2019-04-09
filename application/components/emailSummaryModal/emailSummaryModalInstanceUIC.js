'use strict';

angular.module('TfoamsUiApp.Components')
    .controller('EmailSummaryModalInstanceUIC', ['$modalInstance', 'UserUIRM', 'EmailSummaryUIBF', 'UpdateRequestUIBF', 'EmailSummaryModalUIS', 'AlertMessagingService', '$timeout', '$scope',
        function ($modalInstance, UserUIRM, EmailSummaryUIBF, UpdateRequestUIBF, EmailSummaryModalUIS, AlertMessagingService, $timeout, $scope) {


            this.resolve = function () {
                $modalInstance.close();
            };

            this.reject = function () {
                $modalInstance.dismiss();
            };


            this.validateEmailForm = function (myForm) {
                this.isFormSubmitted = false;
                $scope.$broadcast('Validations');
                if (myForm.$valid) {
                }
                else {
                    this.isFormSubmitted = true;
                }
            };

            this.userAction = EmailSummaryModalUIS.userAction;
            this.requestTypeDescription = EmailSummaryModalUIS.requestTypeDescription;
            this.dealerName = EmailSummaryModalUIS.dealerName;
            if (this.userAction == 'emailSummary') {
                this.emailSubject = EmailSummaryModalUIS.trackingNumber + ' ' + this.requestTypeDescription + " Support Request at " + this.dealerName;
            }
            else {
                this.emailSubject = EmailSummaryModalUIS.trackingNumber + " Technical Assistance Contact Report For " + this.dealerName;
                this.emailComments = "The following is a Technical Assistance Contact Report for a Repair Assistance request handled through the Technical Field Operations Assignment Management System";
            };

            this.emailSummary = function (myForm) {
                this.validateEmailForm(myForm);
                if (!this.isFormSubmitted) {
                    var params = {
                        userCountry: UserUIRM.userInformation.country,
                        trackingNumber: EmailSummaryModalUIS.trackingNumber,
                        emailTo: this.emailTo,
                        emailCc: this.emailCc,
                        emailSubject: this.emailSubject,
                        emailComments: this.emailComments,
                        actionName: this.userAction
                    };
                    EmailSummaryUIBF.emailSummary(params).then(angular.bind(this, function (response) {
                        EmailSummaryModalUIS.emailSummaryData = response;
                        AlertMessagingService.addMessage('Email has been sent successfully', 'success', true);
                        $timeout(function () {
                            AlertMessagingService.removeMessages();
                        }, 7000);
                    }));

                    this.reject();
                }
            };

            this.sendContact = function (myForm) {
                this.validateEmailForm(myForm);
                if (!this.isFormSubmitted) {
                    var params = {
                        userCountry: UserUIRM.userInformation.country,
                        trackingNumber: UpdateRequestUIBF.trackingNumber,
                        emailTo: this.emailTo,
                        emailCc: this.emailCc,
                        emailSubject: this.emailSubject,
                        emailComments: this.emailComments,
                        actionName: '’sendcontact’'
                    };
                    EmailSummaryUIBF.emailSummary(params).then(angular.bind(this, function (response) {
                        this.sendContactData = response;
                    }));
                    this.reject();
                }
            };
        }]);