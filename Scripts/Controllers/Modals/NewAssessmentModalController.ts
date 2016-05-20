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
    pageTitle: string,
    updateItemRanking: Function,
    getCalendarOptions: Function,
    getGradeOptions: Function,
    getSchoolYearOptions: Function,
    getSubjectOptions: Function,
    getStandardTypeOptions: Function
  }

  interface SelectedItem{
    item: string
  }

  export class NewAssessmentModalController extends BaseController.Controller
  {
    scope: INewAssessmentScope;
    static $inject = ['$scope', '$timeout', '$uibModalInstance', '$uibModal', 'mainService', 'assessment'];

    constructor( $scope: INewAssessmentScope, $timeout: ng.ITimeoutService, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $uibModal: ng.ui.bootstrap.IModalService, mainService:MainService, assessment)
    {
      super( $scope );
      var controller = this;

      $scope.init = function(){
        $scope.pageTitle = "Create New Assessment";
        if(assessment.Title != undefined){
          $scope.newAssessment = assessment;
          if(assessment.Template != undefined && assessment.Template.Title != undefined && assessment.Template.Title != "None"){
            $scope.templateSelected = true;
          }
        }
        else{
          $scope.newAssessment = {Title: "New Assessment"};
        }

        $scope.sortableOptions = {
          disabled: false,
          stop: function(){$scope.updateItemRanking()}
        };

        $scope.getGradeOptions();
        $scope.getSchoolYearOptions();
        $scope.getSubjectOptions();
        $scope.getStandardTypeOptions();
        $scope.getCalendarOptions();
        $scope.templateOptions = mainService.getTemplateOptions();
        // $scope.calendarOptions = mainService.getCalendarOptions();
        if($scope.newAssessment.Title == "New Assessment"){
          $timeout(function(){
            $scope.highlightTitle();
          },0);
        }
      }

      $scope.getCalendarOptions = function(){
        if(mainService.calendarOptions == undefined){
          mainService.getCalendarOptions().then(function(d: Array<Calendar>){
            $scope.calendarOptions = d;
          });;
        }
        else{
          $scope.calendarOptions = mainService.calendarOptions;
        }
      }

      $scope.getGradeOptions = function(){
        console.log("getting grade options");
        if(mainService.gradeOptions == undefined){
          mainService.getGradeOptions().then(function(d: Array<GradeLevel>){
            $scope.gradeOptions = d;
          });
        }
        else{
          $scope.gradeOptions = mainService.gradeOptions;
        }
      }

      $scope.getSchoolYearOptions = function(){
        if(mainService.schoolYearOptions == undefined){
          mainService.getSchoolYearOptions().then(function(d: Array<SchoolYear>){
            $scope.schoolYearOptions = d;
          });;
        }
        else{
          $scope.schoolYearOptions = mainService.schoolYearOptions;
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

      $scope.selectTemplate = function(){
        if($scope.newAssessment.AssessmentTemplate.Title == "None"){
          $scope.sortableOptions.disabled = false;
          $scope.templateSelected = false;
          $scope.newAssessment.Subject = {};
          $scope.newAssessment.Calendar = {};
          $scope.newAssessment.StandardType = {};
          $scope.newAssessment.GradeLevel = {};
        }
        else{
          $scope.templateSelected = true;
          $scope.sortableOptions.disabled = false;
          $scope.newAssessment.Subject = $scope.newAssessment.AssessmentTemplate.Subject;
          $scope.newAssessment.Calendar = {CalendarKey: $scope.newAssessment.AssessmentTemplate.CalendarKey};
          $scope.newAssessment.StandardType = {StandardTypeKey: $scope.newAssessment.AssessmentTemplate.StandardTypeKey};
          $scope.newAssessment.GradeLevel = {GradeLevelKey: $scope.newAssessment.AssessmentTemplate.GradeLevelKey};
        }
      }

      $scope.highlightTitle = function(){
        $("#assessmentTitle").select();
      }


      $scope.updateItemRanking = function(){
        angular.forEach($scope.newAssessment.Items, function(value: Item, key) {
          value.ItemOrder = key+1;
        });
        console.log($scope.newAssessment.Items);
      }


      $scope.publish = function () {
        console.log("Publish Assessment");
        $uibModalInstance.close({Assessment: $scope.newAssessment, ShouldRefresh: false, ShouldPublish: true});
        //$scope.openAssessmentViewModal();
      };

      $scope.ok = function () {
        console.log("Saving Assessment");
        $uibModalInstance.close({Assessment: $scope.newAssessment, ShouldRefresh: false});
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
          controller: 'NewAssessmentItemModalController',
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
          templateUrl: 'partials/modals/viewAssessmentModal.html',
          controller: 'AssessmentViewModalController',
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
