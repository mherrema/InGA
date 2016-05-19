module INGAApp
{

  interface IDataEntryAssessmentListScope extends BaseController.IScope
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
    currentClassroomAssessments: Array<ClassroomAssessment>,
    toggleAllChecked : Function,
    allChecked : boolean,
    newAssessment: DistrictAssessment,
    openAssessmentViewModal: Function,
    goToDataEntry: Function,
    headingSortValue: Function,
    getFilterOptions: Function,
    getClassroomAssessments: Function
  }

  export class DataEntryAssessmentListController extends BaseController.Controller
  {
    scope: IDataEntryAssessmentListScope;
    static $inject = ['$scope', '$timeout', '$location', '$uibModal', 'mainService', 'assessmentService', 'dataEntryService', 'filterService'];

    constructor( $scope: IDataEntryAssessmentListScope, $timeout: ng.ITimeoutService, $location: ng.ILocationService, $uibModal: ng.ui.bootstrap.IModalService,
      mainService: MainService, assessmentService: AssessmentService, dataEntryService: DataEntryService, filterService: FilterService)
      {
        super( $scope );
        var controller = this;

        $scope.init = function(){

          mainService.setPageTitles("Data Entry", "INGA");
          $scope.getFilterOptions();
          $scope.getClassroomAssessments();

          $scope.setHeadingDropdownWidth();
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


        $scope.getClassroomAssessments = function(){
          assessmentService.getClassroomAssessments().then(function(d: Array<ClassroomAssessment>){
            $scope.currentClassroomAssessments = d;
          });
        }

        $scope.getFilterOptions = function(){
          filterService.getDataEntryFilterOptions().then(function(d: Array<HeadingOption>){
            $scope.headingOptions = d;
            $scope.setHeadingDropdownWidth();
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

        $scope.goToDataEntry = function(assessment: DistrictAssessment){
          dataEntryService.currentAssessment = assessment;
          $location.path("/dataEntry/score");
        }


        $scope.headingSortValue = function (item) {
          if (item.Key == "All"){
            return -1;
          }
          return item;
        }
      }
    }
  }
