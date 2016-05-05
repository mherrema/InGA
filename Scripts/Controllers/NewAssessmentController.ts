module INGAApp
{

  interface INewAssessmentScope extends BaseController.IScope
  {
    init: Function,
    newAssessment: DistrictAssessment,
    items: Array<string>,
    selected: SelectedItem,
    publish: Function,
    ok: Function,
    cancel: Function,
    gradeOptions: Array<GradeLevel>,
    subjectOptions: Array<Subject>,
    schoolYearOptions: Array<SchoolYear>,
    standardTypeOptions: Array<StandardType>,
    templateOptions: Array<AssessmentTemplate>,
    calendarOptions: Array<Calendar>,
    openAssessmentViewModal: Function,
    openNewAssessmentItemModal: Function,
    selectTemplate: Function,
    templateSelected: boolean
  }

  interface SelectedItem{
    item: string
  }

  export class NewAssessmentController extends BaseController.Controller
  {
    scope: INewAssessmentScope;
    static $inject = ['$scope', '$uibModalInstance', '$uibModal', 'mainService', 'assessment'];

    constructor( $scope: INewAssessmentScope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $uibModal: ng.ui.bootstrap.IModalService, mainService:MainService, assessment)
    {
      super( $scope );
      var controller = this;

      if(assessment.Title != undefined){
        $scope.newAssessment = assessment;
        if(assessment.Template.Title != undefined && assessment.Template.Title != "None"){
          $scope.templateSelected = true;
        }
      }

      $scope.gradeOptions = mainService.getGradeOptions();
      $scope.subjectOptions = mainService.getSubjectOptions();
      $scope.schoolYearOptions = mainService.getSchoolYearOptions();
      $scope.standardTypeOptions = mainService.getStandardTypeOptions();
      $scope.templateOptions = mainService.getTemplateOptions();
      $scope.calendarOptions = mainService.getCalendarOptions();



      $scope.selectTemplate = function(){
        if($scope.newAssessment.Template.Title == "None"){
          $scope.templateSelected = false;
          $scope.newAssessment.Subject = {};
          $scope.newAssessment.Calendar = {};
          $scope.newAssessment.StandardType = {};
          $scope.newAssessment.GradeLevel = {};
        }
        else{
          $scope.templateSelected = true;
          $scope.newAssessment.Subject = {SubjectKey: $scope.newAssessment.Template.SubjectKey};
          $scope.newAssessment.Calendar = {CalendarKey: $scope.newAssessment.Template.CalendarKey};
          $scope.newAssessment.StandardType = {StandardTypeKey: $scope.newAssessment.Template.StandardTypeKey};
          $scope.newAssessment.GradeLevel = {GradeLevelKey: $scope.newAssessment.Template.GradeLevelKey};
        }
      }





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
