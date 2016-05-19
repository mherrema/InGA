var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var MainController = (function (_super) {
        __extends(MainController, _super);
        function MainController($scope, $location, $log, $uibModal, mainService, assessmentService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
                $scope.assessmentOptions = [{ Title: "Assessment 1" }];
                $scope.$watch(function () { return mainService.pageTitle; }, function (newValue, oldValue) {
                    $scope.pageTitle = newValue;
                });
                $scope.$watch(function () { return mainService.pageTypeTitle; }, function (newValue, oldValue) {
                    $scope.pageTypeTitle = newValue;
                });
                $scope.$watch(function () { return mainService.inAssessmentManagement; }, function (newValue, oldValue) {
                    $scope.inAssessmentManagement = newValue;
                });
                $scope.$watch(function () { return mainService.inScoreEntry; }, function (newValue, oldValue) {
                    $scope.inScoreEntry = newValue;
                });
                $scope.$watch(function () { return mainService.inAssessmentAssignment; }, function (newValue, oldValue) {
                    $scope.inAssessmentAssignment = newValue;
                });
            };
            $scope.openNewAssessmentModal = function (size) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'partials/modals/newAssessmentModal.html',
                    controller: 'NewAssessmentModalController',
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
                    controller: 'NewAssessmentTemplateModalController',
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
            $scope.goToDataEntry = function () {
                $location.path("/dataEntry");
            };
        }
        MainController.$inject = ['$scope', '$location', '$log', '$uibModal', 'mainService', 'assessmentService'];
        return MainController;
    }(BaseController.Controller));
    INGAApp.MainController = MainController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=MainController.js.map