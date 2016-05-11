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
    toggleAllChecked : Function,
    allChecked : boolean,
    newAssessment: DistrictAssessment,
    openAssessmentViewModal: Function,
    headingSortValue: Function
  }

  export class AssessmentsController extends BaseController.Controller
  {
    scope: IAssessmentsScope;
    static $inject = ['$scope', '$timeout', '$uibModal', 'mainService', 'assessmentService'];

    constructor( $scope: IAssessmentsScope, $timeout: ng.ITimeoutService, $uibModal: ng.ui.bootstrap.IModalService, mainService: MainService, assessmentService: AssessmentService)
    {
      super( $scope );
      var controller = this;

      $scope.init = function(){
        mainService.setPageTitles("Assessment Management", "INGA");
        $scope.getAssessments();
        $scope.headingOptions = [{heading: "Grade Level", options: [{key: "K"},{key: "1"}], open: false},
        {heading: "Subject Area", options: [{key: "K"},{key: "1"}], open: false},
        {heading: "Term", options: [{key: "K"},{key: "1"}], open: false},
        {heading: "School Year", options: [{key: "K"},{key: "1"}], open: false}];

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

    $scope.$watch(() => assessmentService.currentAssessments,
    (newValue: Array<DistrictAssessment>, oldValue: Array<DistrictAssessment>) => {
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

    $scope.openAssessmentViewModal = function (assessment) {
      var tmpAssessment = assessment;
      console.log(tmpAssessment);

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'partials/modals/assessmentViewModal.html',
        controller: 'AssessmentViewController',
        size: "extra-wide",
        resolve: {
          assessment: function () {
            return tmpAssessment;
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
