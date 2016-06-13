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
    getClassrooms: Function,
    currentClassrooms: Array<Classroom>,
    toggleAllChecked : Function,
    allChecked : boolean,
    headingSortValue: Function,
    getFilterOptions: Function,
    currentFilters: string,
    updateClassroomAssignments: Function,
    schoolSearch: Function,
    schoolString: string,
    schoolSearchInput: string,
    areRowsChecked: Function,
    assignChecked: Function,
    assignClassrooms: Function
  }

  export class AssessmentAssignmentController extends BaseController.Controller
  {
    scope: IAssessmentAssignmentScope;
    static $inject = ['$scope', '$timeout', '$uibModal', 'mainService', 'assessmentService', 'filterService', 'notificationService'];

    constructor( $scope: IAssessmentAssignmentScope, $timeout: ng.ITimeoutService, $uibModal: ng.ui.bootstrap.IModalService, mainService: MainService, assessmentService: AssessmentService, filterService: FilterService, notificationService: NotificationService)
    {
      super( $scope );
      var controller = this;

      console.log("assignment controller");

      $scope.init = function(){
        mainService.setPageTitles("Assessment Assignment", "Assessment Assignment");
        $scope.currentFilters = "";
        $scope.currentAssessment = assessmentService.currentSelectedDistrictAssessment;

        $scope.getClassrooms();
        $scope.getFilterOptions();

        $scope.setHeadingDropdownWidth();

        $scope.allChecked = false;

        window.onclick = function (e) {
          var container = $(".dropdown-input");

          if ($scope.justOpenedHeading) {
            $scope.headingOpen = true;
            $scope.justOpenedHeading = false;
            $scope.$apply();
          }
          else if ($scope.headingOpen) {
            if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(<Element>e.target).length === 0) // ... nor a descendant of the container
            {
              $scope.closeHeadings();
              $scope.$apply();
            }

          }
        }

        $scope.$watch(() => assessmentService.currentSelectedDistrictAssessment,
          (newValue: DistrictAssessment, oldValue: DistrictAssessment) => {
              $scope.currentAssessment = newValue;
              $scope.updateClassroomAssignments();
          });

      }


      $scope.getClassrooms = function(){
        assessmentService.getClassrooms($scope.currentFilters).then(function(d: Array<Classroom>){
          $scope.currentClassrooms = d;
          $scope.updateClassroomAssignments();
          $scope.setHeadingDropdownWidth();
        });
      }

      $scope.updateClassroomAssignments = function(){
        angular.forEach($scope.currentClassrooms, function(classroom){
          classroom.AssignedString = "Unassigned";
          classroom.IsAssigned = false;
          angular.forEach(classroom.ClassroomAssessments, function(assessment){
            if(assessment.DistrictAssessmentKey == $scope.currentAssessment.DistrictAssessmentKey){
              classroom.AssignedString = "Assigned";
              classroom.IsAssigned = true;
            }
          });
        });
      }


      $scope.assignChecked = function(){
        if($scope.areRowsChecked()){

          var confirmationPackage:ConfirmationPackage = {Action: "assign", Objects: "these classrooms?"}

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
              $scope.assignClassrooms();
          });
        }
      }

      $scope.assignClassrooms = function(){
        // var assessmentsDeleted : Array<number> = [];
        angular.forEach($scope.currentClassrooms, function (classroom) {
          if(classroom.checked && classroom.AssignedString != "Assigned"){

            assessmentService.assignAssessment(classroom.ClassroomKey).then(function(res: ReturnPackage){
              if(res.Success){
                //success
                for(var i = $scope.currentClassrooms.length - 1; i >= 0; i--){
                  $scope.currentClassrooms[i].checked = false;
                  if($scope.currentClassrooms[i].ClassroomKey == classroom.ClassroomKey){
                    $scope.currentClassrooms[i].AssignedString = "Assigned";
                  }
                }
                notificationService.showNotification("Success assigning assessment", "success");

              }
              else{
                notificationService.showNotification("Error while assigning assessment", "error")
              }
            })
            .catch(function(res){
              notificationService.showNotification("Error while assigning assessment", "error")
            });
          }
        });
      }

      $scope.areRowsChecked = function(){
        var returnVal = false;
        angular.forEach($scope.currentClassrooms, function (classroom) {
          if(classroom.checked)
          {
            returnVal = true;
          }
        });
        return returnVal;
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
        filterService.getClassroomFilterOptions().then(function(d: Array<HeadingOption>){
          $scope.headingOptions = d;
          $scope.setHeadingDropdownWidth();
        });
      }

      $scope.toggleAllChecked = function(){
        angular.forEach($scope.currentClassrooms, function (classroom) {
          if(!$scope.allChecked){
            classroom.checked = false;
          }
          else{
            classroom.checked = true;
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

      $scope.schoolSearch = function(searchInput){
        $scope.schoolString = searchInput;
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
          if(value.heading == "Status"){
            if (value.selected.Value != "") {
              $scope.currentFilters += "&DistrictAssessment=" + $scope.currentAssessment.DistrictAssessmentKey;
            }
          }
        }
        });

        if($scope.schoolString != undefined && $scope.schoolString.length){
          if($scope.currentFilters == ""){
            $scope.currentFilters += "?";
          }
          else{
            $scope.currentFilters += "&";
          }
          $scope.areOptionsSelected = true;
          $scope.currentFilters += "School=" + $scope.schoolString;
        }

        $scope.getClassrooms();
      }

      $scope.clearFilters = function (input) {
        angular.forEach($scope.headingOptions, function (value, key) {
          value.selected = { Key: "", Value: "" };
          if(value.input){
            //value.input = "";
          }
        });
        $scope.schoolSearchInput = "";
        $scope.schoolString = "";
        $scope.searchOpen = false;
        $scope.areOptionsSelected = false;
        $scope.closeHeadings();
        $scope.checkFilters();
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
