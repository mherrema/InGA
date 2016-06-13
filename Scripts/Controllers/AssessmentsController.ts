module INGAApp
{

  interface IAssessmentsScope extends BaseController.IScope
  {
    init: Function,
    test: Function,
    toggleSearchOpen: Function,
    searchOpen: boolean,
    openHeading: Function,
    closeHeadings: Function,
    headingOpen: boolean,
    selectHeadingOption: Function,
    headingOptions: Array<HeadingOption>,
    justOpenedHeading: boolean,
    setHeadingDropdownWidth: Function,
    checkFilters: Function,
    areOptionsSelected: boolean,
    clearFilters: Function,
    getAssessments: Function,
    currentAssessments: Array<DistrictAssessment>,
    currentAssessmentTemplates: Array<AssessmentTemplate>,
    toggleAllChecked : Function,
    allChecked : boolean,
    newAssessment: DistrictAssessment,
    openAssessmentViewModal: Function,
    openAssessmentTemplateViewModal: Function,
    headingSortValue: Function,
    getFilterOptions: Function,
    deleteChecked: Function,
    archiveChecked: Function,
    archiveAssessments: Function,
    archiveAssessmentTemplates: Function,
    deleteAssessments: Function,
    deleteAssessmentTemplates: Function,
    toggleTemplates: Function,
    togglePublished: Function,
    templatesActive: boolean,
    publishedActive: boolean,
    areRowsChecked: Function,
    currentFilters: string,
    assessmentSearch: Function,
    assessmentSearchInput: string,
    toggleExtraFiltersOpen: Function,
    extraFiltersOpen: boolean,
    selectExtraFilterOption: Function,
    selectedExtraFilter: string,
    archivedActive: boolean
  }

  export class AssessmentsController extends BaseController.Controller
  {
    scope: IAssessmentsScope;
    static $inject = ['$scope', '$timeout', '$uibModal', 'mainService', 'assessmentService', 'filterService', 'notificationService'];

    constructor( $scope: IAssessmentsScope, $timeout: ng.ITimeoutService, $uibModal: ng.ui.bootstrap.IModalService,
      mainService: MainService, assessmentService: AssessmentService, filterService: FilterService, notificationService: NotificationService)
    {
      super( $scope );
      var controller = this;

      $scope.init = function(){
        mainService.setPageTitles("Assessment Management", "INGA");
        $scope.currentFilters = "";
        $scope.getAssessments();
        $scope.getFilterOptions();

        $scope.setHeadingDropdownWidth();

        $scope.allChecked = false;
        $scope.templatesActive = false;

        $scope.selectedExtraFilter = "All";

        window.onclick = function () {
          if ($scope.justOpenedHeading) {
            $scope.headingOpen = true;
            $scope.justOpenedHeading = false;
            $scope.$apply();
          }
          else if ($scope.headingOpen) {
            $scope.closeHeadings();
            $scope.$apply();
          }
        }

        $scope.$watch(() => assessmentService.currentDistrictAssessments,
        (newValue: Array<DistrictAssessment>, oldValue: Array<DistrictAssessment>) => {
          $scope.currentAssessments = newValue;
        });

        $scope.$watch(() => assessmentService.currentAssessmentTemplates,
        (newValue: Array<AssessmentTemplate>, oldValue: Array<AssessmentTemplate>) => {
          $scope.currentAssessmentTemplates = newValue;
        });

      }



      $scope.toggleTemplates = function(){
        $scope.templatesActive = !$scope.templatesActive;
        $scope.clearFilters();
        if($scope.templatesActive){
          if(assessmentService.currentAssessmentTemplates.length == 0 || assessmentService.needToReloadTemplates){
            assessmentService.getAssessmentTemplates($scope.currentFilters);
          }
        }
      }

      $scope.togglePublished = function(){
        $scope.publishedActive = !$scope.publishedActive;
        $scope.checkFilters();
      }


      $scope.getAssessments = function(){
        assessmentService.getDistrictAssessments($scope.currentFilters).then(function(d: Array<DistrictAssessment>){
          // $scope.currentAssessments = d;
        });
      }

      $scope.setHeadingDropdownWidth = function(){
        $timeout(function () {
          var dropdowns = $(".table-heading-dropdown");
          for (var i = 0; i < dropdowns.length; i++) {
            $($(dropdowns[i])).css({ "width": "" });
            if ($(dropdowns[i]).width() < $(dropdowns[i]).parent("th").outerWidth()) {
              $(dropdowns[i]).width($(dropdowns[i]).parent("th").outerWidth());
            }
          }
        });
      }

      $scope.getFilterOptions = function(){
        filterService.getDistrictAssessmentFilterOptions().then(function(d: Array<HeadingOption>){
          $scope.headingOptions = d;
          $scope.setHeadingDropdownWidth();
        });
      }

      $scope.assessmentSearch = function(input){
        if($scope.assessmentSearchInput != input && input != undefined){
        $scope.assessmentSearchInput = input;
        $scope.checkFilters();
      }
      }

      $scope.toggleAllChecked = function(){
        if(!$scope.templatesActive){
          angular.forEach($scope.currentAssessments, function (assessment) {
            if(!$scope.allChecked){
              assessment.checked = false;
            }
            else{
              assessment.checked = true;
            }
          });
        }
        else{
          angular.forEach($scope.currentAssessmentTemplates, function (template) {
            if(!$scope.allChecked){
              template.checked = false;
            }
            else{
              template.checked = true;
            }
          });
        }
      }

      $scope.archiveChecked = function(){
        if($scope.areRowsChecked()){
          if(!$scope.templatesActive){
            var confirmationPackage:ConfirmationPackage = {Action: "archive", Objects: "these assessments?"}
          }
          else{
            var confirmationPackage:ConfirmationPackage = {Action: "archive", Objects: "these assessment templates?"}
          }

          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'partials/modals/dialog/confirmationModal.html',
            controller: 'ConfirmationModalController',
            size: "lg",
            resolve: {
              confirmationPackage: function () {
                return confirmationPackage
              }
            }
          });

          modalInstance.result.then(function () {
            if(!$scope.templatesActive){
              $scope.archiveAssessments();
            }
            else{
              $scope.archiveAssessmentTemplates();
            }
          });
        }
      }

      $scope.archiveAssessments = function(){
        // var assessmentsDeleted : Array<number> = [];
        angular.forEach($scope.currentAssessments, function (assessment) {
          if(assessment.checked){

            assessmentService.archiveAssessment(assessment.DistrictAssessmentKey).then(function(res: ReturnPackage){
              if(res.Success){
                //success
                for(var i = assessmentService.currentDistrictAssessments.length - 1; i >= 0; i--){
                  if(assessmentService.currentDistrictAssessments[i].DistrictAssessmentKey == assessment.DistrictAssessmentKey){
                    assessmentService.currentDistrictAssessments.splice(i, 1);
                  }
                }
                notificationService.showNotification("Success making assessment template available", "success")
              }
              else{
                alert("Error while archiving assessment");
              }
            })
            .catch(function(res){
              alert("Error while archiving assessment");
            });
          }
        });
      }

      $scope.archiveAssessmentTemplates = function(){
        // var assessmentsDeleted : Array<number> = [];
        angular.forEach($scope.currentAssessmentTemplates, function (template) {
          if(template.checked){

            assessmentService.archiveAssessmentTemplate(template.AssessmentTemplateKey).then(function(res: ReturnPackage){
              if(res.Success){
              //success
              for(var i = assessmentService.currentAssessmentTemplates.length - 1; i >= 0; i--){
                if(assessmentService.currentAssessmentTemplates[i].AssessmentTemplateKey == template.AssessmentTemplateKey){
                  assessmentService.currentAssessmentTemplates.splice(i, 1);
                }
              }
            }
            else{
              alert("Error while archiving assessment template");
            }
            })
            .catch(function(res){
              alert("Error while archiving assessment template");
            });
          }
        });
      }

      $scope.deleteChecked = function(){
        if($scope.areRowsChecked()){
          if(!$scope.templatesActive){
            var confirmationPackage:ConfirmationPackage = {Action: "delete", Objects: "these assessments?"}
          }
          else{
            var confirmationPackage:ConfirmationPackage = {Action: "delete", Objects: "these assessment templates?"}
          }

          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'partials/modals/dialog/confirmationModal.html',
            controller: 'ConfirmationModalController',
            size: "lg",
            resolve: {
              confirmationPackage: function () {
                return confirmationPackage
              }
            }
          });

          modalInstance.result.then(function () {
            if(!$scope.templatesActive){
              $scope.deleteAssessments();
            }
            else{
              $scope.deleteAssessmentTemplates();
            }
          });
        }
      }

      $scope.deleteAssessments = function(){
        // var assessmentsDeleted : Array<number> = [];
        angular.forEach($scope.currentAssessments, function (assessment) {
          if(assessment.checked){

            assessmentService.deleteAssessment(assessment.DistrictAssessmentKey).then(function(res: ReturnPackage){
              if(res.Success){
                //success
                for(var i = assessmentService.currentDistrictAssessments.length - 1; i >= 0; i--){
                  if(assessmentService.currentDistrictAssessments[i].DistrictAssessmentKey == assessment.DistrictAssessmentKey){
                    assessmentService.currentDistrictAssessments.splice(i, 1);
                  }
                }
                notificationService.showNotification("Success deleting assessment", "success")

              }
              else{
                notificationService.showNotification("Error deleting assessment", "error")

              }
            })
            .catch(function(res){
              notificationService.showNotification("Error deleting assessment", "error")
            });
          }
        });
      }

      $scope.deleteAssessmentTemplates = function(){
        // var assessmentsDeleted : Array<number> = [];
        angular.forEach($scope.currentAssessmentTemplates, function (template) {
          if(template.checked){

            assessmentService.deleteAssessmentTemplate(template.AssessmentTemplateKey).then(function(res: ReturnPackage){
              if(res.Success){
              //success
              for(var i = assessmentService.currentAssessmentTemplates.length - 1; i >= 0; i--){
                if(assessmentService.currentAssessmentTemplates[i].AssessmentTemplateKey == template.AssessmentTemplateKey){
                  assessmentService.currentAssessmentTemplates.splice(i, 1);
                }
              }
              notificationService.showNotification("Success deleting assessment template", "success")

            }
            else{
              notificationService.showNotification("Error deleting assessment template", "error")
            }
            })
            .catch(function(res){
              notificationService.showNotification("Error deleting assessment template", "error")
            });
          }
        });
      }


      $scope.areRowsChecked = function(){
        var returnVal = false;
        angular.forEach($scope.currentAssessments, function (assessment) {
          if(assessment.checked)
          {
            returnVal = true;
          }
        });
        angular.forEach($scope.currentAssessmentTemplates, function (template) {
          if(template.checked)
          {
            returnVal = true;
          }
        });
        return returnVal;
      }

      //toggle if search input is open
      $scope.toggleSearchOpen = function () {
        $scope.searchOpen = !$scope.searchOpen;
        if ($scope.searchOpen) {
          // focus("studentSearchInput");
        }
      }


      $scope.toggleExtraFiltersOpen = function () {
        $scope.extraFiltersOpen = !$scope.extraFiltersOpen;
        if($scope.extraFiltersOpen){
          $scope.justOpenedHeading = true;
          // $scope.headingOpen = true;
        }
        console.log($scope.extraFiltersOpen);
      }

      $scope.selectExtraFilterOption = function(selection){
        console.log(selection);
        $scope.selectedExtraFilter = selection;
        $scope.publishedActive = false;
        $scope.archivedActive = false;
        $scope.templatesActive = false;
        if(selection == 'published'){
          $scope.publishedActive = true;
        }
        else if(selection == 'archived'){
          $scope.archivedActive = true;
        }
        else if(selection == 'templates'){
          $scope.templatesActive = true;
        }
        $scope.checkFilters();
      }


      //open table heading filtration
      $scope.openHeading = function (heading:HeadingOption, $event) {
        $scope.closeHeadings();
        if(heading.filterable){
          heading.open = true;
          $scope.justOpenedHeading = true;
          var headingObject = $($event.currentTarget).parent("th");
          if(headingObject.find("input").length){
            var inputObject = headingObject.find("input")[0];
            $timeout(function(){$(inputObject).focus();},0);
          }
        }
      }

      //close all table heading filters
      $scope.closeHeadings = function () {
        $scope.headingOpen = false;
        angular.forEach($scope.headingOptions, function (value, key) {
          value.open = false;
        });
        $scope.extraFiltersOpen = false;
      }

      //select table heading filter option
      $scope.selectHeadingOption = function (heading: HeadingOption, option: FilterOption) {
        if (option.Key != "All") {
          heading.selected = option;
        } else {
          heading.selected = { Key: "", Value: "" };
        }

        $scope.checkFilters();
        $scope.closeHeadings();
      }

      $scope.checkFilters = function () {
        $scope.currentFilters = "";
        $scope.areOptionsSelected = false;
        angular.forEach($scope.headingOptions, function (value, key) {
          if(value.selected != undefined){
          if (value.selected.Value != "") {
            if($scope.currentFilters == ""){
              $scope.currentFilters += "?";
            }
            else{
              $scope.currentFilters += "&";
            }
            $scope.currentFilters += value.heading + "=" + value.selected.Value;
            $scope.areOptionsSelected = true;
          }
        }
        });
        if($scope.publishedActive){
          if($scope.currentFilters == ""){
            $scope.currentFilters += "?Published=true";
          }
          else{
            $scope.currentFilters += "&Published=true";
          }
        }
        if($scope.archivedActive){
          if($scope.currentFilters == ""){
            $scope.currentFilters += "?Archived=true";
          }
          else{
            $scope.currentFilters += "&Archived=true";
          }
        }
        if($scope.assessmentSearchInput){
          if($scope.currentFilters == ""){
            $scope.currentFilters += "?Title=" + $scope.assessmentSearchInput;
          }
          else{
            $scope.currentFilters += "&Title=" + $scope.assessmentSearchInput;
          }
        }

        if($scope.templatesActive){
          assessmentService.getAssessmentTemplates($scope.currentFilters);
        }
        else{
          assessmentService.getDistrictAssessments($scope.currentFilters);
        }
        console.log($scope.areOptionsSelected);
      }

      $scope.clearFilters = function (input) {
        angular.forEach($scope.currentAssessments, function (assessment) {
          assessment.checked = false;
        });
        angular.forEach($scope.currentAssessmentTemplates, function (template) {
          template.checked = false;
        });
        angular.forEach($scope.headingOptions, function (value, key) {
          value.selected = { Key: "", Value: "" };
        });
        $scope.searchOpen = false;
        $scope.assessmentSearchInput = "";

        $scope.areOptionsSelected = false;
        $scope.closeHeadings();
        $scope.checkFilters();
      };

      $scope.openAssessmentViewModal = function (assessment) {
        // var tmpAssessment = assessment;
        // console.log(tmpAssessment);

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'partials/modals/viewAssessmentModal.html',
          controller: 'ViewAssessmentModalController',
          size: "extra-wide",
          resolve: {
            assessment: function () {
              return assessment;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          console.log(selectedItem);
        });
      };

      $scope.openAssessmentTemplateViewModal = function (template) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'partials/modals/viewAssessmentTemplateModal.html',
          controller: 'ViewAssessmentTemplateModalController',
          size: "extra-wide",
          resolve: {
            template: function () {
              return template;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          console.log(selectedItem);
        });
      };



      $scope.headingSortValue = function (item) {
        if (item.Key == "All"){
          return -1;
        }
        return item;
      }
    }


  }
}
