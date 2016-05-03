var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var NewAssessmentItemController = (function (_super) {
        __extends(NewAssessmentItemController, _super);
        function NewAssessmentItemController($scope, $uibModalInstance, $uibModal, mainService, assessment) {
            _super.call(this, $scope);
            var controller = this;
            $scope.assessment = assessment;
            $scope.ok = function () {
                //add the item to the assessment first
                $uibModalInstance.close($scope.assessment);
                $scope.openNewAssessmentModal();
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
                $scope.openNewAssessmentModal();
            };
            $scope.openNewAssessmentModal = function (size) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'partials/modals/newAssessmentModal.html',
                    controller: 'NewAssessmentController',
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
        NewAssessmentItemController.$inject = ['$scope', '$uibModalInstance', '$uibModal', 'mainService', 'assessment'];
        return NewAssessmentItemController;
    }(BaseController.Controller));
    INGAApp.NewAssessmentItemController = NewAssessmentItemController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=NewAssessmentItemController.js.map