var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var AssessmentAssignmentController = (function (_super) {
        __extends(AssessmentAssignmentController, _super);
        function AssessmentAssignmentController($scope, $timeout, $uibModal, mainService, assessmentService, filterService) {
            _super.call(this, $scope);
            var controller = this;
            console.log("assignment controller");
            $scope.init = function () {
                mainService.setPageTitles("Assessment Assignment", "Assessment Assignment");
                $scope.currentAssessment = assessmentService.currentSelectedDistrictAssessment;
                $scope.getClassrooms();
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
                $scope.$watch(function () { return assessmentService.currentSelectedDistrictAssessment; }, function (newValue, oldValue) {
                    $scope.currentAssessment = newValue;
                    $scope.updateClassroomAssignments();
                });
            };
            $scope.getClassrooms = function () {
                assessmentService.getClassrooms("").then(function (d) {
                    $scope.currentClassrooms = d;
                    $scope.updateClassroomAssignments();
                    $scope.setHeadingDropdownWidth();
                });
            };
            $scope.updateClassroomAssignments = function () {
                angular.forEach($scope.currentClassrooms, function (classroom) {
                    classroom.AssignedString = "Unassigned";
                    classroom.IsAssigned = false;
                    angular.forEach(classroom.ClassroomAssessments, function (assessment) {
                        if (assessment.ClassroomKey == classroom.ClassroomKey) {
                            classroom.AssignedString = "Assigned";
                            classroom.IsAssigned = true;
                        }
                    });
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
                filterService.getClassroomFilterOptions().then(function (d) {
                    $scope.headingOptions = d;
                    $scope.setHeadingDropdownWidth();
                });
            };
            $scope.toggleAllChecked = function () {
                angular.forEach($scope.currentClassrooms, function (classroom) {
                    if (!$scope.allChecked) {
                        classroom.checked = false;
                    }
                    else {
                        classroom.checked = true;
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
                // $scope.loading = true;
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
            $scope.headingSortValue = function (item) {
                if (item.Key == "All") {
                    return -1;
                }
                return item;
            };
        }
        AssessmentAssignmentController.$inject = ['$scope', '$timeout', '$uibModal', 'mainService', 'assessmentService', 'filterService'];
        return AssessmentAssignmentController;
    }(BaseController.Controller));
    INGAApp.AssessmentAssignmentController = AssessmentAssignmentController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=AssessmentAssignmentController.js.map