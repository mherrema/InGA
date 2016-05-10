module INGAApp
{

  interface INewAssessmentItemScope extends BaseController.IScope
  {
    assessment: DistrictAssessment,
    ok: Function,
    cancel: Function,
    openNewAssessmentModal: Function,
    newAssessmentItem: Item,
    itemTypeOptions: Array<ItemType>,
    pointsStepOptions: Array<PointsStepOption>,
    newAssessmentItemForm: NewItemForm,
    initFormValidation: Function
  }

  interface SelectedItem{
    item: string
  }

  interface NewItemForm extends ng.IFormController {
    ItemType?: ItemType,
    PointsMin: ng.INgModelController
  }

  interface PointsStepOption{
    Title: string,
    Step: number
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
      $scope.newAssessmentItem = {};
      $scope.newAssessmentItem.PointsMin = 0;
      $scope.newAssessmentItem.PointsMax = 10;
      $scope.newAssessmentItem.PointsStep = 1.0;
      $scope.newAssessmentItem.ItemType = {ItemTypeKey: 1, TypeName: "Multiple Choice"};

      $scope.itemTypeOptions = mainService.getItemTypeOptions();
      $scope.pointsStepOptions = [{Step: 1.0, Title: "1.0"},{Step: 0.5, Title: "0.5"},{Step: 0.2, Title: "0.2"},{Step: 0.1, Title: "0.1"},{Step: 0, Title: "All Values In Range"}];

      $scope.initFormValidation = function(){
        // $scope.newAssessmentItemForm.PointsMin = 0;
        $scope.newAssessmentItemForm.PointsMin.$setValidity("pointsmin", ($scope.newAssessmentItem.PointsMin < $scope.newAssessmentItem.PointsMax));
        // console.log($scope.newAssessmentItemForm);
      }

      $scope.ok = function () {

        if($scope.assessment.Items == undefined || $scope.assessment.Items.length == 0){
          $scope.assessment.Items = [];
        }

        $scope.newAssessmentItem.ItemOrder = $scope.assessment.Items.length + 1;
        $scope.assessment.Items.push($scope.newAssessmentItem);


        $uibModalInstance.close($scope.assessment);
        // $scope.openNewAssessmentModal();
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        // $scope.openNewAssessmentModal();
      };

      $scope.openNewAssessmentModal = function (size) {

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'partials/modals/newDistrictAssessmentModal.html',
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
