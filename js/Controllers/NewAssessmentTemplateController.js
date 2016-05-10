var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var NewAssessmentTemplateController = (function (_super) {
        __extends(NewAssessmentTemplateController, _super);
        function NewAssessmentTemplateController($scope, $uibModalInstance, $uibModal, mainService) {
            _super.call(this, $scope);
            var controller = this;
            // if(assessment != undefined){
            //   $scope.newAssessment = assessment;
            // }
            $scope.init = function () {
                $scope.gradeOptions = mainService.getGradeOptions();
                $scope.sortableOptions = {
                    disabled: false,
                    stop: function () { $scope.updateItemRanking(); }
                };
            };
            $scope.publish = function () {
                $uibModalInstance.close($scope.newAssessmentTemplate);
                // $scope.openAssessmentViewModal();
            };
            $scope.ok = function () {
                $uibModalInstance.close($scope.newAssessmentTemplate);
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            $scope.updateItemRanking = function () {
                angular.forEach($scope.newAssessmentTemplate.Items, function (value, key) {
                    value.ItemOrder = key + 1;
                });
                console.log($scope.newAssessmentTemplate.Items);
            };
            $scope.openNewAssessmentItemModal = function (size) {
                // $uibModalInstance.dismiss('hide');
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: 'static',
                    templateUrl: 'partials/modals/newAssessmentItemModal.html',
                    controller: 'NewAssessmentItemController',
                    size: "lg",
                    keyboard: false,
                    resolve: {
                        assessment: function () {
                            return $scope.newAssessmentTemplate;
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    console.log(selectedItem);
                });
            };
            $scope.openAssessmentViewModal = function (size) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'partials/modals/assessmentViewModal.html',
                    controller: 'AssessmentViewController',
                    size: "lg",
                    resolve: {
                        assessment: function () {
                            return $scope.newAssessmentTemplate;
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    console.log(selectedItem);
                });
            };
        }
        NewAssessmentTemplateController.$inject = ['$scope', '$uibModalInstance', '$uibModal', 'mainService', 'assessment'];
        return NewAssessmentTemplateController;
    }(BaseController.Controller));
    INGAApp.NewAssessmentTemplateController = NewAssessmentTemplateController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=NewAssessmentTemplateController.js.map