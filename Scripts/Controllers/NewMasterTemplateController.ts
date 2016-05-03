module INGAApp
{

  interface INewMasterTemplateScope extends BaseController.IScope
  {
    init: Function,
    newAssessment: Assessment,
    items: Array<string>,
    selected: SelectedItem,
    publish: Function,
    ok: Function,
    cancel: Function,
    gradeOptions: Array<Grade>,
    openAssessmentViewModal: Function,
    openNewAssessmentItemModal: Function
  }

  interface SelectedItem{
    item: string
  }

  export class NewMasterTemplateController extends BaseController.Controller
  {
    scope: INewMasterTemplateScope;
    static $inject = ['$scope', '$uibModalInstance', '$uibModal', 'mainService', 'assessment'];

    constructor( $scope: INewMasterTemplateScope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $uibModal: ng.ui.bootstrap.IModalService, mainService:MainService)
    {
      super( $scope );
      var controller = this;

      // if(assessment != undefined){
      //   $scope.newAssessment = assessment;
      // }

      $scope.gradeOptions = mainService.getGradeOptions();

      $scope.publish = function () {
        $uibModalInstance.close($scope.newAssessment);
        $scope.openAssessmentViewModal();
      };

      $scope.ok = function () {
        $uibModalInstance.close($scope.newAssessment);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

      $scope.openNewAssessmentItemModal = function (size) {
        $uibModalInstance.dismiss('hide');

        var modalInstance = $uibModal.open({
          animation: true,
          backdrop: 'static',
          templateUrl: 'partials/modals/newAssessmentItemModal.html',
          controller: 'NewAssessmentItemController',
          size: "lg",
          keyboard: false,
          resolve: {
            assessment: function () {
              return $scope.newAssessment;
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
              return $scope.newAssessment;
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
