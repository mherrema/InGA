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
    openNewMasterTemplateModal: Function
  }

  export class MainController extends BaseController.Controller
  {
    scope: IMainScope;
    static $inject = ['$scope', '$log', '$uibModal'];

    constructor( $scope: IMainScope, $log: ng.ILogService, $uibModal: ng.ui.bootstrap.IModalService)
    {
      super( $scope );
      var controller = this;

      $scope.init = function(){
        $scope.test = "hello"
        $scope.pageTypeTitle = "INGA";
        $scope.pageTitle = "Assessment Management";
      }

      $scope.items = ['item1', 'item2', 'item3'];

      $scope.openNewAssessmentModal = function (size) {

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'partials/modals/newAssessmentModal.html',
          controller: 'NewAssessmentController',
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

      $scope.openNewMasterTemplateModal = function () {

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'partials/modals/newMasterTemplateModal.html',
          controller: 'NewMasterTemplateController',
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



    }


  }
}
