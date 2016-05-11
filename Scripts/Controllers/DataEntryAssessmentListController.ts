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
    currentAssessments: Array<ClassroomAssessment>,
    toggleAllChecked : Function,
    allChecked : boolean,
    newAssessment: DistrictAssessment,
    openAssessmentViewModal: Function,
    goToDataEntry: Function,
    headingSortValue: Function
  }

  export class DataEntryAssessmentListController extends BaseController.Controller
  {
    scope: IDataEntryAssessmentListScope;
    static $inject = ['$scope', '$timeout', '$location', '$uibModal', 'mainService', 'assessmentService', 'dataEntryService'];

    constructor( $scope: IDataEntryAssessmentListScope, $timeout: ng.ITimeoutService, $location: ng.ILocationService, $uibModal: ng.ui.bootstrap.IModalService, mainService: MainService, assessmentService: AssessmentService, dataEntryService: DataEntryService)
    {
      super( $scope );
      var controller = this;

      $scope.init = function(){

        mainService.setPageTitles("Data Entry", "INGA");
    //     $scope.getAssessments();
        $scope.headingOptions = [{heading: "Grade Level", options: [{key: "K"},{key: "1"}], open: false},
        {heading: "Subject Area", options: [{key: "K"},{key: "1"}], open: false},
        {heading: "Term", options: [{key: "K"},{key: "1"}], open: false},
        {heading: "School Year", options: [{key: "K"},{key: "1"}], open: false}];

        $scope.setHeadingDropdownWidth();
    //
    //     $scope.allChecked = false;
    //
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
    //
    $scope.$watch(() => assessmentService.currentClassroomAssessments,
    (newValue: Array<ClassroomAssessment>, oldValue: Array<ClassroomAssessment>) => {
      $scope.currentAssessments = newValue;
    });
      }


      $scope.getAssessments = function(){
        // $scope.currentAssessments = assessmentService.getAssessments();
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

      // $scope.toggleAllChecked = function(){
      //   angular.forEach($scope.currentAssessments, function (assessment) {
      //     if(!$scope.allChecked){
      //       assessment.checked = false;
      //     }
      //     else{
      //       assessment.checked = true;
      //     }
      //   });
      // }

      //toggle if search input is open
    $scope.toggleSearchOpen = function () {
        // StateService.searchOpen = !StateService.searchOpen;
        $scope.searchOpen = !$scope.searchOpen;
        // if ($scope.status == 'view' && $scope.display == 'card') {
        //     if (StateService.searchOpen) {
        //         StateService.cardFiltrationOpen = true;
        //         StateService.setHeadingDropdownWidth();
        //     }
        //     else {
        //         StateService.cardFiltrationOpen = false;
        //     }
        // }
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
        if (option.key != "All") {
            heading.selected = option;
            // FilterService.selectOption(heading, option);
            // FilterService.updateCurrentFilters();
        } else {
            heading.selected = { key: "", value: "" };
            // FilterService.updateCurrentFilters();
        }

        $scope.checkFilters();
        $scope.closeHeadings();
    }

    $scope.checkFilters = function () {
        $scope.areOptionsSelected = false;
        // StateService.filterOptionsSelected = false;
        angular.forEach($scope.headingOptions, function (value, key) {
            if (value.selected.value != "") {
                $scope.areOptionsSelected = true;
                // StateService.filterOptionsSelected = true;
                return;
            }
        });
    }

    $scope.clearFilters = function (input) {
        angular.forEach($scope.headingOptions, function (value, key) {
            value.selected = { key: "", value: "" };
        });

        // SearchService.clearSearchInput();
        // StateService.searchOpen = false;
        // FilterService.currentFilters = "";
        $scope.areOptionsSelected = false;
        // StateService.filterOptionsSelected = false;
        $scope.closeHeadings();

        // if (input) {
        //     if ($scope.status == "view") {
        //         $scope.getCohortStudents();
        //     }
        //     else {
        //         $scope.getAvailableStudents();
        //     }
        // }
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
