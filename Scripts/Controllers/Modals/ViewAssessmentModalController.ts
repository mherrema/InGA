module INGAApp
{

  interface IAssessmentViewScope extends BaseController.IScope
  {
    assessment: DistrictAssessment,
    ok: Function,
    cancel: Function,
    editAssessment: Function,
    publish: Function,
    goToAssign: Function
  }

  export class ViewAssessmentModalController extends BaseController.Controller
  {
    scope: IAssessmentViewScope;
    static $inject = ['$scope', '$location', '$uibModalInstance', '$uibModal', 'mainService', 'assessment', 'assessmentService'];

    constructor( $scope: IAssessmentViewScope, $location: ng.ILocationService, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $uibModal: ng.ui.bootstrap.IModalService, mainService:MainService, assessment:DistrictAssessment, assessmentService: AssessmentService)
    {
      super( $scope );
      var controller = this;

      $scope.assessment = assessment;

      $scope.ok = function () {
        $uibModalInstance.close($scope.assessment);
      };

      $scope.publish = function(){
        console.log("Publish button clicked");
        assessmentService.saveAssessment({Assessment: $scope.assessment, ShouldRefresh: true, ShouldPublish: true});
      }

      $scope.goToAssign = function(){
        console.log(assessmentService);
        assessmentService.currentSelectedDistrictAssessment = $scope.assessment;
        $location.path("/assessments/assign");
        $uibModalInstance.dismiss();
      }

      $scope.editAssessment = function(){
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

        modalInstance.result.then(function (assessmentPackage: AssessmentPackage) {
          assessmentService.updateAssessment(assessmentPackage).then(function(d: boolean){
            if(d){
              //show success!
              if(assessmentPackage.ShouldPublish){
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
