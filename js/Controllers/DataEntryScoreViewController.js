var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var DataEntryScoreViewController = (function (_super) {
        __extends(DataEntryScoreViewController, _super);
        function DataEntryScoreViewController($scope, $timeout, $location, $uibModal, mainService, dataEntryService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
                if (dataEntryService.currentAssessment == undefined) {
                    $location.path("/dataEntry");
                }
                if (dataEntryService.currentAssessment != undefined) {
                    mainService.setPageTitles(dataEntryService.currentAssessment.Title, "Assessment Class Score View");
                }
                $scope.$watch(function () { return dataEntryService.currentAssessment; }, function (newValue, oldValue) {
                    $scope.currentAssessment = newValue;
                });
            };
            $scope.myData = [
                {
                    "firstName": "Cox",
                    "lastName": "Carney",
                    "company": "Enormo",
                    "employed": true,
                    "firstName2": "Cox really long first name",
                    "lastName2": "Carney",
                    "company2": "Enormo",
                    "employed2": true,
                    "firstName3": "Cox",
                    "lastName3": "Carney",
                    "company3": "Enormo",
                    "employed3": true,
                    "firstName4": "Cox",
                    "lastName4": "Carney",
                    "company4": "Enormo",
                    "employed4": true,
                    "firstName5": "Cox",
                    "lastName5": "Carney",
                    "company5": "Enormo",
                    "employed5": true
                },
                {
                    "firstName": "Lorraine asdfsdf",
                    "lastName": "Wise",
                    "company": "Comveyer",
                    "employed": false
                },
                {
                    "firstName": "Nancy",
                    "lastName": "Waters",
                    "company": "Fuelton",
                    "employed": false
                },
                {
                    "firstName": "Cox",
                    "lastName": "Carney",
                    "company": "Enormo",
                    "employed": true
                },
                {
                    "firstName": "Lorraine",
                    "lastName": "Wise",
                    "company": "Comveyer",
                    "employed": false
                },
                {
                    "firstName": "Nancy",
                    "lastName": "Waters",
                    "company": "Fuelton",
                    "employed": false
                },
                {
                    "firstName": "Cox",
                    "lastName": "Carney",
                    "company": "Enormo",
                    "employed": true
                },
                {
                    "firstName": "Lorraine",
                    "lastName": "Wise",
                    "company": "Comveyer",
                    "employed": false
                },
                {
                    "firstName": "Nancy",
                    "lastName": "Waters",
                    "company": "Fuelton",
                    "employed": false
                },
                {
                    "firstName": "Cox",
                    "lastName": "Carney",
                    "company": "Enormo",
                    "employed": true
                },
                {
                    "firstName": "Lorraine",
                    "lastName": "Wise",
                    "company": "Comveyer",
                    "employed": false
                },
                {
                    "firstName": "Nancy",
                    "lastName": "Waters",
                    "company": "Fuelton",
                    "employed": false
                }
            ];
            $scope.gridOptions = {
                enableSorting: false,
                enableColumnMenus: false,
                columnDefs: [{ name: "firstName", minWidth: 250, pinnedLeft: true, enableSorting: true, cellEditableCondition: false, cellTemplate: '<div class="ui-grid-cell-contents"><input type="checkbox" ng-model="row.entity.checked" ng-checked="row.entity.checked" /> {{row.entity.firstName}}</div>' },
                    { name: "lastName", minWidth: 150 },
                    { name: "company", minWidth: 150 },
                    { name: "employed", minWidth: 150 },
                    { name: "firstName2", minWidth: 150 },
                    { name: "lastName2", minWidth: 150 },
                    { name: "company2", minWidth: 150 },
                    { name: "employed2", minWidth: 150 },
                    { name: "firstName3", minWidth: 150 },
                    { name: "lastName3", minWidth: 150 },
                    { name: "company3", minWidth: 150 },
                    { name: "employed3", minWidth: 150 },
                    { name: "firstName4", minWidth: 150 },
                    { name: "lastName4", minWidth: 150 },
                    { name: "company4", minWidth: 150 },
                    { name: "employed4", minWidth: 150 }],
                enableCellEditOnFocus: true,
                data: $scope.myData,
                rowHeight: 45
            };
            $scope.getAssessments = function () {
                // $scope.currentAssessments = assessmentService.getAssessments();
            };
            $scope.setHeadingDropdownWidth = function () {
                $timeout(function () {
                    var dropdowns = $(".table-heading-dropdown");
                    for (var i = 0; i < dropdowns.length; i++) {
                        $($(dropdowns[i])).css({ "width": "" });
                        if ($(dropdowns[i]).width() < $(dropdowns[i]).parent("th").outerWidth()) {
                            $(dropdowns[i]).width($(dropdowns[i]).parent("th").outerWidth());
                        }
                    }
                });
            };
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
                }
            };
            //open table heading filtration
            $scope.openHeading = function (heading) {
                $scope.closeHeadings();
                heading.open = true;
                $scope.justOpenedHeading = true;
            };
            //close all table heading filters
            $scope.closeHeadings = function () {
                $scope.headingOpen = false;
                angular.forEach($scope.headingOptions, function (value, key) {
                    value.open = false;
                });
            };
            //select table heading filter option
            $scope.selectHeadingOption = function (heading, option) {
                // $scope.loading = true;
                if (option.key != "All") {
                    heading.selected = option;
                }
                else {
                    heading.selected = { key: "", value: "" };
                }
                $scope.checkFilters();
                $scope.closeHeadings();
            };
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
            };
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
            $scope.goToDataEntry = function (assessment) {
            };
            $scope.headingSortValue = function (item) {
                if (item.Key == "All") {
                    return -1;
                }
                return item;
            };
        }
        DataEntryScoreViewController.$inject = ['$scope', '$timeout', '$location', '$uibModal', 'mainService', 'dataEntryService'];
        return DataEntryScoreViewController;
    }(BaseController.Controller));
    INGAApp.DataEntryScoreViewController = DataEntryScoreViewController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=DataEntryScoreViewController.js.map