var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var ValidateStudentsModalController = (function (_super) {
        __extends(ValidateStudentsModalController, _super);
        function ValidateStudentsModalController($scope, $uibModalInstance, $uibModal, mainService, classroomAssessmentKey, dataEntryService, markingPeriodKey) {
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
                if ($scope.assessment.Items === undefined || $scope.assessment.Items.length === 0) {
                    $scope.assessment.Items = [];
                }
                $scope.newAssessmentItem.ItemOrder = $scope.assessment.Items.length + 1;
                $scope.assessment.Items.push($scope.newAssessmentItem);
                $uibModalInstance.close($scope.assessment);
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };
        }
        ValidateStudentsModalController.$inject = ["$scope", "$uibModalInstance", "$uibModal", "mainService", "classroomAssessmentKey", "dataEntryService", "markingPeriodKey"];
        return ValidateStudentsModalController;
    }(BaseController.Controller));
    INGAApp.ValidateStudentsModalController = ValidateStudentsModalController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=ValidateStudentsModalController.js.map