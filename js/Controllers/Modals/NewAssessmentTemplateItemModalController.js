var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var NewAssessmentTemplateItemModalController = (function (_super) {
        __extends(NewAssessmentTemplateItemModalController, _super);
        function NewAssessmentTemplateItemModalController($scope, $uibModalInstance, $uibModal, mainService, assessment) {
            _super.call(this, $scope);
            var controller = this;
            $scope.assessment = assessment;
            $scope.newAssessmentItem = {};
            $scope.newAssessmentItem.Item = {};
            $scope.newAssessmentItem.Item.PointsMin = 0;
            $scope.newAssessmentItem.Item.PointsMax = 10;
            $scope.newAssessmentItem.Item.PointsStep = 1.0;
            $scope.newAssessmentItem.Item.ItemType = { ItemTypeKey: 1, TypeName: "Multiple Choice" };
            $scope.itemTypeOptions = mainService.getItemTypeOptions();
            $scope.pointsStepOptions = [{ Step: 1.0, Title: "1.0" }, { Step: 0.5, Title: "0.5" }, { Step: 0.2, Title: "0.2" }, { Step: 0.1, Title: "0.1" }, { Step: 0, Title: "All Values In Range" }];
            // $scope.initFormValidation = function(){
            //   // $scope.newAssessmentItemForm.PointsMin = 0;
            //   $scope.newAssessmentItemForm.PointsMin.$setValidity("pointsmin", ($scope.newAssessmentItem.PointsMin < $scope.newAssessmentItem.PointsMax));
            //   // console.log($scope.newAssessmentItemForm);
            // }
            $scope.ok = function () {
                if ($scope.assessment.AssessmentTemplateItems == undefined || $scope.assessment.AssessmentTemplateItems.length == 0) {
                    $scope.assessment.AssessmentTemplateItems = [];
                }
                $scope.newAssessmentItem.Item.ItemOrder = $scope.assessment.AssessmentTemplateItems.length + 1;
                $scope.assessment.AssessmentTemplateItems.push($scope.newAssessmentItem);
                $uibModalInstance.close($scope.assessment);
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            $scope.openNewAssessmentModal = function (size) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'partials/modals/newAssessmentModal.html',
                    controller: 'NewAssessmentModalController',
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
        }
        NewAssessmentTemplateItemModalController.$inject = ['$scope', '$uibModalInstance', '$uibModal', 'mainService', 'assessment'];
        return NewAssessmentTemplateItemModalController;
    }(BaseController.Controller));
    INGAApp.NewAssessmentTemplateItemModalController = NewAssessmentTemplateItemModalController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=NewAssessmentTemplateItemModalController.js.map