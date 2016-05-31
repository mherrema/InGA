module INGAApp
{

  interface IAssessmentsScope extends BaseController.IScope
  {
    init: Function,
    test: string,
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
    deleteAssessments: Function,
    deleteAssessmentTemplates: Function,
    toggleTemplates: Function,
    togglePublished: Function,
    templatesActive: boolean,
    publishedActive: boolean,
    areRowsChecked: Function,
    currentFilters: string
  }

  export class AssessmentsController extends BaseController.Controller
  {
    scope: IAssessmentsScope;
    static $inject = ['$scope', '$timeout', '$uibModal', 'mainService', 'assessmentService', 'filterService'];

    constructor( $scope: IAssessmentsScope, $timeout: ng.ITimeoutService, $uibModal: ng.ui.bootstrap.IModalService, mainService: MainService, assessmentService: AssessmentService, filterService: FilterService)
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
              }
              else{
                alert("Error while deleting assessment");
              }
            })
            .catch(function(res){
              alert("Error while deleting assessment");
            });
          }
        });
      }

      $scope.deleteAssessmentTemplates = function(){
        // var assessmentsDeleted : Array<number> = [];
        angular.forEach($scope.currentAssessmentTemplates, function (template) {
          if(template.checked){

            assessmentService.deleteAssessmentTemplate(template.AssessmentTemplateKey).then(function(res: boolean){
              if(res){
              //success
              for(var i = assessmentService.currentAssessmentTemplates.length - 1; i >= 0; i--){
                if(assessmentService.currentAssessmentTemplates[i].AssessmentTemplateKey == template.AssessmentTemplateKey){
                  assessmentService.currentAssessmentTemplates.splice(i, 1);
                }
              }
            }
            else{
              alert("Error while deleting assessment template");
            }
            })
            .catch(function(res){
              alert("Error while deleting assessment template");
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

      //open table heading filtration
      $scope.openHeading = function (heading) {
        $scope.closeHeadings();
        heading.open = true;
        $scope.justOpenedHeading = true;
      }

      //close all table heading filters
      $scope.closeHeadings = function () {
        $scope.headingOpen = false;
        angular.forEach($scope.headingOptions, function (value, key) {
          value.open = false;
        });
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
