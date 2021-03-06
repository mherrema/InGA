var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var AddStudentModalController = (function (_super) {
        __extends(AddStudentModalController, _super);
        function AddStudentModalController($scope, $uibModalInstance, $uibModal, mainService, assessment) {
            _super.call(this, $scope);
            var controller = this;
            $scope.assessment = assessment;
            $scope.newAssessmentItem = {};
            $scope.newAssessmentItem.PointsMin = 0;
            $scope.newAssessmentItem.PointsMax = 10;
            $scope.newAssessmentItem.PointsStep = 1.0;
            $scope.newAssessmentItem.ItemType = { ItemTypeKey: 1, TypeName: "Multiple Choice" };
            $scope.itemTypeOptions = mainService.getItemTypeOptions();
            $scope.pointsStepOptions = [{ Step: 1.0, Title: "1.0" }, { Step: 0.5, Title: "0.5" }, { Step: 0.2, Title: "0.2" }, { Step: 0.1, Title: "0.1" }, { Step: 0, Title: "All Values In Range" }];
            $scope.initFormValidation = function () {
                $scope.newAssessmentItemForm.PointsMin.$setValidity("pointsmin", ($scope.newAssessmentItem.PointsMin < $scope.newAssessmentItem.PointsMax));
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
        AddStudentModalController.$inject = ["$scope", "$uibModalInstance", "$uibModal", "mainService", "assessment"];
        return AddStudentModalController;
    }(BaseController.Controller));
    INGAApp.AddStudentModalController = AddStudentModalController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=AddStudentModalController.js.map