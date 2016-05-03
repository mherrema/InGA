var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var AssessmentViewController = (function (_super) {
        __extends(AssessmentViewController, _super);
        function AssessmentViewController($scope, $uibModalInstance, $uibModal, mainService, assessment) {
            _super.call(this, $scope);
            var controller = this;
            $scope.assessment = assessment;
            $scope.ok = function () {
                $uibModalInstance.close($scope.assessment);
                // $scope.openAssessmentViewModal();
            };
        }
        AssessmentViewController.$inject = ['$scope', '$uibModalInstance', '$uibModal', 'mainService', 'assessment'];
        return AssessmentViewController;
    }(BaseController.Controller));
    INGAApp.AssessmentViewController = AssessmentViewController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=AssessmentViewController.js.map