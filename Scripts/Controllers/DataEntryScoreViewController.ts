module INGAApp
{

  interface IDataEntryScoreViewScope extends BaseController.IScope
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
    currentAssessment: ClassroomAssessment,
    toggleAllChecked : Function,
    allChecked : boolean,
    newAssessment: DistrictAssessment,
    openAssessmentViewModal: Function,
    goToDataEntry: Function,
    headingSortValue: Function,
    myData: Array<Object>,
    gridOptions: GridOptions
  }

  export class DataEntryScoreViewController extends BaseController.Controller
  {
    scope: IDataEntryScoreViewScope;
    static $inject = ['$scope', '$timeout', '$location', '$uibModal', 'mainService', 'dataEntryService'];

    constructor( $scope: IDataEntryScoreViewScope, $timeout: ng.ITimeoutService, $location: ng.ILocationService, $uibModal: ng.ui.bootstrap.IModalService, mainService: MainService, dataEntryService: DataEntryService)
    {
      super( $scope );
      var controller = this;

      $scope.init = function(){
        $scope.gridOptions = {
          enableSorting: false,
          enableColumnMenus: false,
          columnDefs: [{name: "Name", minWidth: 250, pinnedLeft:true, enableSorting: true, cellEditableCondition: false,
          cellTemplate: '<div class="ui-grid-cell-contents"><input type="checkbox" ng-model="row.entity.checked" ng-checked="row.entity.checked" /> {{row.entity.DistrictStudent.LastName}}, {{row.entity.DistrictStudent.FirstName}} ({{row.entity.DistrictStudent.StudentNumber}})</div>'},
          ],
          enableCellEditOnFocus: true,
          data: [],
          rowHeight: 45
        };
        if(dataEntryService.currentAssessment == undefined){
          $location.path("/dataEntry");
        }
        if(dataEntryService.currentAssessment != undefined){
          mainService.setPageTitles(dataEntryService.currentAssessment.Title, "Assessment Class Score View");
          dataEntryService.getStudents(dataEntryService.currentAssessment.ClassroomKey)
          .then(function(d: Array<StudentAssessment>){
            $scope.gridOptions.data = d;

            // $scope.$apply();
          });

          dataEntryService.getItems(dataEntryService.currentAssessment.DistrictAssessmentKey)
          .then(function(d: Array<Item>){
            angular.forEach(d, function(item){
              $scope.gridOptions.columnDefs.push({name: item.Standard.StandardCode, minWidth: 150})
            })
          })
        }
        $scope.$watch(() => dataEntryService.currentAssessment,
        (newValue: ClassroomAssessment, oldValue: ClassroomAssessment) => {
          $scope.currentAssessment = newValue;
        });


      }


      //
      // $scope.myData = [
      //   {
      //     "firstName": "Cox",
      //     "lastName": "Carney",
      //     "company": "Enormo",
      //     "employed": true,
      //     "firstName2": "Cox really long first name",
      //     "lastName2": "Carney",
      //     "company2": "Enormo",
      //     "employed2": true,
      //     "firstName3": "Cox",
      //     "lastName3": "Carney",
      //     "company3": "Enormo",
      //     "employed3": true,
      //     "firstName4": "Cox",
      //     "lastName4": "Carney",
      //     "company4": "Enormo",
      //     "employed4": true,
      //     "firstName5": "Cox",
      //     "lastName5": "Carney",
      //     "company5": "Enormo",
      //     "employed5": true
      //   },
      //   {
      //     "firstName": "Lorraine asdfsdf",
      //     "lastName": "Wise",
      //     "company": "Comveyer",
      //     "employed": false
      //   },
      //   {
      //     "firstName": "Nancy",
      //     "lastName": "Waters",
      //     "company": "Fuelton",
      //     "employed": false
      //   },
      //   {
      //     "firstName": "Cox",
      //     "lastName": "Carney",
      //     "company": "Enormo",
      //     "employed": true
      //   },
      //   {
      //     "firstName": "Lorraine",
      //     "lastName": "Wise",
      //     "company": "Comveyer",
      //     "employed": false
      //   },
      //   {
      //     "firstName": "Nancy",
      //     "lastName": "Waters",
      //     "company": "Fuelton",
      //     "employed": false
      //   },
      //   {
      //     "firstName": "Cox",
      //     "lastName": "Carney",
      //     "company": "Enormo",
      //     "employed": true
      //   },
      //   {
      //     "firstName": "Lorraine",
      //     "lastName": "Wise",
      //     "company": "Comveyer",
      //     "employed": false
      //   },
      //   {
      //     "firstName": "Nancy",
      //     "lastName": "Waters",
      //     "company": "Fuelton",
      //     "employed": false
      //   },
      //   {
      //     "firstName": "Cox",
      //     "lastName": "Carney",
      //     "company": "Enormo",
      //     "employed": true
      //   },
      //   {
      //     "firstName": "Lorraine",
      //     "lastName": "Wise",
      //     "company": "Comveyer",
      //     "employed": false
      //   },
      //   {
      //     "firstName": "Nancy",
      //     "lastName": "Waters",
      //     "company": "Fuelton",
      //     "employed": false
      //   }
      // ];



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

      $scope.headingSortValue = function (item) {
        if (item.Key == "All"){
          return -1;
        }
        return item;
      }
    }
  }
}
