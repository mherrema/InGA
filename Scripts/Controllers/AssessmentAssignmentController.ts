module INGAApp
{

  interface IAssessmentAssignmentScope extends BaseController.IScope
  {
    init: Function,
    test: string,
    currentAssessment: DistrictAssessment,
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
    toggleAllChecked : Function,
    allChecked : boolean,
    headingSortValue: Function,
    getFilterOptions: Function,
    currentFilters: string
  }

  export class AssessmentAssignmentController extends BaseController.Controller
  {
    scope: IAssessmentAssignmentScope;
    static $inject = ['$scope', '$timeout', '$uibModal', 'mainService', 'assessmentService', 'filterService'];

    constructor( $scope: IAssessmentAssignmentScope, $timeout: ng.ITimeoutService, $uibModal: ng.ui.bootstrap.IModalService, mainService: MainService, assessmentService: AssessmentService, filterService: FilterService)
    {
      super( $scope );
      var controller = this;

      console.log("assignment controller");

      $scope.init = function(){
        mainService.setPageTitles("Assessment Assignment", "Assessment Assignment");

        $scope.currentAssessment = assessmentService.currentSelectedDistrictAssessment;

        $scope.getAssessments();
        $scope.getFilterOptions();

        $scope.setHeadingDropdownWidth();

        $scope.allChecked = false;

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

      }


      $scope.getAssessments = function(){
        assessmentService.getDistrictAssessments($scope.currentFilters).then(function(d: Array<DistrictAssessment>){
          $scope.currentAssessments = d;
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
        angular.forEach($scope.currentAssessments, function (assessment) {
          if(!$scope.allChecked){
            assessment.checked = false;
          }
          else{
            assessment.checked = true;
          }
        });
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
        // $scope.loading = true;
        if (option.Key != "All") {
          heading.selected = option;
        } else {
          heading.selected = { Key: "", Value: "" };
        }

        $scope.checkFilters();
        $scope.closeHeadings();
      }

      $scope.checkFilters = function () {
        $scope.areOptionsSelected = false;
        angular.forEach($scope.headingOptions, function (value, key) {
          if(value.selected != undefined){
          if (value.selected.Value != "") {
            $scope.areOptionsSelected = true;
            return;
          }
        }
        });
      }

      $scope.clearFilters = function (input) {
        angular.forEach($scope.headingOptions, function (value, key) {
          value.selected = { Key: "", Value: "" };
        });

        $scope.areOptionsSelected = false;
        $scope.closeHeadings();
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
