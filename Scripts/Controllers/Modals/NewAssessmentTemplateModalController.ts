namespace INGAApp {

  interface INewAssessmentTemplateScope extends BaseController.IScope {
    init: Function;
    newAssessmentTemplate: AssessmentTemplate;
    items: Array<string>;
    makeAvailableToUsers: Function;
    ok: Function;
    cancel: Function;
    openAssessmentViewModal: Function;
    openNewAssessmentItemModal: Function;
    updateItemRanking: Function;
    sortableOptions: SortableOptions;
    getGradeOptions: Function;
    getSubjectOptions: Function;
    getStandardTypeOptions: Function;
    getDistrictOptions: Function;
    gradeOptions: Array<GradeLevel>;
    subjectOptions: Array<Subject>;
    standardTypeOptions: Array<StandardType>;
    calendarOptions: Array<Calendar>;
    districtOptions: Array<District>;
    getCalendarOptions: Function;
    pageTitle: string;
    highlightTitle: Function;
    removeItemAtIndex: Function;
    validateForm: Function;
    errorText: string;
    errors: ErrorObject;
    resetField: Function;
  }

  export class NewAssessmentTemplateModalController extends BaseController.Controller {
    scope: INewAssessmentTemplateScope;
    static $inject = ["$scope", "$timeout", "$uibModalInstance", "$uibModal", "mainService", "assessment"];

    constructor( $scope: INewAssessmentTemplateScope, $timeout: ng.ITimeoutService, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
      $uibModal: ng.ui.bootstrap.IModalService, mainService: MainService) {
      super( $scope );
      let controller = this;

      $scope.init = function(){
        $scope.pageTitle = "Create New Assessment Template";
        $scope.sortableOptions = {
          disabled: false,
          stop: function(){$scope.updateItemRanking(); }
        };


          $scope.newAssessmentTemplate = {Title: "New Assessment Template"};
            $timeout(function(){
              $scope.highlightTitle();
            }, 0);

            $scope.errors = {};

            $scope.newAssessmentTemplate.SelectedCalendar = {};

        $scope.getGradeOptions();
        $scope.getSubjectOptions();
        $scope.getStandardTypeOptions();
        $scope.getDistrictOptions();
      };

      $scope.removeItemAtIndex = function(index){
        $scope.newAssessmentTemplate.AssessmentTemplateItems.splice(index, 1);
          $scope.updateItemRanking();
      };

      $scope.highlightTitle = function(){
        $("#assessmentTemplateTitle").select();
      };

      $scope.getDistrictOptions = function(){
        if (mainService.districtOptions === undefined) {
          mainService.getDistrictOptions().then(function(d: Array<District>){
            $scope.districtOptions = d;
          });
        }
        else {
          $scope.districtOptions = mainService.districtOptions;
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

      $scope.validateForm = function(){
        let errorFree = true;
        if ($scope.newAssessmentTemplate.Title === undefined || $scope.newAssessmentTemplate.Title === "") {
          $scope.errorText = "The assessment template must have a title";
          $scope.errors.title = true;
          errorFree = false;
        }
        if ($scope.newAssessmentTemplate.District === undefined) {
          $scope.errorText = "The assessment template must be associated with a district";
          $scope.errors.district = true;
          errorFree = false;
        }
        // if ($scope.newAssessmentTemplate.Calendar === undefined) {
        //   $scope.errorText = "The assessment template must be associated with a calendar";
        //   $scope.errors.calendar = true;
        //   errorFree = false;
        // }
        if ($scope.newAssessmentTemplate.GradeLevel === undefined) {
          $scope.errorText = "The assessment must be associated with a grade level";
          $scope.errors.gradeLevel = true;
          errorFree = false;
        }
        if ($scope.newAssessmentTemplate.Subject === undefined) {
          $scope.errorText = "The assessment must be associated with a subject";
          $scope.errors.subject = true;
          errorFree = false;
        }
        if ($scope.newAssessmentTemplate.StandardType === undefined) {
          $scope.errorText = "The assessment must be associated with a standard type";
          $scope.errors.standardType = true;
          errorFree = false;
        }
        return errorFree;
      };

      $scope.resetField = function(field){
        if (field === "title") {
          $scope.errors.title = false;
        }
        if (field === "district") {
          $scope.errors.district = false;
        }
        if (field === "calendar") {
          $scope.errors.calendar = false;
        }
        if (field === "gradeLevel") {
          $scope.errors.gradeLevel = false;
        }
        if (field === "subject") {
          $scope.errors.subject = false;
        }
        if (field === "standardType") {
          $scope.errors.standardType = false;
        }
      };

      $scope.makeAvailableToUsers = function(){
        console.log("Publish button clicked");
        // assessmentService.updateAssessmentTemplate({AssessmentTemplate: $scope.newAssessmentTemplate, ShouldRefresh: true, ShouldMakeAvailableToUsers: true});
        if ($scope.validateForm()) {
          $uibModalInstance.close({AssessmentTemplate: $scope.newAssessmentTemplate, ShouldRefresh: false, ShouldMakeAvailableToUsers: true});
        }
      };

      $scope.ok = function () {
        if ($scope.validateForm()) {
          $uibModalInstance.close({AssessmentTemplate: $scope.newAssessmentTemplate, ShouldRefresh: false});
        }
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss("cancel");
      };

      $scope.updateItemRanking = function(){
        angular.forEach($scope.newAssessmentTemplate.AssessmentTemplateItems, function(value: AssessmentTemplateItem, key) {
          value.Item.ItemOrder = key + 1;
        });
        console.log($scope.newAssessmentTemplate.Items);
      };

      $scope.openNewAssessmentItemModal = function (size) {
        let modalInstance = $uibModal.open({
          animation: true,
          backdrop: "static",
          templateUrl: "partials/modals/newAssessmentItemModal.html",
          controller: "NewAssessmentTemplateItemModalController",
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

        let modalInstance = $uibModal.open({
          animation: true,
          templateUrl: "partials/modals/viewAssessmentModal.html",
          controller: "AssessmentViewModalController",
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
