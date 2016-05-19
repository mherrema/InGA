var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var AssessmentsController = (function (_super) {
        __extends(AssessmentsController, _super);
        function AssessmentsController($scope, $timeout, $uibModal, mainService, assessmentService, filterService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
                mainService.setPageTitles("Assessment Management", "INGA");
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
                };
                $scope.$watch(function () { return assessmentService.currentDistrictAssessments; }, function (newValue, oldValue) {
                    $scope.currentAssessments = newValue;
                });
            };
            $scope.getAssessments = function () {
                assessmentService.getDistrictAssessments().then(function (d) {
                    // $scope.currentAssessments = d;
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
            $scope.getFilterOptions = function () {
                filterService.getDistrictAssessmentFilterOptions().then(function (d) {
                    $scope.headingOptions = d;
                    $scope.setHeadingDropdownWidth();
                });
            };
            $scope.toggleAllChecked = function () {
                angular.forEach($scope.currentAssessments, function (assessment) {
                    if (!$scope.allChecked) {
                        assessment.checked = false;
                    }
                    else {
                        assessment.checked = true;
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
            $scope.openAssessmentViewModal = function (assessment) {
                var tmpAssessment = assessment;
                console.log(tmpAssessment);
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'partials/modals/viewAssessmentModal.html',
                    controller: 'AssessmentViewModalController',
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
                if (item.Key == "All") {
                    return -1;
                }
                return item;
            };
        }
        AssessmentsController.$inject = ['$scope', '$timeout', '$uibModal', 'mainService', 'assessmentService', 'filterService'];
        return AssessmentsController;
    }(BaseController.Controller));
    INGAApp.AssessmentsController = AssessmentsController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=AssessmentsController.js.map