module INGAApp
{

  interface INewAssessmentTemplateItemScope extends BaseController.IScope
  {
    init: Function,
    assessment: AssessmentTemplate,
    ok: Function,
    cancel: Function,
    openNewAssessmentModal: Function,
    newAssessmentItem: DistrictAssessmentItem,
    itemTypeOptions: Array<ItemType>,
    pointsStepOptions: Array<PointsStepOption>,
    initFormValidation: Function,
    standardOptions: Array<Standard>,
    getStandardOptions: Function
  }

  interface PointsStepOption{
    Title: string,
    Step: number
  }


  export class NewAssessmentTemplateItemModalController extends BaseController.Controller
  {
    scope: INewAssessmentTemplateItemScope;
    static $inject = ['$scope', '$uibModalInstance', '$uibModal', 'mainService', 'assessment'];

    constructor( $scope: INewAssessmentTemplateItemScope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $uibModal: ng.ui.bootstrap.IModalService, mainService:MainService, assessment:DistrictAssessment)
    {
      super( $scope );
      var controller = this;

      $scope.init = function(){
        $scope.assessment = assessment;
        $scope.newAssessmentItem = {};
        $scope.newAssessmentItem.Item = {};
        $scope.newAssessmentItem.Item.PointsMin = 0;
        $scope.newAssessmentItem.Item.PointsMax = 10;
        $scope.newAssessmentItem.Item.PointsStep = 1.0;
        $scope.newAssessmentItem.Item.ItemType = {ItemTypeKey: 1, TypeName: "Multiple Choice"};

        $scope.itemTypeOptions = mainService.getItemTypeOptions();
        $scope.pointsStepOptions = [{Step: 1.0, Title: "1.0"},{Step: 0.5, Title: "0.5"},{Step: 0.2, Title: "0.2"},{Step: 0.1, Title: "0.1"},{Step: 0, Title: "All Values In Range"}];

      }
      // $scope.initFormValidation = function(){
      //   // $scope.newAssessmentItemForm.PointsMin = 0;
      //   $scope.newAssessmentItemForm.PointsMin.$setValidity("pointsmin", ($scope.newAssessmentItem.PointsMin < $scope.newAssessmentItem.PointsMax));
      //   // console.log($scope.newAssessmentItemForm);
      // }

      $scope.getStandardOptions = function(searchString){
        // if(mainService.standardOptions == undefined || mainService.standardOptions.length < 1){
          return mainService.getStandardOptions(searchString).then(function(d: Array<Standard>){
            $scope.standardOptions = d;
            return d;
          });
        // }
        // else{
        //   $scope.standardOptions = mainService.standardOptions;
        // }
      }

      $scope.ok = function () {

        if($scope.assessment.AssessmentTemplateItems == undefined || $scope.assessment.AssessmentTemplateItems.length == 0){
          $scope.assessment.AssessmentTemplateItems = [];
        }

if($scope.newAssessmentItem.Item.Standard != null){
        $scope.newAssessmentItem.Item.StandardKey = $scope.newAssessmentItem.Item.Standard.StandardKey;
        $scope.newAssessmentItem.Item.StandardCode = $scope.newAssessmentItem.Item.Standard.StandardCode;
}

        $scope.newAssessmentItem.Item.ItemOrder = $scope.assessment.AssessmentTemplateItems.length + 1;
        $scope.assessment.AssessmentTemplateItems.push($scope.newAssessmentItem);


        $uibModalInstance.close($scope.assessment);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

      $scope.openNewAssessmentModal = function (size) {

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'partials/modals/newAssessmentModal.html',
          controller: 'NewAssessmentModalController',
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
