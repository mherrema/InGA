namespace INGAApp {

  interface IEditAssessmentTemplateScope extends BaseController.IScope {
    newAssessmentTemplate: AssessmentTemplate;

    gradeOptions: Array<GradeLevel>;
    subjectOptions: Array<Subject>;
    standardTypeOptions: Array<StandardType>;
    calendarOptions: Array<Calendar>;
    districtOptions: Array<District>;

    sortableOptions: SortableOptions;
    pageTitle: string;

    init: Function;
    makeAvailableToUsers: Function;
    ok: Function;
    cancel: Function;

    openAssessmentViewModal: Function;
    openNewAssessmentItemModal: Function;

    updateItemRanking: Function;
    removeItemAtIndex: Function;

    getGradeOptions: Function;
    getSubjectOptions: Function;
    getStandardTypeOptions: Function;
    getDistrictOptions: Function;
    getCalendarOptions: Function;
  }

  export class EditAssessmentTemplateModalController extends BaseController.Controller {
    scope: IEditAssessmentTemplateScope;
    static $inject = ["$scope", "$timeout", "$uibModalInstance", "$uibModal", "mainService", "assessmentService", "template"];

    constructor( $scope: IEditAssessmentTemplateScope, $timeout: ng.ITimeoutService, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $uibModal: ng.ui.bootstrap.IModalService, mainService: MainService, assessmentService: AssessmentService, template) {
      super( $scope );
      let controller = this;

      $scope.init = function(){
        $scope.pageTitle = "Edit Assessment Template";
        $scope.newAssessmentTemplate = template;

        $scope.sortableOptions = {
          disabled: false,
          stop: function(){$scope.updateItemRanking(); }
        };

        $scope.getGradeOptions();
        $scope.getSubjectOptions();
        $scope.getStandardTypeOptions();
        $scope.getCalendarOptions();
        $scope.getDistrictOptions();

        if ($scope.newAssessmentTemplate.CalendarKey !== null) {
          $scope.newAssessmentTemplate.SelectedCalendar = {$selected:
            {CalendarKey: $scope.newAssessmentTemplate.CalendarKey, Title: $scope.newAssessmentTemplate.Calendar.CalendarName}};
        }
        else if ($scope.newAssessmentTemplate.MarkingPeriodKey !== null) {
          $scope.newAssessmentTemplate.SelectedCalendar = {$selected:
            {MarkingPeriodKey: $scope.newAssessmentTemplate.MarkingPeriodKey, Title: $scope.newAssessmentTemplate.MarkingPeriod.Name}};
        }
      };

      $scope.makeAvailableToUsers = function(){
        console.log("Publish button clicked");
        // assessmentService.updateAssessmentTemplate({AssessmentTemplate: $scope.newAssessmentTemplate, ShouldRefresh: true, ShouldMakeAvailableToUsers: true});
        $uibModalInstance.close({AssessmentTemplate: $scope.newAssessmentTemplate, ShouldRefresh: false, ShouldMakeAvailableToUsers: true});
      };

      $scope.ok = function () {
        $uibModalInstance.close({AssessmentTemplate: $scope.newAssessmentTemplate, ShouldRefresh: false});
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss("cancel");
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


      $scope.updateItemRanking = function(){
        angular.forEach($scope.newAssessmentTemplate.AssessmentTemplateItems, function(value: AssessmentTemplateItem, key) {
          value.Item.ItemOrder = key + 1;
        });
        console.log($scope.newAssessmentTemplate.Items);
      };

      $scope.removeItemAtIndex = function(index){
        $scope.newAssessmentTemplate.AssessmentTemplateItems.splice(index, 1);
          $scope.updateItemRanking();
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

      $scope.getCalendarOptions = function(){
        // if (mainService.calendarOptions === undefined) {
        //   mainService.getCalendarOptions().then(function(d: Array<Calendar>){
        //     $scope.calendarOptions = d;
        //   });
        // }
        // else {
        //   $scope.calendarOptions = mainService.calendarOptions;
        // }
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


    }
  }
}
