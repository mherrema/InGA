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
    templateSelected: boolean,
    highlightTitle: Function,
    sortableOptions: SortableOptions,
    pageTitle: string
  }

  interface SelectedItem{
    item: string
  }

  interface SortableOptions{
    disabled: boolean
  }

  export class EditAssessmentController extends BaseController.Controller
  {
    scope: INewAssessmentScope;
    static $inject = ['$scope', '$timeout', '$uibModalInstance', '$uibModal', 'mainService', 'assessmentService', 'assessment'];

    constructor( $scope: INewAssessmentScope, $timeout: ng.ITimeoutService, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $uibModal: ng.ui.bootstrap.IModalService, mainService:MainService, assessmentService: AssessmentService, assessment)
    {
      super( $scope );
      var controller = this;

      $scope.init = function(){
        $scope.pageTitle = "Edit Assessment";
        if(assessment.Title != undefined){
          $scope.newAssessment = assessment;
          $scope.pageTitle += " " + assessment.Title;
          if(assessment.Template != undefined && assessment.Template.Title != undefined && assessment.Template.Title != "None"){
            $scope.templateSelected = true;
          }
        }
        else{
          $scope.newAssessment = {Title: "New Assessment"};
        }

        $scope.sortableOptions = {
          disabled: false
        };

        $scope.gradeOptions = mainService.getGradeOptions();
        $scope.subjectOptions = mainService.getSubjectOptions();
        $scope.schoolYearOptions = mainService.getSchoolYearOptions();
        $scope.standardTypeOptions = mainService.getStandardTypeOptions();
        $scope.templateOptions = mainService.getTemplateOptions();
        $scope.calendarOptions = mainService.getCalendarOptions();
        if($scope.newAssessment.Title == "New Assessment"){
          $timeout(function(){
            $scope.highlightTitle();
          },0);
        }
      }



      $scope.selectTemplate = function(){
        if($scope.newAssessment.AssessmentTemplate.Title == "None"){
          $scope.sortableOptions = {
            disabled: false
          };
          $scope.templateSelected = false;
          $scope.newAssessment.Subject = {};
          $scope.newAssessment.Calendar = {};
          $scope.newAssessment.StandardType = {};
          $scope.newAssessment.GradeLevel = {};
        }
        else{
          $scope.templateSelected = true;
          $scope.sortableOptions = {
            disabled: true
          };
          $scope.newAssessment.Subject = $scope.newAssessment.AssessmentTemplate.Subject;
          $scope.newAssessment.Calendar = {CalendarKey: $scope.newAssessment.AssessmentTemplate.CalendarKey};
          $scope.newAssessment.StandardType = {StandardTypeKey: $scope.newAssessment.AssessmentTemplate.StandardTypeKey};
          $scope.newAssessment.GradeLevel = {GradeLevelKey: $scope.newAssessment.AssessmentTemplate.GradeLevelKey};
        }
      }

      $scope.highlightTitle = function(){
        $("#assessmentTitle").select();
      }





      $scope.publish = function () {
        console.log("Publish Assessment");
        $uibModalInstance.close({Assessment:$scope.newAssessment, ShouldRefresh: true, ShouldPublish: true});
        //$scope.openAssessmentViewModal();
      };

      $scope.ok = function () {
        console.log("Saving Assessment");
        $uibModalInstance.close({Assessment:$scope.newAssessment, ShouldRefresh: true});
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

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
          size: "extra-wide",
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
