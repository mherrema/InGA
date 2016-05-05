var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var NewAssessmentController = (function (_super) {
        __extends(NewAssessmentController, _super);
        function NewAssessmentController($scope, $uibModalInstance, $uibModal, mainService, assessment) {
            _super.call(this, $scope);
            var controller = this;
            if (assessment.Title != undefined) {
                $scope.newAssessment = assessment;
                if (assessment.Template.Title != undefined && assessment.Template.Title != "None") {
                    $scope.templateSelected = true;
                }
            }
            $scope.gradeOptions = mainService.getGradeOptions();
            $scope.subjectOptions = mainService.getSubjectOptions();
            $scope.schoolYearOptions = mainService.getSchoolYearOptions();
            $scope.standardTypeOptions = mainService.getStandardTypeOptions();
            $scope.templateOptions = mainService.getTemplateOptions();
            $scope.calendarOptions = mainService.getCalendarOptions();
            $scope.selectTemplate = function () {
                if ($scope.newAssessment.Template.Title == "None") {
                    $scope.templateSelected = false;
                    $scope.newAssessment.Subject = {};
                    $scope.newAssessment.Calendar = {};
                    $scope.newAssessment.StandardType = {};
                    $scope.newAssessment.GradeLevel = {};
                }
                else {
                    $scope.templateSelected = true;
                    $scope.newAssessment.Subject = { SubjectKey: $scope.newAssessment.Template.SubjectKey };
                    $scope.newAssessment.Calendar = { CalendarKey: $scope.newAssessment.Template.CalendarKey };
                    $scope.newAssessment.StandardType = { StandardTypeKey: $scope.newAssessment.Template.StandardTypeKey };
                    $scope.newAssessment.GradeLevel = { GradeLevelKey: $scope.newAssessment.Template.GradeLevelKey };
                }
            };
            $scope.publish = function () {
                $uibModalInstance.close($scope.newAssessment);
                $scope.openAssessmentViewModal();
            };
            $scope.ok = function () {
                $uibModalInstance.close($scope.newAssessment);
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            $scope.openNewAssessmentItemModal = function (size) {
                $uibModalInstance.dismiss('hide');
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: 'static',
                    templateUrl: 'partials/modals/newAssessmentItemModal.html',
                    controller: 'NewAssessmentItemController',
                    size: "lg",
                    keyboard: false,
                    resolve: {
                        assessment: function () {
                            return $scope.newAssessment;
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
                    templateUrl: 'partials/modals/assessmentViewModal.html',
                    controller: 'AssessmentViewController',
                    size: "lg",
                    resolve: {
                        assessment: function () {
                            return $scope.newAssessment;
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    console.log(selectedItem);
                });
            };
        }
        NewAssessmentController.$inject = ['$scope', '$uibModalInstance', '$uibModal', 'mainService', 'assessment'];
        return NewAssessmentController;
    }(BaseController.Controller));
    INGAApp.NewAssessmentController = NewAssessmentController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=NewAssessmentController.js.map