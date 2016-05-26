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
                $scope.templatesActive = false;
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
                $scope.$watch(function () { return assessmentService.currentAssessmentTemplates; }, function (newValue, oldValue) {
                    $scope.currentAssessmentTemplates = newValue;
                });
            };
            $scope.toggleTemplates = function () {
                $scope.templatesActive = !$scope.templatesActive;
                $scope.clearFilters();
                if ($scope.templatesActive) {
                    if (assessmentService.currentAssessmentTemplates.length == 0) {
                        assessmentService.getAssessmentTemplates();
                    }
                }
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
                if (!$scope.templatesActive) {
                    angular.forEach($scope.currentAssessments, function (assessment) {
                        if (!$scope.allChecked) {
                            assessment.checked = false;
                        }
                        else {
                            assessment.checked = true;
                        }
                    });
                }
                else {
                    angular.forEach($scope.currentAssessmentTemplates, function (template) {
                        if (!$scope.allChecked) {
                            template.checked = false;
                        }
                        else {
                            template.checked = true;
                        }
                    });
                }
            };
            $scope.deleteChecked = function () {
                if ($scope.areRowsChecked()) {
                    if (!$scope.templatesActive) {
                        var confirmationPackage = { Action: "delete", Objects: "these assessments?" };
                    }
                    else {
                        var confirmationPackage = { Action: "delete", Objects: "these assessment templates?" };
                    }
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'partials/modals/dialog/confirmationModal.html',
                        controller: 'ConfirmationModalController',
                        size: "lg",
                        resolve: {
                            confirmationPackage: function () {
                                return confirmationPackage;
                            }
                        }
                    });
                    modalInstance.result.then(function () {
                        if (!$scope.templatesActive) {
                            $scope.deleteAssessments();
                        }
                        else {
                            $scope.deleteAssessmentTemplates();
                        }
                    });
                }
            };
            $scope.deleteAssessments = function () {
                // var assessmentsDeleted : Array<number> = [];
                angular.forEach($scope.currentAssessments, function (assessment) {
                    if (assessment.checked) {
                        assessmentService.deleteAssessment(assessment.DistrictAssessmentKey).then(function (res) {
                            if (res) {
                                //success
                                for (var i = assessmentService.currentDistrictAssessments.length - 1; i >= 0; i--) {
                                    if (assessmentService.currentDistrictAssessments[i].DistrictAssessmentKey == assessment.DistrictAssessmentKey) {
                                        assessmentService.currentDistrictAssessments.splice(i, 1);
                                    }
                                }
                            }
                            else {
                                alert("Error while deleting assessment");
                            }
                        })
                            .catch(function (res) {
                            alert("Error while deleting assessment");
                        });
                    }
                });
            };
            $scope.deleteAssessmentTemplates = function () {
                // var assessmentsDeleted : Array<number> = [];
                angular.forEach($scope.currentAssessmentTemplates, function (template) {
                    if (template.checked) {
                        assessmentService.deleteAssessmentTemplate(template.AssessmentTemplateKey).then(function (res) {
                            if (res) {
                                //success
                                for (var i = assessmentService.currentAssessmentTemplates.length - 1; i >= 0; i--) {
                                    if (assessmentService.currentAssessmentTemplates[i].AssessmentTemplateKey == template.AssessmentTemplateKey) {
                                        assessmentService.currentAssessmentTemplates.splice(i, 1);
                                    }
                                }
                            }
                            else {
                                alert("Error while deleting assessment template");
                            }
                        })
                            .catch(function (res) {
                            alert("Error while deleting assessment template");
                        });
                    }
                });
            };
            $scope.areRowsChecked = function () {
                var returnVal = false;
                angular.forEach($scope.currentAssessments, function (assessment) {
                    if (assessment.checked) {
                        returnVal = true;
                    }
                });
                angular.forEach($scope.currentAssessmentTemplates, function (template) {
                    if (template.checked) {
                        returnVal = true;
                    }
                });
                return returnVal;
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
                angular.forEach($scope.currentAssessments, function (assessment) {
                    assessment.checked = false;
                });
                angular.forEach($scope.currentAssessmentTemplates, function (template) {
                    template.checked = false;
                });
                angular.forEach($scope.headingOptions, function (value, key) {
                    value.selected = { Key: "", Value: "" };
                });
                $scope.areOptionsSelected = false;
                $scope.closeHeadings();
            };
            $scope.openAssessmentViewModal = function (assessment) {
                // var tmpAssessment = assessment;
                // console.log(tmpAssessment);
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'partials/modals/viewAssessmentModal.html',
                    controller: 'ViewAssessmentModalController',
                    size: "extra-wide",
                    resolve: {
                        assessment: function () {
                            return assessment;
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    console.log(selectedItem);
                });
            };
            $scope.openAssessmentTemplateViewModal = function (template) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'partials/modals/viewAssessmentTemplateModal.html',
                    controller: 'ViewAssessmentTemplateModalController',
                    size: "extra-wide",
                    resolve: {
                        template: function () {
                            return template;
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