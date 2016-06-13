var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var NewAssessmentItemModalController = (function (_super) {
        __extends(NewAssessmentItemModalController, _super);
        function NewAssessmentItemModalController($scope, $uibModalInstance, $uibModal, mainService, assessment) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
                $scope.assessment = assessment;
                $scope.newAssessmentItem = {};
                $scope.newAssessmentItem.Item = {};
                $scope.newAssessmentItem.Item.PointsMin = 0;
                $scope.newAssessmentItem.Item.PointsMax = 10;
                $scope.newAssessmentItem.Item.PointsStep = 1.0;
                $scope.newAssessmentItem.Item.ItemType = { ItemTypeKey: 1, TypeName: "Multiple Choice" };
                $scope.itemTypeOptions = mainService.getItemTypeOptions();
                $scope.pointsStepOptions = [{ Step: 1.0, Title: "1.0" }, { Step: 0.5, Title: "0.5" }, { Step: 0.2, Title: "0.2" }, { Step: 0.1, Title: "0.1" }, { Step: 0, Title: "All Values In Range" }];
            };
            $scope.ok = function () {
                if ($scope.assessment.DistrictAssessmentItems === undefined || $scope.assessment.DistrictAssessmentItems.length === 0) {
                    $scope.assessment.DistrictAssessmentItems = [];
                }
                if ($scope.newAssessmentItem.Item.Standard != null) {
                    $scope.newAssessmentItem.Item.StandardKey = $scope.newAssessmentItem.Item.Standard.StandardKey;
                    $scope.newAssessmentItem.Item.StandardCode = $scope.newAssessmentItem.Item.Standard.StandardCode;
                }
                $scope.newAssessmentItem.Item.ItemOrder = $scope.assessment.DistrictAssessmentItems.length + 1;
                $scope.assessment.DistrictAssessmentItems.push($scope.newAssessmentItem);
                $uibModalInstance.close($scope.assessment);
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };
            $scope.openNewAssessmentModal = function (size) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: "partials/modals/newAssessmentModal.html",
                    controller: "NewAssessmentModalController",
                    size: "lg",
                    resolve: {
                        assessment: function () {
                            return $scope.assessment;
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    console.log(selectedItem);
                });
            };
            $scope.getStandardOptions = function (searchString) {
                return mainService.getStandardOptions(searchString).then(function (options) {
                    $scope.standardOptions = options;
                    return options;
                });
            };
        }
        NewAssessmentItemModalController.$inject = ["$scope", "$uibModalInstance", "$uibModal", "mainService", "assessment"];
        return NewAssessmentItemModalController;
    }(BaseController.Controller));
    INGAApp.NewAssessmentItemModalController = NewAssessmentItemModalController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=NewAssessmentItemModalController.js.map