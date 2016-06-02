var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var MainController = (function (_super) {
        __extends(MainController, _super);
        function MainController($scope, $location, $log, $uibModal, mainService, assessmentService, notificationService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
                $scope.currentNotification = {
                    NotificationText: "",
                    Success: false,
                    Error: false,
                    Active: false
                };
                $scope.$watch(function () { return mainService.pageTitle; }, function (newValue, oldValue) {
                    $scope.pageTitle = newValue;
                });
                $scope.$watch(function () { return mainService.pageTypeTitle; }, function (newValue, oldValue) {
                    $scope.pageTypeTitle = newValue;
                });
                $scope.$watch(function () { return mainService.inAssessmentManagement; }, function (newValue, oldValue) {
                    $scope.inAssessmentManagement = newValue;
                });
                $scope.$watch(function () { return mainService.inScoreEntry; }, function (newValue, oldValue) {
                    $scope.inScoreEntry = newValue;
                });
                $scope.$watch(function () { return mainService.inAssessmentAssignment; }, function (newValue, oldValue) {
                    $scope.inAssessmentAssignment = newValue;
                    if (newValue) {
                        assessmentService.getPublishedDistrictAssessments().then(function (d) {
                            $scope.assessmentOptions = d;
                        });
                        $scope.assessmentToAssign = assessmentService.currentSelectedDistrictAssessment;
                    }
                });
                $scope.$watch(function () { return notificationService.currentNotification; }, function (newValue, oldValue) {
                    $scope.currentNotification = newValue;
                });
            };
            $scope.selectAssessment = function () {
                assessmentService.currentSelectedDistrictAssessment = $scope.assessmentToAssign;
            };
            $scope.openNewAssessmentModal = function (size) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'partials/modals/newAssessmentModal.html',
                    controller: 'NewAssessmentModalController',
                    size: "lg",
                    resolve: {
                        assessment: function () {
                            return {};
                        }
                    }
                });
                modalInstance.result.then(function (assessmentPackage) {
                    console.log(assessmentPackage.Assessment);
                    assessmentService.saveAssessment(assessmentPackage).then(function (res) {
                        if (res.Success) {
                            assessmentPackage.Assessment.DistrictAssessmentKey = res.Key;
                            assessmentService.currentDistrictAssessments.push(assessmentPackage.Assessment);
                            notificationService.showNotification("Success saving assessment", "success");
                            //show success!
                            if (assessmentPackage.ShouldPublish) {
                                console.log("Going to assessment view");
                            }
                        }
                        else {
                            notificationService.showNotification("Error saving assessment", "error");
                        }
                    });
                });
            };
            $scope.openNewMasterTemplateModal = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'partials/modals/newAssessmentTemplateModal.html',
                    controller: 'NewAssessmentTemplateModalController',
                    size: "lg",
                    resolve: {
                        assessment: function () {
                            return {};
                        }
                    }
                });
                modalInstance.result.then(function (assessmentTemplatePackage) {
                    if (assessmentTemplatePackage.ShouldMakeAvailableToUsers) {
                        assessmentTemplatePackage.AssessmentTemplate.AvailableToUsers = true;
                    }
                    else {
                        assessmentTemplatePackage.AssessmentTemplate.AvailableToUsers = false;
                    }
                    assessmentService.saveAssessmentTemplate(assessmentTemplatePackage).then(function (res) {
                        if (res.Success) {
                            assessmentTemplatePackage.AssessmentTemplate.AssessmentTemplateKey = res.Key;
                            if (assessmentService.currentAssessmentTemplates.length == 0) {
                                assessmentService.needToReloadTemplates = true;
                            }
                            assessmentService.currentAssessmentTemplates.push(assessmentTemplatePackage.AssessmentTemplate);
                            notificationService.showNotification("Success saving assessment template", "success");
                            //show success!
                            if (assessmentTemplatePackage.ShouldMakeAvailableToUsers) {
                                console.log("Going to assessment template view");
                            }
                        }
                        else {
                            notificationService.showNotification("Error saving assessment template", "error");
                        }
                    });
                });
            };
            $scope.goToDataEntry = function () {
                $location.path("/dataEntry");
            };
        }
        MainController.$inject = ['$scope', '$location', '$log', '$uibModal', 'mainService', 'assessmentService', 'notificationService'];
        return MainController;
    }(BaseController.Controller));
    INGAApp.MainController = MainController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=MainController.js.map