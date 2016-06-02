var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var DataEntryAssessmentListController = (function (_super) {
        __extends(DataEntryAssessmentListController, _super);
        function DataEntryAssessmentListController($scope, $timeout, $location, $uibModal, mainService, assessmentService, dataEntryService, filterService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
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
                };
            };
            $scope.getClassroomAssessments = function () {
                assessmentService.getClassroomAssessments("").then(function (d) {
                    $scope.currentClassroomAssessments = d;
                });
            };
            $scope.getFilterOptions = function () {
                filterService.getDataEntryFilterOptions().then(function (d) {
                    $scope.headingOptions = d;
                    $scope.setHeadingDropdownWidth();
                });
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
            //toggle if search input is open
            $scope.toggleSearchOpen = function () {
                $scope.searchOpen = !$scope.searchOpen;
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
                if (option.Key != "All") {
                    heading.selected = option;
                }
                else {
                    heading.selected = { Key: "", Value: "" };
                }
                $scope.checkFilters();
                $scope.closeHeadings();
            };
            $scope.checkFilters = function () {
                $scope.areOptionsSelected = false;
                angular.forEach($scope.headingOptions, function (value, key) {
                    if (value.selected != undefined) {
                        if (value.selected.Value != "") {
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
            $scope.goToDataEntry = function (assessment) {
                dataEntryService.currentAssessment = assessment;
                $location.path("/dataEntry/score");
            };
            $scope.headingSortValue = function (item) {
                if (item.Key == "All") {
                    return -1;
                }
                return item;
            };
        }
        DataEntryAssessmentListController.$inject = ['$scope', '$timeout', '$location', '$uibModal', 'mainService', 'assessmentService', 'dataEntryService', 'filterService'];
        return DataEntryAssessmentListController;
    }(BaseController.Controller));
    INGAApp.DataEntryAssessmentListController = DataEntryAssessmentListController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=DataEntryAssessmentListController.js.map