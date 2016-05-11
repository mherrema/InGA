var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var AssessmentsController = (function (_super) {
        __extends(AssessmentsController, _super);
        function AssessmentsController($scope, $timeout, $uibModal, mainService, assessmentService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
                mainService.setPageTitles("Assessment Management", "INGA");
                $scope.getAssessments();
                $scope.headingOptions = [{ heading: "Grade Level", options: [{ key: "K" }, { key: "1" }], open: false },
                    { heading: "Subject Area", options: [{ key: "K" }, { key: "1" }], open: false },
                    { heading: "Term", options: [{ key: "K" }, { key: "1" }], open: false },
                    { heading: "School Year", options: [{ key: "K" }, { key: "1" }], open: false }];
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
                $scope.$watch(function () { return assessmentService.currentAssessments; }, function (newValue, oldValue) {
                    $scope.currentAssessments = newValue;
                });
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
                if (item.Key == "All") {
                    return -1;
                }
                return item;
            };
        }
        AssessmentsController.$inject = ['$scope', '$timeout', '$uibModal', 'mainService', 'assessmentService'];
        return AssessmentsController;
    }(BaseController.Controller));
    INGAApp.AssessmentsController = AssessmentsController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=AssessmentsController.js.map