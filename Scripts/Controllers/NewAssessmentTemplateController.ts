module INGAApp
{

  interface INewAssessmentTemplateScope extends BaseController.IScope
  {
    init: Function,
    newAssessmentTemplate: AssessmentTemplate,
    items: Array<string>,
    selected: SelectedItem,
    publish: Function,
    ok: Function,
    cancel: Function,
    gradeOptions: Array<GradeLevel>,
    openAssessmentViewModal: Function,
    openNewAssessmentItemModal: Function,
    updateItemRanking: Function,
    sortableOptions: SortableOptions
  }

  interface SelectedItem{
    item: string
  }

  export class NewAssessmentTemplateController extends BaseController.Controller
  {
    scope: INewAssessmentTemplateScope;
    static $inject = ['$scope', '$uibModalInstance', '$uibModal', 'mainService', 'assessment'];

    constructor( $scope: INewAssessmentTemplateScope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $uibModal: ng.ui.bootstrap.IModalService, mainService:MainService)
    {
      super( $scope );
      var controller = this;

      // if(assessment != undefined){
      //   $scope.newAssessment = assessment;
      // }

      $scope.init = function(){
        $scope.gradeOptions = mainService.getGradeOptions();
        $scope.sortableOptions = {
          disabled: false,
          stop: function(){$scope.updateItemRanking()}
        };
      }

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

      $scope.updateItemRanking = function(){
        angular.forEach($scope.newAssessmentTemplate.Items, function(value: Item, key) {
          value.ItemOrder = key+1;
        });
        console.log($scope.newAssessmentTemplate.Items);
      }

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


  }
}
