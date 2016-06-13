namespace INGAApp {

  interface INewAssessmentItemScope extends BaseController.IScope {
    assessment: DistrictAssessment;

    newAssessmentItem: DistrictAssessmentItem;
    itemTypeOptions: Array<ItemType>;
    pointsStepOptions: Array<PointsStepOption>;
    standardOptions: Array<Standard>;

    init: Function;
    ok: Function;
    cancel: Function;
    openNewAssessmentModal: Function;

    getStandardOptions: Function;
  }


  export class NewAssessmentItemModalController extends BaseController.Controller {
    scope: INewAssessmentItemScope;
    static $inject = ["$scope", "$uibModalInstance", "$uibModal", "mainService", "assessment"];

    constructor( $scope: INewAssessmentItemScope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $uibModal: ng.ui.bootstrap.IModalService, mainService: MainService, assessment: DistrictAssessment) {
      super( $scope );
      let controller = this;

      $scope.init = function() {
        $scope.assessment = assessment;
        $scope.newAssessmentItem = {};
        $scope.newAssessmentItem.Item = {};
        $scope.newAssessmentItem.Item.PointsMin = 0;
        $scope.newAssessmentItem.Item.PointsMax = 10;
        $scope.newAssessmentItem.Item.PointsStep = 1.0;
        $scope.newAssessmentItem.Item.ItemType = {ItemTypeKey: 1, TypeName: "Multiple Choice"};

        $scope.itemTypeOptions = mainService.getItemTypeOptions();
        $scope.pointsStepOptions = [{Step: 1.0, Title: "1.0"}, {Step: 0.5, Title: "0.5"}, {Step: 0.2, Title: "0.2"}, {Step: 0.1, Title: "0.1"}, {Step: 0, Title: "All Values In Range"}];
      };

      $scope.ok = function () {
        if ($scope.assessment.DistrictAssessmentItems === undefined || $scope.assessment.DistrictAssessmentItems.length === 0) {
          $scope.assessment.DistrictAssessmentItems = [];
        }
        if ($scope.newAssessmentItem.Item.Standard != null) {
          $scope.newAssessmentItem.Item.StandardKey = $scope.newAssessmentItem.Item.Standard.StandardKey;
          $scope.newAssessmentItem.Item.StandardCode = $scope.newAssessmentItem.Item.Standard.StandardCode;
        }

        $scope.newAssessmentItem.Item.ItemOrder = $scope.assessment.DistrictAssessmentItems.length + 1;
        $scope.assessment.DistrictAssessmentItems.push($scope.newAssessmentItem);

        $uibModalInstance.close($scope.assessment);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss("cancel");
      };

      $scope.openNewAssessmentModal = function (size) {

        let modalInstance = $uibModal.open({
          animation: true,
          templateUrl: "partials/modals/newAssessmentModal.html",
          controller: "NewAssessmentModalController",
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

      $scope.getStandardOptions = function(searchString){
          return mainService.getStandardOptions(searchString).then(function(options: Array<Standard>){
            $scope.standardOptions = options;
            return options;
          });
      };
    }
  }
}
