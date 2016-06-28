namespace INGAApp {

  interface INewAssessmentScope extends BaseController.IScope {
    init: Function;
    newAssessment: DistrictAssessment;
    items: Array<string>;
    publish: Function;
    ok: Function;
    cancel: Function;
    gradeOptions: Array<GradeLevel>;
    subjectOptions: Array<Subject>;
    schoolYearOptions: Array<SchoolYear>;
    standardTypeOptions: Array<StandardType>;
    templateOptions: Array<AssessmentTemplate>;
    calendarOptions: Array<Calendar>;
    districtOptions: Array<District>;
    openAssessmentViewModal: Function;
    openNewAssessmentItemModal: Function;
    selectTemplate: Function;
    templateSelected: boolean;
    highlightTitle: Function;
    sortableOptions: SortableOptions;
    pageTitle: string;
    updateItemRanking: Function;
    getDistrictOptions: Function;
    getCalendarOptions: Function;
    getGradeOptions: Function;
    getSchoolYearOptions: Function;
    getSubjectOptions: Function;
    getStandardTypeOptions: Function;
    getAssessmentTemplateOptions: Function;
    multipleDistrictOptions: boolean;
    removeItemAtIndex: Function;
    editItemAtIndex: Function;
    validateForm: Function;
    errorText: string;
    errors: ErrorObject;
    resetField: Function;
  }

  export class NewAssessmentModalController extends BaseController.Controller {
    scope: INewAssessmentScope;
    static $inject = ["$scope", "$timeout", "$uibModalInstance", "$uibModal", "mainService", "assessment"];

    constructor( $scope: INewAssessmentScope, $timeout: ng.ITimeoutService, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $uibModal: ng.ui.bootstrap.IModalService, mainService: MainService, assessment) {
      super( $scope );
      let controller = this;

      $scope.init = function(){
        $scope.pageTitle = "Create New Assessment";
        if (assessment.Title !== undefined) {
          $scope.newAssessment = assessment;
          if (assessment.Template !== undefined && assessment.Template.Title !== undefined && assessment.Template.Title !== "None") {
            $scope.templateSelected = true;
          }
        }
        else {
          $scope.newAssessment = {Title: "New Assessment"};
          $scope.newAssessment.SelectedCalendar = {};
        }

        $scope.sortableOptions = {
          disabled: false,
          stop: function(){$scope.updateItemRanking(); }
        };

        $scope.errors = {};

        $scope.multipleDistrictOptions = false;

        $scope.getDistrictOptions();
        $scope.getGradeOptions();
        $scope.getSchoolYearOptions();
        $scope.getSubjectOptions();
        $scope.getStandardTypeOptions();
        $scope.getCalendarOptions();
        $scope.getAssessmentTemplateOptions();
        if ($scope.newAssessment.Title === "New Assessment") {
          $timeout(function(){
            $scope.highlightTitle();
          }, 0);
        }
      };

      $scope.getAssessmentTemplateOptions = function(){
        if (mainService.assessmentTemplateOptions === undefined || mainService.assessmentTemplateOptions.length < 1) {
          mainService.getAssessmentTemplateOptions().then(function(d: Array<AssessmentTemplate>){
            $scope.templateOptions = d;
          });
        }
        else {
          $scope.templateOptions = mainService.assessmentTemplateOptions;
        }
      };

      $scope.getDistrictOptions = function(){
        if (mainService.districtOptions === undefined || mainService.districtOptions.length < 1) {
          mainService.getDistrictOptions().then(function(d: Array<District>){
            $scope.districtOptions = d;
            if ($scope.districtOptions.length > 1) {
              $scope.multipleDistrictOptions = true;
            }
            else {
              $scope.multipleDistrictOptions = false;
              if ($scope.districtOptions.length === 1) {
                $scope.newAssessment.DistrictKey = $scope.districtOptions[0].DistrictKey;
              }
            }
          });
        }
        else {
          $scope.districtOptions = mainService.districtOptions;
          if ($scope.districtOptions.length > 1) {
            $scope.multipleDistrictOptions = true;
          }
          else {
            $scope.multipleDistrictOptions = false;
            if ($scope.districtOptions.length === 1) {
              $scope.newAssessment.DistrictKey = $scope.districtOptions[0].DistrictKey;
            }
          }
        }
      };

      $scope.getCalendarOptions = function(){
        // if (mainService.calendarOptions === undefined || mainService.calendarOptions.length < 1) {
        //   mainService.getCalendarOptions().then(function(d: Array<Calendar>){
        //     $scope.calendarOptions = d;
        //   });
        // }
        // else {
        //   $scope.calendarOptions = mainService.calendarOptions;
        // }
      };

      $scope.getGradeOptions = function(){
        console.log("getting grade options");
        if (mainService.gradeOptions === undefined || mainService.gradeOptions.length < 1) {
          mainService.getGradeOptions().then(function(d: Array<GradeLevel>){
            $scope.gradeOptions = d;
          });
        }
        else {
          $scope.gradeOptions = mainService.gradeOptions;
        }
      };

      $scope.getSchoolYearOptions = function(){
        if (mainService.schoolYearOptions === undefined || mainService.schoolYearOptions.length < 1) {
          mainService.getSchoolYearOptions().then(function(d: Array<SchoolYear>){
            $scope.schoolYearOptions = d;
          });
        }
        else {
          $scope.schoolYearOptions = mainService.schoolYearOptions;
        }
      };

      $scope.getSubjectOptions = function(){
        if (mainService.subjectOptions === undefined || mainService.subjectOptions.length < 1) {
          mainService.getSubjectOptions().then(function(d: Array<Subject>){
            $scope.subjectOptions = d;
          });
        }
        else {
          $scope.subjectOptions = mainService.subjectOptions;
        }
      };

      $scope.getStandardTypeOptions = function(){
        if (mainService.standardTypeOptions === undefined || mainService.standardTypeOptions.length < 1) {
          mainService.getStandardTypeOptions().then(function(d: Array<StandardType>){
            $scope.standardTypeOptions = d;
          });
        }
        else {
          $scope.standardTypeOptions = mainService.standardTypeOptions;
        }
      };

      $scope.selectTemplate = function(){
        if ($scope.newAssessment.AssessmentTemplate.Title === "None") {
          $scope.sortableOptions.disabled = false;
          $scope.templateSelected = false;
          $scope.newAssessment.Subject = {};
          $scope.newAssessment.Calendar = {};
          $scope.newAssessment.StandardType = {};
          $scope.newAssessment.GradeLevel = {};
          $scope.newAssessment.DistrictAssessmentItems = [];
        }
        else {
          $scope.templateSelected = true;
          $scope.sortableOptions.disabled = false;
          $scope.newAssessment.Subject = $scope.newAssessment.AssessmentTemplate.Subject;
          if ($scope.newAssessment.AssessmentTemplate.Calendar) {
            $scope.newAssessment.SelectedCalendar.$selected = {CalendarKey: $scope.newAssessment.AssessmentTemplate.Calendar.CalendarKey,
              Title: $scope.newAssessment.AssessmentTemplate.Calendar.CalendarName};
          }
          else if ($scope.newAssessment.AssessmentTemplate.MarkingPeriod) {
            $scope.newAssessment.SelectedCalendar.$selected = {MarkingPeriodKey: $scope.newAssessment.AssessmentTemplate.MarkingPeriod.MarkingPeriodKey,
              Title: $scope.newAssessment.AssessmentTemplate.MarkingPeriod.Name};
          }
          $scope.newAssessment.StandardType = $scope.newAssessment.AssessmentTemplate.StandardType;
          $scope.newAssessment.GradeLevel = $scope.newAssessment.AssessmentTemplate.GradeLevel;
          $scope.newAssessment.IsScantron = $scope.newAssessment.AssessmentTemplate.IsScantron;
          $scope.newAssessment.DistrictAssessmentItems = [];
          angular.forEach($scope.newAssessment.AssessmentTemplate.AssessmentTemplateItems, function(item){
            $scope.newAssessment.DistrictAssessmentItems.push({
              Item: item.Item,
              ItemKey: item.ItemKey});
            });

          };
        };

        $scope.removeItemAtIndex = function(index){
          $scope.newAssessment.DistrictAssessmentItems.splice(index, 1);
        };

        $scope.editItemAtIndex = function(index){
          $scope.openNewAssessmentItemModal("lg", index);
        };

        $scope.highlightTitle = function(){
          $("#assessmentTitle").select();
        };


        $scope.updateItemRanking = function(){
          angular.forEach($scope.newAssessment.DistrictAssessmentItems, function(value: DistrictAssessmentItem, key) {
            value.Item.ItemOrder = key + 1;
          });
          console.log($scope.newAssessment.Items);
        };

        $scope.validateForm = function(){
          let errorFree = true;
          if ($scope.newAssessment.Title === undefined || $scope.newAssessment.Title === "") {
            $scope.errorText = "The assessment must have a title";
            $scope.errors.title = true;
            errorFree = false;
          }
          // if ($scope.newAssessment.SelectedCalendar.$selected === undefined) {
          //   $scope.errorText = "The assessment must be associated with a calendar";
          //   $scope.errors.calendar = true;
          //   errorFree = false;
          // }
          if ($scope.newAssessment.GradeLevel === undefined) {
            $scope.errorText = "The assessment must be associated with a grade level";
            $scope.errors.gradeLevel = true;
            errorFree = false;
          }
          if ($scope.newAssessment.Subject === undefined) {
            $scope.errorText = "The assessment must be associated with a subject";
            $scope.errors.subject = true;
            errorFree = false;
          }
          if ($scope.newAssessment.StandardType === undefined) {
            $scope.errorText = "The assessment must be associated with a standard type";
            $scope.errors.standardType = true;
            errorFree = false;
          }
          if ($scope.newAssessment.SchoolYear === undefined) {
            $scope.errorText = "The assessment must be associated with a school year";
            $scope.errors.schoolYear = true;
            errorFree = false;
          }
          return errorFree;
        };

        $scope.resetField = function(field){
          if (field === "title") {
            $scope.errors.title = false;
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
          if (field === "schoolYear") {
            $scope.errors.schoolYear = false;
          }
        };


        $scope.publish = function () {
          console.log("Publish Assessment");
          if ($scope.validateForm()) {
            $uibModalInstance.close({Assessment: $scope.newAssessment, ShouldRefresh: false, ShouldPublish: true});
          }
        };

        $scope.ok = function () {
          console.log("Saving Assessment");
          if ($scope.validateForm()) {
            $uibModalInstance.close({Assessment: $scope.newAssessment, ShouldRefresh: false});
          }
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss("cancel");
        };

        $scope.openNewAssessmentItemModal = function (size, index) {
          if (index) {
            $scope.newAssessment.itemIndexToEdit = index;
          }

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

      }


    }
  }
