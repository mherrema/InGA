namespace INGAApp {

  interface IValidateStudentsModalScope extends BaseController.IScope {
    assessment: DistrictAssessment;
    ok: Function;
    cancel: Function;
    openNewAssessmentModal: Function;
    newAssessmentItem: Item;
    itemTypeOptions: Array<ItemType>;
    init: Function;
  }


  export class ValidateStudentsModalController extends BaseController.Controller {
    scope: IValidateStudentsModalScope;
    static $inject = ["$scope", "$uibModalInstance", "$uibModal", "mainService", "classroomAssessmentKey", "dataEntryService"];

    constructor( $scope: IValidateStudentsModalScope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
      $uibModal: ng.ui.bootstrap.IModalService, mainService: MainService, classroomAssessmentKey: number,
    dataEntryService: DataEntryService) {
      super( $scope );
      let controller = this;

      // $scope.assessment = assessment;
      $scope.newAssessmentItem = {};
      $scope.newAssessmentItem.PointsMin = 0;
      $scope.newAssessmentItem.PointsMax = 10;
      $scope.newAssessmentItem.PointsStep = 1.0;
      $scope.newAssessmentItem.ItemType = {ItemTypeKey: 1, TypeName: "Multiple Choice"};

      $scope.itemTypeOptions = mainService.getItemTypeOptions();

      $scope.init = function(){
        dataEntryService.validateStudents(classroomAssessmentKey);
      };

      $scope.ok = function () {

        if ($scope.assessment.Items === undefined || $scope.assessment.Items.length === 0) {
          $scope.assessment.Items = [];
        }

        $scope.newAssessmentItem.ItemOrder = $scope.assessment.Items.length + 1;
        $scope.assessment.Items.push($scope.newAssessmentItem);


        $uibModalInstance.close($scope.assessment);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss("cancel");
      };

    }


  }
}
