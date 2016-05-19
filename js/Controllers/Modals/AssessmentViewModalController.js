var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var AssessmentViewModalController = (function (_super) {
        __extends(AssessmentViewModalController, _super);
        function AssessmentViewModalController($scope, $uibModalInstance, $uibModal, mainService, assessment, assessmentService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.assessment = assessment;
            $scope.ok = function () {
                $uibModalInstance.close($scope.assessment);
            };
            $scope.publish = function () {
                console.log("Publish button clicked");
                assessmentService.saveAssessment({ Assessment: $scope.assessment, ShouldRefresh: true, ShouldPublish: true });
            };
            $scope.editAssessment = function () {
                $uibModalInstance.close($scope.assessment);
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'partials/modals/newAssessmentModal.html',
                    controller: 'EditAssessmentModalController',
                    size: "lg",
                    resolve: {
                        assessment: function () {
                            return $scope.assessment;
                        }
                    }
                });
                modalInstance.result.then(function (assessmentPackage) {
                    if (assessmentService.saveAssessment(assessmentPackage)) {
                        if (assessmentPackage.ShouldPublish) {
                        }
                    }
                });
            };
        }
        AssessmentViewModalController.$inject = ['$scope', '$uibModalInstance', '$uibModal', 'mainService', 'assessment', 'assessmentService'];
        return AssessmentViewModalController;
    }(BaseController.Controller));
    INGAApp.AssessmentViewModalController = AssessmentViewModalController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=AssessmentViewModalController.js.map