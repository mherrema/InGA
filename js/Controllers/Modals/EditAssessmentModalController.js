var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var EditAssessmentModalController = (function (_super) {
        __extends(EditAssessmentModalController, _super);
        function EditAssessmentModalController($scope, $timeout, $uibModalInstance, $uibModal, mainService, assessmentService, assessment) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
                $scope.pageTitle = "Edit Assessment";
                if (assessment.Title != undefined) {
                    $scope.originalAssessment = angular.copy(assessment);
                    $scope.newAssessment = assessment;
                    $scope.pageTitle += " " + assessment.Title;
                    if (assessment.Template != undefined && assessment.Template.Title != undefined && assessment.Template.Title != "None") {
                        $scope.templateSelected = true;
                    }
                }
                else {
                    $scope.newAssessment = { Title: "New Assessment" };
                }
                $scope.sortableOptions = {
                    disabled: false,
                    stop: function () { $scope.updateItemRanking(); }
                };
                // $scope.gradeOptions = mainService.getGradeOptions();
                // $scope.subjectOptions = mainService.getSubjectOptions();
                //$scope.schoolYearOptions = mainService.getSchoolYearOptions();
                //$scope.standardTypeOptions = mainService.getStandardTypeOptions();
                // $scope.templateOptions = mainService.getTemplateOptions();
                // $scope.calendarOptions = mainService.getCalendarOptions();
                if ($scope.newAssessment.Title == "New Assessment") {
                    $timeout(function () {
                        $scope.highlightTitle();
                    }, 0);
                }
                $scope.getGradeOptions();
                $scope.getSchoolYearOptions();
                $scope.getSubjectOptions();
                $scope.getStandardTypeOptions();
                $scope.getCalendarOptions();
                $scope.getAssessmentTemplateOptions();
            };
            $scope.getCalendarOptions = function () {
                if (mainService.calendarOptions == undefined) {
                    mainService.getCalendarOptions().then(function (d) {
                        $scope.calendarOptions = d;
                    });
                    ;
                }
                else {
                    $scope.calendarOptions = mainService.calendarOptions;
                }
            };
            $scope.getAssessmentTemplateOptions = function () {
                if (mainService.assessmentTemplateOptions == undefined) {
                    mainService.getAssessmentTemplateOptions().then(function (d) {
                        $scope.templateOptions = d;
                    });
                }
                else {
                    $scope.gradeOptions = mainService.gradeOptions;
                }
            };
            $scope.getGradeOptions = function () {
                console.log("getting grade options");
                if (mainService.gradeOptions == undefined) {
                    mainService.getGradeOptions().then(function (d) {
                        $scope.gradeOptions = d;
                    });
                }
                else {
                    $scope.gradeOptions = mainService.gradeOptions;
                }
            };
            $scope.getSchoolYearOptions = function () {
                if (mainService.schoolYearOptions == undefined) {
                    mainService.getSchoolYearOptions().then(function (d) {
                        $scope.schoolYearOptions = d;
                    });
                }
                else {
                    $scope.schoolYearOptions = mainService.schoolYearOptions;
                }
            };
            $scope.getSubjectOptions = function () {
                if (mainService.subjectOptions == undefined) {
                    mainService.getSubjectOptions().then(function (d) {
                        $scope.subjectOptions = d;
                    });
                }
                else {
                    $scope.subjectOptions = mainService.subjectOptions;
                }
            };
            $scope.getStandardTypeOptions = function () {
                if (mainService.standardTypeOptions == undefined) {
                    mainService.getStandardTypeOptions().then(function (d) {
                        $scope.standardTypeOptions = d;
                    });
                }
                else {
                    $scope.standardTypeOptions = mainService.standardTypeOptions;
                }
            };
            $scope.selectTemplate = function () {
                if ($scope.newAssessment.AssessmentTemplate.Title == "None") {
                    $scope.sortableOptions.disabled = false;
                    $scope.templateSelected = false;
                    $scope.newAssessment.Subject = {};
                    $scope.newAssessment.Calendar = {};
                    $scope.newAssessment.StandardType = {};
                    $scope.newAssessment.GradeLevel = {};
                }
                else {
                    $scope.templateSelected = true;
                    $scope.sortableOptions.disabled = true;
                    $scope.newAssessment.Subject = $scope.newAssessment.AssessmentTemplate.Subject;
                    $scope.newAssessment.Calendar = { CalendarKey: $scope.newAssessment.AssessmentTemplate.CalendarKey };
                    $scope.newAssessment.StandardType = { StandardTypeKey: $scope.newAssessment.AssessmentTemplate.StandardTypeKey };
                    $scope.newAssessment.GradeLevel = { GradeLevelKey: $scope.newAssessment.AssessmentTemplate.GradeLevelKey };
                }
            };
            $scope.highlightTitle = function () {
                $("#assessmentTitle").select();
            };
            $scope.updateItemRanking = function () {
                angular.forEach($scope.newAssessment.DistrictAssessmentItems, function (value, key) {
                    value.Item.ItemOrder = key + 1;
                });
                console.log($scope.newAssessment.DistrictAssessmentItems);
            };
            $scope.publish = function () {
                console.log("Publish Assessment");
                $uibModalInstance.close({ Assessment: $scope.newAssessment, ShouldRefresh: true, ShouldPublish: true });
                //$scope.openAssessmentViewModal();
            };
            $scope.ok = function () {
                console.log("Saving Assessment");
                $uibModalInstance.close({ Assessment: $scope.newAssessment, ShouldRefresh: true });
            };
            $scope.cancel = function () {
                // $scope.newAssessment = $scope.originalAssessment;
                angular.copy($scope.originalAssessment, $scope.newAssessment);
                // $scope.newAssessment.Title = $scope.originalAssessment.Title;
                $uibModalInstance.dismiss('cancel');
            };
            $scope.openNewAssessmentItemModal = function (size) {
                // $uibModalInstance.dismiss('hide');
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: 'static',
                    templateUrl: 'partials/modals/newAssessmentItemModal.html',
                    controller: 'NewAssessmentItemModalController',
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
                    templateUrl: 'partials/modals/viewAssessmentModal.html',
                    controller: 'AssessmentViewModalController',
                    size: "extra-wide",
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
        EditAssessmentModalController.$inject = ['$scope', '$timeout', '$uibModalInstance', '$uibModal', 'mainService', 'assessmentService', 'assessment'];
        return EditAssessmentModalController;
    }(BaseController.Controller));
    INGAApp.EditAssessmentModalController = EditAssessmentModalController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=EditAssessmentModalController.js.map