var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var ViewAssessmentModalController = (function (_super) {
        __extends(ViewAssessmentModalController, _super);
        function ViewAssessmentModalController($scope, $location, $uibModalInstance, $uibModal, mainService, assessment, assessmentService, notificationService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.assessment = assessment;
            $scope.ok = function () {
                $uibModalInstance.close($scope.assessment);
            };
            $scope.publish = function () {
                console.log("Publish button clicked");
                assessmentService.updateAssessment({ Assessment: $scope.assessment, ShouldRefresh: true, ShouldPublish: true }).then(function (res) {
                    if (res.Success) {
                        notificationService.showNotification("Success publishing assessment", "success");
                    }
                    else {
                        notificationService.showNotification("Error publishing assessment", "error");
                    }
                });
            };
            $scope.goToAssign = function () {
                console.log(assessmentService);
                assessmentService.currentSelectedDistrictAssessment = $scope.assessment;
                $location.path("/assessments/assign");
                $uibModalInstance.dismiss();
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
                    assessmentService.updateAssessment(assessmentPackage).then(function (d) {
                        if (d) {
                            //show success!
                            if (assessmentPackage.ShouldPublish) {
                                console.log("Going to assessment view");
                            }
                        }
                        else {
                        }
                    });
                });
            };
        }
        ViewAssessmentModalController.$inject = ['$scope', '$location', '$uibModalInstance', '$uibModal', 'mainService', 'assessment', 'assessmentService', 'notificationService'];
        return ViewAssessmentModalController;
    }(BaseController.Controller));
    INGAApp.ViewAssessmentModalController = ViewAssessmentModalController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=ViewAssessmentModalController.js.map