module INGAApp
{

  interface IAssessmentViewScope extends BaseController.IScope
  {
    assessment: Assessment,
    ok: Function,
    cancel: Function
  }

  interface SelectedItem{
    item: string
  }

  export class AssessmentViewController extends BaseController.Controller
  {
    scope: IAssessmentViewScope;
    static $inject = ['$scope', '$uibModalInstance', '$uibModal', 'mainService', 'assessment'];

    constructor( $scope: IAssessmentViewScope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $uibModal: ng.ui.bootstrap.IModalService, mainService:MainService, assessment:Assessment)
    {
      super( $scope );
      var controller = this;

      $scope.assessment = assessment;

      $scope.ok = function () {
        $uibModalInstance.close($scope.assessment);
        // $scope.openAssessmentViewModal();
      };



    }


  }
}
