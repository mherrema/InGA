module INGAApp
{

  export interface IMainScope extends BaseController.IScope
  {
    init: Function,
    test: string,
    pageTypeTitle: string,
    pageTitle: string,
    openNewAssessmentModal: Function,
    items: Array<string>,
    openNewMasterTemplateModal: Function,
    inAssessmentManagement: boolean,
    inScoreEntry: boolean,
    goToDataEntry: Function
  }

  export class MainController extends BaseController.Controller
  {
    scope: IMainScope;
    static $inject = ['$scope', '$location', '$log', '$uibModal', 'mainService', 'assessmentService'];

    constructor( $scope: IMainScope, $location: ng.ILocationService, $log: ng.ILogService, $uibModal: ng.ui.bootstrap.IModalService, mainService: MainService, assessmentService: AssessmentService)
    {
      super( $scope );
      var controller = this;

      $scope.init = function(){

        $scope.$watch(() => mainService.pageTitle,
        (newValue: string, oldValue: string) => {
          $scope.pageTitle = newValue;
        });

        $scope.$watch(() => mainService.pageTypeTitle,
        (newValue: string, oldValue: string) => {
          $scope.pageTypeTitle = newValue;
        });

        $scope.$watch(() => mainService.inAssessmentManagement,
        (newValue: boolean, oldValue: boolean) => {
          $scope.inAssessmentManagement = newValue;
        });

        $scope.$watch(() => mainService.inScoreEntry,
        (newValue: boolean, oldValue: boolean) => {
          $scope.inScoreEntry = newValue;
        });
      }

      $scope.openNewAssessmentModal = function (size) {

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'partials/modals/newDistrictAssessmentModal.html',
          controller: 'NewAssessmentController',
          size: "lg",
          resolve: {
            assessment: function () {
              return {};
            }
          }
        });

        modalInstance.result.then(function (assessmentPackage: AssessmentPackage) {
          console.log(assessmentPackage.Assessment);
          if(assessmentService.saveAssessment(assessmentPackage)){
            if(assessmentPackage.ShouldPublish){
              console.log("Going to assessment view");
              //go to assessment view
            }
          }
        });
      };

      $scope.openNewMasterTemplateModal = function () {

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'partials/modals/newAssessmentTemplateModal.html',
          controller: 'NewAssessmentTemplateController',
          size: "lg",
          resolve: {
            assessment: function () {
              return {};
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          console.log(selectedItem);
        });
      };

      $scope.goToDataEntry = function(){
        $location.path("/dataEntry");
      }

    }


  }
}
