module INGAApp
{

  interface IAssessmentViewScope extends BaseController.IScope
  {
    assessment: DistrictAssessment,
    ok: Function,
    cancel: Function,
    editAssessment: Function,
    publish: Function
  }

  interface SelectedItem{
    item: string
  }

  export class AssessmentViewController extends BaseController.Controller
  {
    scope: IAssessmentViewScope;
    static $inject = ['$scope', '$uibModalInstance', '$uibModal', 'mainService', 'assessment', 'assessmentService'];

    constructor( $scope: IAssessmentViewScope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $uibModal: ng.ui.bootstrap.IModalService, mainService:MainService, assessment:DistrictAssessment, assessmentService: AssessmentService)
    {
      super( $scope );
      var controller = this;

      $scope.assessment = assessment;

      $scope.ok = function () {
        $uibModalInstance.close($scope.assessment);
        // $scope.openAssessmentViewModal();
      };

      $scope.publish = function(){
        console.log("Publish button clicked");
        assessmentService.saveAssessment({Assessment: $scope.assessment, ShouldRefresh: true, ShouldPublish: true});
      }

      $scope.editAssessment = function(){
        $uibModalInstance.close($scope.assessment);
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'partials/modals/newDistrictAssessmentModal.html',
          controller: 'EditAssessmentController',
          size: "lg",
          resolve: {
            assessment: function () {
              return $scope.assessment;
            }
          }
        });

        modalInstance.result.then(function (assessmentPackage:AssessmentPackage) {
          if(assessmentService.saveAssessment(assessmentPackage)){
            if(assessmentPackage.ShouldPublish){
              //change view to assign
            }
          }
        });
      }


    }


  }
}
