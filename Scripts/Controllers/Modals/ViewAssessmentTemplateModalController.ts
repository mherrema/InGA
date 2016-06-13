module INGAApp
{

  interface IAssessmentTemplateViewScope extends BaseController.IScope
  {
    template: AssessmentTemplate,
    ok: Function,
    cancel: Function,
    editAssessmentTemplate: Function,
    makeAvailableToUsers: Function,
    goToAssign: Function
  }

  export class ViewAssessmentTemplateModalController extends BaseController.Controller
  {
    scope: IAssessmentTemplateViewScope;
    static $inject = ['$scope', '$location', '$uibModalInstance', '$uibModal', 'mainService', 'template', 'assessmentService', 'notificationService'];

    constructor( $scope: IAssessmentTemplateViewScope, $location: ng.ILocationService, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $uibModal: ng.ui.bootstrap.IModalService, mainService:MainService, template:AssessmentTemplate, assessmentService: AssessmentService, notificationService: NotificationService)
    {
      super( $scope );
      var controller = this;

      $scope.template = template

      $scope.ok = function () {
        $uibModalInstance.dismiss();
      };

      $scope.makeAvailableToUsers = function(){
        console.log("Publish button clicked");
        assessmentService.makeAssessmentTemplateAvailable(template.AssessmentTemplateKey).then(function(res: ReturnPackage){
          if(res.Success){
            //show success!
            $scope.template.AvailableToUsers = true;
            notificationService.showNotification("Success making assessment template available", "success")
          }
          else{
            notificationService.showNotification("Failed to make assessment template available", "success")
            //show error!
          }
        });
      }

      // $scope.goToAssign = function(){
      //   console.log(assessmentService);
      //   assessmentService.currentSelectedDistrictAssessment = $scope.assessment;
      //   $location.path("/assessments/assign");
      //   $uibModalInstance.dismiss();
      // }

      $scope.editAssessmentTemplate = function(){
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

        modalInstance.result.then(function (assessmentTemplatePackage: AssessmentTemplatePackage) {
          if(assessmentTemplatePackage.ShouldMakeAvailableToUsers){
            assessmentTemplatePackage.AssessmentTemplate.AvailableToUsers = true;
          }
          // else{
          //   assessmentTemplatePackage.AssessmentTemplate.AvailableToUsers = false;
          // }
          assessmentService.updateAssessmentTemplate(assessmentTemplatePackage).then(function(d: boolean){
            if(d){
              //show success!
              if(assessmentTemplatePackage.ShouldMakeAvailableToUsers){
                console.log("Going to assessment view");
                //go to assessment view
              }
            }
            else{
              //show error!
            }
          });
        });
      }
  }
}
}
