var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var NewAssessmentTemplateModalController = (function (_super) {
        __extends(NewAssessmentTemplateModalController, _super);
        function NewAssessmentTemplateModalController($scope, $uibModalInstance, $uibModal, mainService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
                $scope.sortableOptions = {
                    disabled: false,
                    stop: function () { $scope.updateItemRanking(); }
                };
                $scope.getGradeOptions();
                $scope.getSubjectOptions();
                $scope.getStandardTypeOptions();
            };
            $scope.getGradeOptions = function () {
                console.log("getting grade options");
                if (mainService.gradeOptions == undefined) {
                    mainService.getGradeOptions().then(function (d) {
                        $scope.gradeOptions = d;
                    });
                    ;
                }
                else {
                    $scope.gradeOptions = mainService.gradeOptions;
                }
            };
            $scope.getSubjectOptions = function () {
                if (mainService.subjectOptions == undefined) {
                    mainService.getSubjectOptions().then(function (d) {
                        $scope.subjectOptions = d;
                    });
                    ;
                }
                else {
                    $scope.subjectOptions = mainService.subjectOptions;
                }
            };
            $scope.getStandardTypeOptions = function () {
                if (mainService.standardTypeOptions == undefined) {
                    mainService.getStandardTypeOptions().then(function (d) {
                        $scope.standardTypeOptions = d;
                    });
                }
                else {
                    $scope.standardTypeOptions = mainService.standardTypeOptions;
                }
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
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: 'static',
                    templateUrl: 'partials/modals/newAssessmentItemModal.html',
                    controller: 'NewAssessmentItemModalController',
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
                    templateUrl: 'partials/modals/viewAssessmentModal.html',
                    controller: 'AssessmentViewModalController',
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
        NewAssessmentTemplateModalController.$inject = ['$scope', '$uibModalInstance', '$uibModal', 'mainService', 'assessment'];
        return NewAssessmentTemplateModalController;
    }(BaseController.Controller));
    INGAApp.NewAssessmentTemplateModalController = NewAssessmentTemplateModalController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=NewAssessmentTemplateModalController.js.map