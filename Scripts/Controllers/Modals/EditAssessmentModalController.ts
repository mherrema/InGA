namespace INGAApp {

  interface IEditAssessmentScope extends BaseController.IScope {
    newAssessment: DistrictAssessment;
    originalAssessment: DistrictAssessment;

    gradeOptions: Array<GradeLevel>;
    subjectOptions: Array<Subject>;
    schoolYearOptions: Array<SchoolYear>;
    standardTypeOptions: Array<StandardType>;
    templateOptions: Array<AssessmentTemplate>;
    calendarOptions: Array<Calendar>;

    templateSelected: boolean;
    templateLocked: boolean;

    sortableOptions: SortableOptions;
    pageTitle: string;
    errors: ErrorObject;

    init: Function;
    publish: Function;
    ok: Function;
    cancel: Function;

    openAssessmentViewModal: Function;
    openNewAssessmentItemModal: Function;

    selectTemplate: Function;
    highlightTitle: Function;
    updateItemRanking: Function;
    removeItemAtIndex: Function;
    validateForm: Function;
    resetField: Function;

    getCalendarOptions: Function;
    getGradeOptions: Function;
    getSchoolYearOptions: Function;
    getSubjectOptions: Function;
    getStandardTypeOptions: Function;
    getAssessmentTemplateOptions: Function;
  }

  export class EditAssessmentModalController extends BaseController.Controller {
    scope: IEditAssessmentScope;
    static $inject = ["$scope", "$timeout", "$uibModalInstance", "$uibModal", "mainService", "assessmentService", "assessment"];

    constructor( $scope: IEditAssessmentScope, $timeout: ng.ITimeoutService, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $uibModal: ng.ui.bootstrap.IModalService, mainService: MainService, assessmentService: AssessmentService, assessment) {
      super( $scope );
      let controller = this;

      $scope.init = function(){
        $scope.pageTitle = "Edit Assessment";
        $scope.sortableOptions = {
          disabled: false,
          stop: function(){$scope.updateItemRanking(); }
        };
        if (assessment.Title !== undefined) {
          $scope.originalAssessment = angular.copy(assessment);
          $scope.newAssessment = assessment;
          $scope.pageTitle += " " + assessment.Title;
          if ($scope.newAssessment.AssessmentTemplate || $scope.newAssessment.AssessmentTemplateKey) {
            $scope.templateSelected = true;
            $scope.sortableOptions.disabled = true;
            $scope.templateLocked = true;
          }
          if (assessment.Template !== undefined && assessment.Template.Title !== undefined && assessment.Template.Title !== "None") {
            $scope.templateSelected = true;
          }
        }
        else {
          $scope.newAssessment = {Title: "New Assessment"};
        }

        if ($scope.newAssessment.Title === "New Assessment") {
          $timeout(function(){
            $scope.highlightTitle();
          }, 0);
        }

        $scope.errors = {};

        $scope.getGradeOptions();
        $scope.getSchoolYearOptions();
        $scope.getSubjectOptions();
        $scope.getStandardTypeOptions();
        $scope.getCalendarOptions();
        $scope.getAssessmentTemplateOptions();
      };

      $scope.publish = function () {
        if ($scope.validateForm()) {
          $uibModalInstance.close({Assessment: $scope.newAssessment, ShouldRefresh: true, ShouldPublish: true});
        }
      };

      $scope.ok = function () {
        if ($scope.validateForm()) {
          $uibModalInstance.close({Assessment: $scope.newAssessment, ShouldRefresh: true});
        }
      };

      $scope.cancel = function () {
        angular.copy($scope.originalAssessment, $scope.newAssessment);
        $uibModalInstance.dismiss("cancel");
      };



      $scope.openNewAssessmentItemModal = function (size) {
        let modalInstance = $uibModal.open({
          animation: true,
          backdrop: "static",
          templateUrl: "partials/modals/newAssessmentItemModal.html",
          controller: "NewAssessmentItemModalController",
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
        let modalInstance = $uibModal.open({
          animation: true,
          templateUrl: "partials/modals/viewAssessmentModal.html",
          controller: "AssessmentViewModalController",
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



      $scope.selectTemplate = function(){
        if ($scope.newAssessment.AssessmentTemplate.Title === "None") {
          $scope.sortableOptions.disabled = false;
          $scope.templateSelected = false;
          $scope.newAssessment.Subject = {};
          $scope.newAssessment.Calendar = {};
          $scope.newAssessment.StandardType = {};
          $scope.newAssessment.GradeLevel = {};
        }
        else {
          $scope.templateSelected = true;
          $scope.sortableOptions.disabled = true;
          $scope.newAssessment.Subject = $scope.newAssessment.AssessmentTemplate.Subject;
          $scope.newAssessment.Calendar = {CalendarKey: $scope.newAssessment.AssessmentTemplate.CalendarKey};
          $scope.newAssessment.StandardType = {StandardTypeKey: $scope.newAssessment.AssessmentTemplate.StandardTypeKey};
          $scope.newAssessment.GradeLevel = {GradeLevelKey: $scope.newAssessment.AssessmentTemplate.GradeLevelKey};
        }
      };

      $scope.highlightTitle = function(){
        $("#assessmentTitle").select();
      };

      $scope.updateItemRanking = function(){
        angular.forEach($scope.newAssessment.DistrictAssessmentItems, function(value: DistrictAssessmentItem, key) {
          value.Item.ItemOrder = key + 1;
        });
        console.log($scope.newAssessment.DistrictAssessmentItems);
      };

      $scope.removeItemAtIndex = function(index){
        $scope.newAssessment.DistrictAssessmentItems.splice(index, 1);
      };

      $scope.validateForm = function(){
        let errorFree = true;
        if ($scope.newAssessment.Title === undefined || $scope.newAssessment.Title === "") {
          $scope.errors.title = true;
          errorFree = false;
        }
        return errorFree;
      };

      $scope.resetField = function(field){
        if (field === "title") {
          $scope.errors.title = false;
        }
      };


      $scope.getCalendarOptions = function(){
        if (mainService.calendarOptions === undefined) {
          mainService.getCalendarOptions().then(function(d: Array<Calendar>){
            $scope.calendarOptions = d;
          });
        }
        else {
          $scope.calendarOptions = mainService.calendarOptions;
        }
      };

      $scope.getAssessmentTemplateOptions = function(){
        if (mainService.assessmentTemplateOptions === undefined) {
          mainService.getAssessmentTemplateOptions().then(function(d: Array<AssessmentTemplate>){
            $scope.templateOptions = d;
          });
        }
        else {
          $scope.templateOptions = mainService.assessmentTemplateOptions;
        }
      };

      $scope.getGradeOptions = function(){
        console.log("getting grade options");
        if (mainService.gradeOptions === undefined) {
          mainService.getGradeOptions().then(function(d: Array<GradeLevel>){
            $scope.gradeOptions = d;
          });
        }
        else {
          $scope.gradeOptions = mainService.gradeOptions;
        }
      };

      $scope.getSchoolYearOptions = function(){
        if (mainService.schoolYearOptions === undefined) {
          mainService.getSchoolYearOptions().then(function(d: Array<SchoolYear>){
            $scope.schoolYearOptions = d;
          });
        }
        else {
          $scope.schoolYearOptions = mainService.schoolYearOptions;
        }
      };

      $scope.getSubjectOptions = function(){
        if (mainService.subjectOptions === undefined) {
          mainService.getSubjectOptions().then(function(d: Array<Subject>){
            $scope.subjectOptions = d;
          });
        }
        else {
          $scope.subjectOptions = mainService.subjectOptions;
        }
      };

      $scope.getStandardTypeOptions = function(){
        if (mainService.standardTypeOptions === undefined) {
          mainService.getStandardTypeOptions().then(function(d: Array<StandardType>){
            $scope.standardTypeOptions = d;
          });
        }
        else {
          $scope.standardTypeOptions = mainService.standardTypeOptions;
        }
      };
    }
  }
}
