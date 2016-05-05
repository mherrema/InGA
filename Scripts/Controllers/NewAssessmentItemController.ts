module INGAApp
{

  interface INewAssessmentItemScope extends BaseController.IScope
  {
    assessment: DistrictAssessment,
    ok: Function,
    cancel: Function,
    openNewAssessmentModal: Function
  }

  interface SelectedItem{
    item: string
  }

  export class NewAssessmentItemController extends BaseController.Controller
  {
    scope: INewAssessmentItemScope;
    static $inject = ['$scope', '$uibModalInstance', '$uibModal', 'mainService', 'assessment'];

    constructor( $scope: INewAssessmentItemScope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $uibModal: ng.ui.bootstrap.IModalService, mainService:MainService, assessment:DistrictAssessment)
    {
      super( $scope );
      var controller = this;

      $scope.assessment = assessment;

      $scope.ok = function () {


        //add the item to the assessment first


        $uibModalInstance.close($scope.assessment);
        $scope.openNewAssessmentModal();
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        $scope.openNewAssessmentModal();
      };

      $scope.openNewAssessmentModal = function (size) {

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'partials/modals/newAssessmentModal.html',
          controller: 'NewAssessmentController',
          size: "lg",
          resolve: {
            assessment: function () {
              return $scope.assessment;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          console.log(selectedItem);
        });
      };

    }


  }
}
