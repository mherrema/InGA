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
    validateStudents: Function;
    currentStudentAssessments: Array<StudentAssessment>;
    currentMarkingPeriodKey: number;
  }

  export class DataEntryScoreViewController extends BaseController.Controller {
    scope: IDataEntryScoreViewScope;
    static $inject = ["$scope", "$timeout", "$location", "$uibModal", "mainService", "dataEntryService", "uiGridValidateService", "$window"];

    constructor( $scope: IDataEntryScoreViewScope, $timeout: ng.ITimeoutService, $location: ng.ILocationService,
      $uibModal: ng.ui.bootstrap.IModalService, mainService: MainService, dataEntryService: DataEntryService,
      uiGridValidateService: uiGrid.GridValidateService, $window: ng.IWindowService) {
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

      $scope.init = function(){
        $scope.gridOptions = {
          onRegisterApi: function(gridApi){
            $scope.gridApi = gridApi;
          },
          enableSorting: false,
          enableFiltering: true,
          enableColumnMenus: false,
          columnDefs: [{name: "Name", minWidth: 250, pinnedLeft: true, enableSorting: true, cellEditableCondition: false,
          cellTemplate: "<div class='ui-grid-cell-contents'><input type='checkbox' ng-model='row.entity.checked' ng-checked='row.entity.checked' /> {{row.entity.DistrictStudent.LastName}}, {{row.entity.DistrictStudent.FirstName}} ({{row.entity.DistrictStudent.StudentNumber}})</div>"}],
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

        $scope.$watch(() => dataEntryService.shouldSaveAndExit,
        (newValue: boolean, oldValue: boolean) => {
          if (newValue) {
            $scope.saveAndExit();
            dataEntryService.shouldSaveAndExit = false;
          }
        });

        $scope.studentsToRemove = [];
      };

      $scope.saveAndExit = function(){
        angular.forEach($scope.gridOptions.data, function(student){
          angular.forEach($scope.gridOptions.columnDefs, function(column, index){
            if (index !== 0  && student[index] !== undefined) {
              // console.log({itemKey: column.itemKey, score: student[index-1], studentKey: student.DistrictStudentKey, classroomKey: $scope.currentAssessment.Classroom.ClassroomKey});
              if (!uiGridValidateService.isInvalid(student, column)) {
              dataEntryService.saveScore(column.itemKey, student[index], student.StudentAssessmentKey);
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

        $location.path("/dataEntry");
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
          // if (student.checked) {
          //   student.hidden = true;
          //   student.checked = false;
          //   $scope.areStudentsHidden = true;
          // }
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
        // angular.forEach($scope.gridOptions.data, function (student) {
        //   if (!student.removed) {
        //     student.hidden = false;
        //     student.checked = false;
        //   }
        // });
        // $scope.areStudentsHidden = false;
        // $scope.gridApi.core.refresh();
      };

      $scope.selectMarkingPeriod = function(markingPeriod: MarkingPeriod){
        if (markingPeriod.Children.length === 0) {
          $scope.getStudents(markingPeriod.MarkingPeriodKey);
        }
        else {
          $scope.gridOptions.data = [];
          $scope.currentStudentAssessments = [];
        }
      };

      $scope.getStudents = function(markingPeriodKey){
        $scope.currentMarkingPeriodKey = markingPeriodKey;
        dataEntryService.getStudents(dataEntryService.currentAssessment.ClassroomKey, markingPeriodKey)
        .then(function(d: Array<StudentAssessment>){
          $scope.currentStudentAssessments = d;
          angular.forEach(d, function(assessment){
            // assessment.hidden = false;
            angular.forEach(assessment.Scores, function(score){
              assessment[score.Item.ItemOrder] = score.Score1;
            });
          });
          $scope.gridOptions.data = d;
          // $scope.gridOptions.columnDefs[1].visible = false;
          $scope.gridApi.core.refresh();
        });
      };

      $scope.validateStudents = function(){
        // if ($scope.currentStudentAssessments && $scope.currentStudentAssessments.length > 0) {
        let modalInstance = $uibModal.open({
          animation: true,
          templateUrl: "partials/modals/validateStudentsModal.html",
          controller: "ValidateStudentsModalController",
          size: "lg",
          resolve: {
            classroomAssessmentKey: function () {
              return dataEntryService.currentAssessment.ClassroomAssessmentKey;
            },
            markingPeriodKey: function(){
              return $scope.currentMarkingPeriodKey;
            }
          }
        });

        modalInstance.result.then(function (success: boolean) {
          if (success) {
            $scope.getStudents($scope.currentMarkingPeriodKey);
          }
        });
      // }
      };
    }
  }
}
