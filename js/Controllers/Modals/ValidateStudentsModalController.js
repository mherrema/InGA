var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var ValidateStudentsModalController = (function (_super) {
        __extends(ValidateStudentsModalController, _super);
        function ValidateStudentsModalController($scope, $uibModalInstance, $uibModal, mainService, notificationService, classroomAssessmentKey, dataEntryService, markingPeriodKey) {
            _super.call(this, $scope);
            var controller = this;
            // $scope.assessment = assessment;
            $scope.newAssessmentItem = {};
            $scope.newAssessmentItem.PointsMin = 0;
            $scope.newAssessmentItem.PointsMax = 10;
            $scope.newAssessmentItem.PointsStep = 1.0;
            $scope.newAssessmentItem.ItemType = { ItemTypeKey: 1, TypeName: "Multiple Choice" };
            $scope.itemTypeOptions = mainService.getItemTypeOptions();
            $scope.init = function () {
                dataEntryService.validateStudents(classroomAssessmentKey, markingPeriodKey).then(function (res) {
                    $scope.validationPackage = res;
                    console.log(res);
                });
            };
            $scope.ok = function () {
                var totalCount = $scope.validationPackage.StudentsToAdd.length + $scope.validationPackage.StudentsToRemove.length;
                var currentCount = 0;
                var allSuccesses = true;
                angular.forEach($scope.validationPackage.StudentsToAdd, function (student) {
                    dataEntryService.addStudent(student.DistrictStudentKey, classroomAssessmentKey, markingPeriodKey).then(function (res) {
                        if (!res.Success) {
                            allSuccesses = false;
                        }
                        currentCount++;
                        if (currentCount === totalCount) {
                            if (allSuccesses) {
                                notificationService.showNotification("Success syncing students", "success");
                                $uibModalInstance.close(true);
                            }
                            else {
                                notificationService.showNotification("Error syncing students", "error");
                                $uibModalInstance.close(false);
                            }
                        }
                    });
                });
                angular.forEach($scope.validationPackage.StudentsToRemove, function (student) {
                    dataEntryService.removeStudent(student.DistrictStudentKey, classroomAssessmentKey, markingPeriodKey).then(function (res) {
                        if (!res.Success) {
                            allSuccesses = false;
                        }
                        currentCount++;
                        if (currentCount === totalCount) {
                            if (allSuccesses) {
                                notificationService.showNotification("Success syncing students", "success");
                                $uibModalInstance.close(true);
                            }
                            else {
                                notificationService.showNotification("Error syncing students", "error");
                                $uibModalInstance.close(false);
                            }
                        }
                    });
                });
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };
        }
        ValidateStudentsModalController.$inject = ["$scope", "$uibModalInstance", "$uibModal", "mainService", "notificationService", "classroomAssessmentKey", "dataEntryService", "markingPeriodKey"];
        return ValidateStudentsModalController;
    }(BaseController.Controller));
    INGAApp.ValidateStudentsModalController = ValidateStudentsModalController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=ValidateStudentsModalController.js.map