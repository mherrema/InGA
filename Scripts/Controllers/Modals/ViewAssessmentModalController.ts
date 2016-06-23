namespace INGAApp {

  interface IAssessmentViewScope extends BaseController.IScope {
    assessment: DistrictAssessment;
    ok: Function;
    cancel: Function;
    editAssessment: Function;
    publish: Function;
    goToAssign: Function;
  }

  export class ViewAssessmentModalController extends BaseController.Controller {
    scope: IAssessmentViewScope;
    static $inject = ["$scope", "$location", "$uibModalInstance", "$uibModal", "mainService", "assessment", "assessmentService", "notificationService"];

    constructor( $scope: IAssessmentViewScope, $location: ng.ILocationService, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
      $uibModal: ng.ui.bootstrap.IModalService, mainService: MainService, assessment: DistrictAssessment,
      assessmentService: AssessmentService, notificationService: NotificationService) {
      super( $scope );
      let controller = this;

      $scope.assessment = assessment;

      $scope.ok = function () {
        $uibModalInstance.close($scope.assessment);
      };

      $scope.publish = function(){
        console.log("Publish button clicked");
        assessmentService.updateAssessment({Assessment: $scope.assessment, ShouldRefresh: true, ShouldPublish: true}).then(function(res: ReturnPackage){
          if (res.Success) {
            notificationService.showNotification("Success publishing assessment", "success");
          }
          else {
            $scope.assessment.IsPublished = false;
            notificationService.showNotification("Error publishing assessment", "error");
          }
        })
        .catch(function(res){
          $scope.assessment.IsPublished = false;
        });
      };

      $scope.goToAssign = function(){
        console.log(assessmentService);
        assessmentService.currentSelectedDistrictAssessment = $scope.assessment;
        $location.path("/assessments/assign");
        $uibModalInstance.dismiss();
      };

      $scope.editAssessment = function(){
        $uibModalInstance.close($scope.assessment);
        let modalInstance = $uibModal.open({
          animation: true,
          templateUrl: "partials/modals/newAssessmentModal.html",
          controller: "EditAssessmentModalController",
          size: "lg",
          resolve: {
            assessment: function () {
              return $scope.assessment;
            }
          }
        });

        modalInstance.result.then(function (assessmentPackage: AssessmentPackage) {
          assessmentService.updateAssessment(assessmentPackage).then(function(res: ReturnPackage){
            if (res.Success) {
              // show success!
              notificationService.showNotification("Success saving assessment template", "success");
              // if (assessmentPackage.ShouldPublish) {
              //   console.log("Going to assessment view");
              //   // go to assessment view
              // }
            }
            else {
              // show error!
              notificationService.showNotification(res.ErrorText, "error");
            }
          });
        });
      };
  }
}
}
