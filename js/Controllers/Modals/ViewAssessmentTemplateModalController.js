var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var ViewAssessmentTemplateModalController = (function (_super) {
        __extends(ViewAssessmentTemplateModalController, _super);
        function ViewAssessmentTemplateModalController($scope, $location, $uibModalInstance, $uibModal, mainService, template, assessmentService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.template = template;
            $scope.ok = function () {
                $uibModalInstance.dismiss();
            };
            $scope.makeAvailableToUsers = function () {
                console.log("Publish button clicked");
                assessmentService.makeAssessmentTemplateAvailable(template.AssessmentTemplateKey);
            };
            // $scope.goToAssign = function(){
            //   console.log(assessmentService);
            //   assessmentService.currentSelectedDistrictAssessment = $scope.assessment;
            //   $location.path("/assessments/assign");
            //   $uibModalInstance.dismiss();
            // }
            $scope.editAssessmentTemplate = function () {
                $uibModalInstance.close($scope.template);
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'partials/modals/newAssessmentTemplateModal.html',
                    controller: 'EditAssessmentTemplateModalController',
                    size: "lg",
                    resolve: {
                        template: function () {
                            return $scope.template;
                        }
                    }
                });
                modalInstance.result.then(function (assessmentTemplatePackage) {
                    if (assessmentTemplatePackage.ShouldMakeAvailableToUsers) {
                        assessmentTemplatePackage.AssessmentTemplate.AvailableToUsers = true;
                    }
                    else {
                        assessmentTemplatePackage.AssessmentTemplate.AvailableToUsers = false;
                    }
                    assessmentService.updateAssessmentTemplate(assessmentTemplatePackage).then(function (d) {
                        if (d) {
                            //show success!
                            if (assessmentTemplatePackage.ShouldMakeAvailableToUsers) {
                                console.log("Going to assessment view");
                            }
                        }
                        else {
                        }
                    });
                });
            };
        }
        ViewAssessmentTemplateModalController.$inject = ['$scope', '$location', '$uibModalInstance', '$uibModal', 'mainService', 'template', 'assessmentService'];
        return ViewAssessmentTemplateModalController;
    }(BaseController.Controller));
    INGAApp.ViewAssessmentTemplateModalController = ViewAssessmentTemplateModalController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=ViewAssessmentTemplateModalController.js.map