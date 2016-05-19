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
    openAssessmentViewModal: Function,
    openNewAssessmentItemModal: Function,
    updateItemRanking: Function,
    sortableOptions: SortableOptions,
    getGradeOptions: Function,
    getSubjectOptions: Function,
    getStandardTypeOptions: Function,
    gradeOptions: Array<GradeLevel>,
    subjectOptions: Array<Subject>,
    standardTypeOptions: Array<StandardType>
  }

  interface SelectedItem{
    item: string
  }

  export class NewAssessmentTemplateModalController extends BaseController.Controller
  {
    scope: INewAssessmentTemplateScope;
    static $inject = ['$scope', '$uibModalInstance', '$uibModal', 'mainService', 'assessment'];

    constructor( $scope: INewAssessmentTemplateScope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $uibModal: ng.ui.bootstrap.IModalService, mainService:MainService)
    {
      super( $scope );
      var controller = this;

      $scope.init = function(){
        $scope.sortableOptions = {
          disabled: false,
          stop: function(){$scope.updateItemRanking()}
        };

        $scope.getGradeOptions();
        $scope.getSubjectOptions();
        $scope.getStandardTypeOptions();
      }

      $scope.getGradeOptions = function(){
        console.log("getting grade options");
        if(mainService.gradeOptions == undefined){
          mainService.getGradeOptions().then(function(d: Array<GradeLevel>){
            $scope.gradeOptions = d;
          });;
        }
        else{
          $scope.gradeOptions = mainService.gradeOptions;
        }
      }

      $scope.getSubjectOptions = function(){
        if(mainService.subjectOptions == undefined){
          mainService.getSubjectOptions().then(function(d: Array<Subject>){
            $scope.subjectOptions = d;
          });;
        }
        else{
          $scope.subjectOptions = mainService.subjectOptions;
        }
      }

      $scope.getStandardTypeOptions = function(){
        if(mainService.standardTypeOptions == undefined){
          mainService.getStandardTypeOptions().then(function(d: Array<StandardType>){
            $scope.standardTypeOptions = d;
          });
        }
        else{
          $scope.standardTypeOptions = mainService.standardTypeOptions;
        }
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
        var modalInstance = $uibModal.open({
          animation: true,
          backdrop: 'static',
          templateUrl: 'partials/modals/newAssessmentItemModal.html',
          controller: 'NewAssessmentItemModalController',
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
          templateUrl: 'partials/modals/viewAssessmentModal.html',
          controller: 'AssessmentViewModalController',
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
