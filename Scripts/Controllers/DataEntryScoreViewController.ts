namespace INGAApp {

  interface IDataEntryScoreViewScope extends BaseController.IScope {
    init: Function;
    test: string;
    toggleSearchOpen: Function;
    searchOpen: boolean;
    openHeading: Function;
    closeHeadings: Function;
    headingOpen: boolean;
    selectHeadingOption: Function;
    headingOptions: Array<HeadingOption>;
    justOpenedHeading: boolean;
    setHeadingDropdownWidth: Function;
    checkFilters: Function;
    areOptionsSelected: boolean;
    clearFilters: Function;
    getAssessments: Function;
    currentAssessment: ClassroomAssessment;
    toggleAllChecked: Function;
    allChecked: boolean;
    newAssessment: DistrictAssessment;
    openAssessmentViewModal: Function;
    goToDataEntry: Function;
    headingSortValue: Function;
    myData: Array<Object>;
    gridOptions: GridOptions;
    areRowsChecked: Function;
    hideChecked: Function;
    removeChecked: Function;
    filterOptions: Object;
    gridApi: GridApi;
    areStudentsHidden: boolean;
    showAllStudents: Function;
    studentsToRemove: Array<number>;
    saveAndExit: Function;
    items: Array<Item>;
    selectMarkingPeriod: Function;
    getStudents: Function;
  }

  export class DataEntryScoreViewController extends BaseController.Controller {
    scope: IDataEntryScoreViewScope;
    static $inject = ["$scope", "$timeout", "$location", "$uibModal", "mainService", "dataEntryService", "uiGridValidateService", "$window"];

    constructor( $scope: IDataEntryScoreViewScope, $timeout: ng.ITimeoutService, $location: ng.ILocationService, $uibModal: ng.ui.bootstrap.IModalService, mainService: MainService, dataEntryService: DataEntryService, uiGridValidateService: uiGrid.GridValidateService, $window: ng.IWindowService) {
      super( $scope );
      let controller = this;

      uiGridValidateService.setValidator("pointsWithinRange",
    function(argument) {
      return function(oldValue, newValue, rowEntity, colDef) {
        if (!newValue) {
          return true; // We should not test for existence here
        } else {
          return newValue <= colDef.pointsMax && newValue >= colDef.pointsMin;
        }
      };
    },
    function(argument) {
      return "You can only insert names starting with:" + argument;
    }
  );

      $scope.filterOptions = {
        filterText: "hidden:false",
        useExternalFilter: true
      };

      $scope.init = function(){
        $scope.gridOptions = {
          onRegisterApi: function(gridApi){
            $scope.gridApi = gridApi;
          },
          enableSorting: false,
          enableFiltering: true,
          enableColumnMenus: false,
          columnDefs: [{name: "Name", minWidth: 250, pinnedLeft: true, enableSorting: true, cellEditableCondition: false,
          cellTemplate: "<div class='ui-grid-cell-contents'><input type='checkbox' ng-model='row.entity.checked' ng-checked='row.entity.checked' /> {{row.entity.DistrictStudent.LastName}}, {{row.entity.DistrictStudent.FirstName}} ({{row.entity.DistrictStudent.StudentNumber}})</div>"},
          {name: "hidden", enableFiltering: true, filter: {
        noTerm: true,
        condition: function(searchTerm, cellValue) {
          return cellValue === false;
        }
      }}],
          enableCellEditOnFocus: true,
          data: [],
          rowHeight: 45,
          filterOptions: $scope.filterOptions
        };
        if (dataEntryService.currentAssessment === undefined) {
          $location.path("/dataEntry");
        }
        if (dataEntryService.currentAssessment !== undefined) {
          $scope.currentAssessment = dataEntryService.currentAssessment;
          mainService.setPageTitles(dataEntryService.currentAssessment.Title, "Assessment Class Score View");

          if ($scope.currentAssessment.MarkingPeriodKey !== null && $scope.currentAssessment.MarkingPeriodKey !== undefined) {
            $scope.getStudents($scope.currentAssessment.MarkingPeriodKey);
          }
          else if ($scope.currentAssessment.CalendarKey === null && $scope.currentAssessment.MarkingPeriodKey === null) {
            $scope.getStudents(-1);
          }

          dataEntryService.getItems(dataEntryService.currentAssessment.DistrictAssessmentKey)
          .then(function(d: Array<Item>){
            $scope.items = d;
            console.log(d);
            angular.forEach(d, function(item, index){
              let name = "";
              if (item.Label) {
                name = item.Label;
              }
              else {
                name = item.StandardCode;
              }
              $scope.gridOptions.columnDefs.push({name: name + " (" + item.PointsMax + ")", displayName: name + " (" + item.PointsMax + ")", minWidth: 150, itemKey: item.ItemKey,
              field: String(item.ItemOrder), type: "number", pointsMax: item.PointsMax, pointsMin: item.PointsMin, validators: {pointsWithinRange: ""},
            cellTemplate: "ui-grid/cellTitleValidator"});
            });
          });
        }
        $scope.$watch(() => dataEntryService.currentAssessment,
        (newValue: ClassroomAssessment, oldValue: ClassroomAssessment) => {
          $scope.currentAssessment = newValue;
        });

        $scope.studentsToRemove = [];
      };

      $scope.saveAndExit = function(){
        angular.forEach($scope.gridOptions.data, function(student){
          angular.forEach($scope.gridOptions.columnDefs, function(column, index){
            if (index !== 0 && index !== 1 && student[index - 1] !== undefined) {
              // console.log({itemKey: column.itemKey, score: student[index-1], studentKey: student.DistrictStudentKey, classroomKey: $scope.currentAssessment.Classroom.ClassroomKey});
              if (!uiGridValidateService.isInvalid(student, column)) {
              dataEntryService.saveScore(column.itemKey, student[index - 1], student.StudentAssessmentKey);
            }

            // var j = column.name.split(".");
                // j is now array of prop names to drill into data
                // var rowEntity = student;
                // var foundScore = false;
                // //descend into object using array of prop names
                // angular.forEach(j, function(prop, index){
                //   if(rowEntity != undefined){
                //     rowEntity = rowEntity[prop];
                //     if(rowEntity){
                //     if(index == j.length - 1){
                //       foundScore = true;
                //     }
                //   }
                //   }
                // });

              //   if(false){
              //   console.log({itemKey: column.itemKey, score: rowEntity, studentKey: student.DistrictStudentKey});
              // }
          }
          });
          // console.log($scope.gridApi.grid.rows[0].getQualifiedColField("1"));
          // console.log($scope.gridApi.grid.rows);
          // console.log(student);
        });
      };

      $scope.areRowsChecked = function() {
        let returnVal = false;
        angular.forEach($scope.gridOptions.data, function (student) {
          if (student.checked) {
            returnVal = true;
          }
        });
        return returnVal;
      };

      $scope.hideChecked = function(){
        angular.forEach($scope.gridOptions.data, function (student) {
          if (student.checked) {
            student.hidden = true;
            student.checked = false;
            $scope.areStudentsHidden = true;
          }
        });
        $scope.gridApi.core.refresh();
      };

      $scope.removeChecked = function(){
        angular.forEach($scope.gridOptions.data, function (student) {
          if (student.checked) {
            student.removed = true;
            student.hidden = true;
            student.checked = false;
            $scope.studentsToRemove.push(student.StudentAssessmentKey);
          }
        });
        $scope.gridApi.core.refresh();
      };

      $scope.showAllStudents = function(){
        angular.forEach($scope.gridOptions.data, function (student) {
          if (!student.removed) {
            student.hidden = false;
            student.checked = false;
          }
        });
        $scope.areStudentsHidden = false;
        $scope.gridApi.core.refresh();
      };

      $scope.selectMarkingPeriod = function(markingPeriod: MarkingPeriod){
        if (markingPeriod.Children.length === 0) {
          $scope.getStudents(markingPeriod.MarkingPeriodKey);
        }
        else {
          $scope.gridOptions.data = [];
        }
      };

      $scope.getStudents = function(markingPeriodKey){
        dataEntryService.getStudents(dataEntryService.currentAssessment.ClassroomKey, markingPeriodKey)
        .then(function(d: Array<StudentAssessment>){
          angular.forEach(d, function(assessment){
            assessment.hidden = false;
            angular.forEach(assessment.Scores, function(score){
              assessment[score.Item.ItemOrder] = score.Score1;
            });
          });
          $scope.gridOptions.data = d;
          $scope.gridOptions.columnDefs[1].visible = false;
          $scope.gridApi.core.refresh();
        });
      };


      $scope.setHeadingDropdownWidth = function(){
        $timeout(function () {
          let dropdowns = $(".table-heading-dropdown");
          for ( let i = 0; i < dropdowns.length; i++) {
            $($(dropdowns[i])).css({ "width": "" });
            if ($(dropdowns[i]).width() < $(dropdowns[i]).parent("th").outerWidth()) {
              $(dropdowns[i]).width($(dropdowns[i]).parent("th").outerWidth());
            }
          }
        });
      };

      // toggle if search input is open
      $scope.toggleSearchOpen = function () {
        $scope.searchOpen = !$scope.searchOpen;
        if ($scope.searchOpen) {
          // focus("studentSearchInput");
        }
      };

      // open table heading filtration
      $scope.openHeading = function (heading) {
        $scope.closeHeadings();
        heading.open = true;
        $scope.justOpenedHeading = true;
      };

      // close all table heading filters
      $scope.closeHeadings = function () {
        $scope.headingOpen = false;
        angular.forEach($scope.headingOptions, function (value, key) {
          value.open = false;
        });
      };

      // select table heading filter option
      $scope.selectHeadingOption = function (heading: HeadingOption, option: FilterOption) {
        if (option.Key !== "All") {
          heading.selected = option;
        } else {
          heading.selected = { Key: "", Value: "" };
        }

        $scope.checkFilters();
        $scope.closeHeadings();
      };

      $scope.checkFilters = function () {
        $scope.areOptionsSelected = false;
        angular.forEach($scope.headingOptions, function (value, key) {
          if (value.selected !== undefined) {
            if (value.selected.Value !== "") {
              $scope.areOptionsSelected = true;
              return;
            }
          }
        });
      };

      $scope.clearFilters = function (input) {
        angular.forEach($scope.headingOptions, function (value, key) {
          value.selected = { Key: "", Value: "" };
        });

        $scope.areOptionsSelected = false;
        $scope.closeHeadings();
      };

      $scope.headingSortValue = function (item) {
        if (item.Key === "All") {
          return -1;
        }
        return item;
      };
    }
  }
}
