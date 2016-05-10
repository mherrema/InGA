var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var MainController = (function (_super) {
        __extends(MainController, _super);
        function MainController($scope, $log, $uibModal, assessmentService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
                $scope.test = "hello";
                $scope.pageTypeTitle = "INGA";
                $scope.pageTitle = "Assessment Management";
            };
            $scope.items = ['item1', 'item2', 'item3'];
            $scope.openNewAssessmentModal = function (size) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'partials/modals/newDistrictAssessmentModal.html',
                    controller: 'NewAssessmentController',
                    size: "lg",
                    resolve: {
                        assessment: function () {
                            return {};
                        }
                    }
                });
                modalInstance.result.then(function (assessmentPackage) {
                    console.log(assessmentPackage.Assessment);
                    if (assessmentService.saveAssessment(assessmentPackage)) {
                        if (assessmentPackage.ShouldPublish) {
                            console.log("Going to assessment view");
                        }
                    }
                });
            };
            $scope.openNewMasterTemplateModal = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'partials/modals/newAssessmentTemplateModal.html',
                    controller: 'NewAssessmentTemplateController',
                    size: "lg",
                    resolve: {
                        assessment: function () {
                            return {};
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    console.log(selectedItem);
                });
            };
        }
        MainController.$inject = ['$scope', '$log', '$uibModal', 'assessmentService'];
        return MainController;
    }(BaseController.Controller));
    INGAApp.MainController = MainController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=MainController.js.map