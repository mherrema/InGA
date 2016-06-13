var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var EditAssessmentTemplateModalController = (function (_super) {
        __extends(EditAssessmentTemplateModalController, _super);
        function EditAssessmentTemplateModalController($scope, $timeout, $uibModalInstance, $uibModal, mainService, assessmentService, template) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
                $scope.pageTitle = "Edit Assessment Template";
                $scope.newAssessmentTemplate = template;
                $scope.sortableOptions = {
                    disabled: false,
                    stop: function () { $scope.updateItemRanking(); }
                };
                $scope.getGradeOptions();
                $scope.getSubjectOptions();
                $scope.getStandardTypeOptions();
                $scope.getCalendarOptions();
                $scope.getDistrictOptions();
            };
            $scope.makeAvailableToUsers = function () {
                console.log("Publish button clicked");
                // assessmentService.updateAssessmentTemplate({AssessmentTemplate: $scope.newAssessmentTemplate, ShouldRefresh: true, ShouldMakeAvailableToUsers: true});
                $uibModalInstance.close({ AssessmentTemplate: $scope.newAssessmentTemplate, ShouldRefresh: false, ShouldMakeAvailableToUsers: true });
            };
            $scope.ok = function () {
                $uibModalInstance.close({ AssessmentTemplate: $scope.newAssessmentTemplate, ShouldRefresh: false });
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };
            $scope.openNewAssessmentItemModal = function (size) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: "static",
                    templateUrl: "partials/modals/newAssessmentItemModal.html",
                    controller: "NewAssessmentTemplateItemModalController",
                    size: "lg",
                    keyboard: false,
                    resolve: {
                        assessment: function () {
                            return $scope.newAssessmentTemplate;
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    console.log(selectedItem);
                });
            };
            $scope.openAssessmentViewModal = function (size) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: "partials/modals/viewAssessmentModal.html",
                    controller: "AssessmentViewModalController",
                    size: "lg",
                    resolve: {
                        assessment: function () {
                            return $scope.newAssessmentTemplate;
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    console.log(selectedItem);
                });
            };
            $scope.updateItemRanking = function () {
                angular.forEach($scope.newAssessmentTemplate.AssessmentTemplateItems, function (value, key) {
                    value.Item.ItemOrder = key + 1;
                });
                console.log($scope.newAssessmentTemplate.Items);
            };
            $scope.removeItemAtIndex = function (index) {
                $scope.newAssessmentTemplate.AssessmentTemplateItems.splice(index, 1);
            };
            $scope.getStandardTypeOptions = function () {
                if (mainService.standardTypeOptions === undefined) {
                    mainService.getStandardTypeOptions().then(function (d) {
                        $scope.standardTypeOptions = d;
                    });
                }
                else {
                    $scope.standardTypeOptions = mainService.standardTypeOptions;
                }
            };
            $scope.getCalendarOptions = function () {
                if (mainService.calendarOptions === undefined) {
                    mainService.getCalendarOptions().then(function (d) {
                        $scope.calendarOptions = d;
                    });
                }
                else {
                    $scope.calendarOptions = mainService.calendarOptions;
                }
            };
            $scope.getDistrictOptions = function () {
                if (mainService.districtOptions === undefined) {
                    mainService.getDistrictOptions().then(function (d) {
                        $scope.districtOptions = d;
                    });
                }
                else {
                    $scope.districtOptions = mainService.districtOptions;
                }
            };
            $scope.getGradeOptions = function () {
                console.log("getting grade options");
                if (mainService.gradeOptions === undefined) {
                    mainService.getGradeOptions().then(function (d) {
                        $scope.gradeOptions = d;
                    });
                }
                else {
                    $scope.gradeOptions = mainService.gradeOptions;
                }
            };
            $scope.getSubjectOptions = function () {
                if (mainService.subjectOptions === undefined) {
                    mainService.getSubjectOptions().then(function (d) {
                        $scope.subjectOptions = d;
                    });
                }
                else {
                    $scope.subjectOptions = mainService.subjectOptions;
                }
            };
        }
        EditAssessmentTemplateModalController.$inject = ["$scope", "$timeout", "$uibModalInstance", "$uibModal", "mainService", "assessmentService", "template"];
        return EditAssessmentTemplateModalController;
    }(BaseController.Controller));
    INGAApp.EditAssessmentTemplateModalController = EditAssessmentTemplateModalController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=EditAssessmentTemplateModalController.js.map