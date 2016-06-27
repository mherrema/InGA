var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var DataEntryScoreViewController = (function (_super) {
        __extends(DataEntryScoreViewController, _super);
        function DataEntryScoreViewController($scope, $timeout, $location, $uibModal, mainService, dataEntryService, uiGridValidateService, $window) {
            _super.call(this, $scope);
            var controller = this;
            uiGridValidateService.setValidator("pointsWithinRange", function (argument) {
                return function (oldValue, newValue, rowEntity, colDef) {
                    if (!newValue) {
                        return true; // We should not test for existence here
                    }
                    else {
                        return newValue <= colDef.pointsMax && newValue >= colDef.pointsMin;
                    }
                };
            }, function (argument) {
                return "You can only insert names starting with:" + argument;
            });
            $scope.init = function () {
                $scope.gridOptions = {
                    onRegisterApi: function (gridApi) {
                        $scope.gridApi = gridApi;
                    },
                    enableSorting: false,
                    enableFiltering: true,
                    enableColumnMenus: false,
                    columnDefs: [{ name: "Name", minWidth: 250, pinnedLeft: true, enableSorting: true, cellEditableCondition: false,
                            cellTemplate: "<div class='ui-grid-cell-contents'><input type='checkbox' ng-model='row.entity.checked' ng-checked='row.entity.checked' /> {{row.entity.DistrictStudent.LastName}}, {{row.entity.DistrictStudent.FirstName}} ({{row.entity.DistrictStudent.StudentNumber}})</div>" }],
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
                        .then(function (d) {
                        $scope.items = d;
                        console.log(d);
                        angular.forEach(d, function (item, index) {
                            var name = "";
                            if (item.Label) {
                                name = item.Label;
                            }
                            else {
                                name = item.StandardCode;
                            }
                            $scope.gridOptions.columnDefs.push({ name: name + " (" + item.PointsMax + ")", displayName: name + " (" + item.PointsMax + ")", minWidth: 150, itemKey: item.ItemKey,
                                field: String(item.ItemOrder), type: "number", pointsMax: item.PointsMax, pointsMin: item.PointsMin, validators: { pointsWithinRange: "" },
                                cellTemplate: "ui-grid/cellTitleValidator" });
                        });
                    });
                }
                $scope.$watch(function () { return dataEntryService.currentAssessment; }, function (newValue, oldValue) {
                    $scope.currentAssessment = newValue;
                });
                $scope.$watch(function () { return dataEntryService.shouldSaveAndExit; }, function (newValue, oldValue) {
                    if (newValue) {
                        $scope.saveAndExit();
                        dataEntryService.shouldSaveAndExit = false;
                    }
                });
                $scope.studentsToRemove = [];
            };
            $scope.saveAndExit = function () {
                angular.forEach($scope.gridOptions.data, function (student) {
                    angular.forEach($scope.gridOptions.columnDefs, function (column, index) {
                        if (index !== 0 && student[index - 1] !== undefined) {
                            // console.log({itemKey: column.itemKey, score: student[index-1], studentKey: student.DistrictStudentKey, classroomKey: $scope.currentAssessment.Classroom.ClassroomKey});
                            if (!uiGridValidateService.isInvalid(student, column)) {
                                dataEntryService.saveScore(column.itemKey, student[index - 1], student.StudentAssessmentKey);
                            }
                        }
                    });
                    // console.log($scope.gridApi.grid.rows[0].getQualifiedColField("1"));
                    // console.log($scope.gridApi.grid.rows);
                    // console.log(student);
                });
                $location.path("/dataEntry");
            };
            $scope.areRowsChecked = function () {
                var returnVal = false;
                angular.forEach($scope.gridOptions.data, function (student) {
                    if (student.checked) {
                        returnVal = true;
                    }
                });
                return returnVal;
            };
            $scope.hideChecked = function () {
                angular.forEach($scope.gridOptions.data, function (student) {
                    // if (student.checked) {
                    //   student.hidden = true;
                    //   student.checked = false;
                    //   $scope.areStudentsHidden = true;
                    // }
                });
                $scope.gridApi.core.refresh();
            };
            $scope.removeChecked = function () {
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
            $scope.showAllStudents = function () {
                // angular.forEach($scope.gridOptions.data, function (student) {
                //   if (!student.removed) {
                //     student.hidden = false;
                //     student.checked = false;
                //   }
                // });
                // $scope.areStudentsHidden = false;
                // $scope.gridApi.core.refresh();
            };
            $scope.selectMarkingPeriod = function (markingPeriod) {
                if (markingPeriod.Children.length === 0) {
                    $scope.getStudents(markingPeriod.MarkingPeriodKey);
                }
                else {
                    $scope.gridOptions.data = [];
                    $scope.currentStudentAssessments = [];
                }
            };
            $scope.getStudents = function (markingPeriodKey) {
                dataEntryService.getStudents(dataEntryService.currentAssessment.ClassroomKey, markingPeriodKey)
                    .then(function (d) {
                    $scope.currentStudentAssessments = d;
                    angular.forEach(d, function (assessment) {
                        // assessment.hidden = false;
                        angular.forEach(assessment.Scores, function (score) {
                            assessment[score.Item.ItemOrder - 1] = score.Score1;
                        });
                    });
                    $scope.gridOptions.data = d;
                    // $scope.gridOptions.columnDefs[1].visible = false;
                    $scope.gridApi.core.refresh();
                });
            };
            $scope.validateStudents = function () {
                if ($scope.currentStudentAssessments && $scope.currentStudentAssessments.length > 0) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: "partials/modals/validateStudentsModal.html",
                        controller: "ValidateStudentsModalController",
                        size: "lg",
                        resolve: {
                            classroomAssessmentKey: function () {
                                return dataEntryService.currentAssessment.ClassroomAssessmentKey;
                            }
                        }
                    });
                    modalInstance.result.then(function (assessmentPackage) {
                        // assessmentService.saveAssessment(assessmentPackage).then(function(res: ReturnPackage){
                        //   if (res.Success) {
                        //     assessmentPackage.Assessment.DistrictAssessmentKey = res.Key;
                        //     if (assessmentPackage.Assessment.SelectedCalendar.$selected.CalendarKey) {
                        //       assessmentPackage.Assessment.Calendar = {CalendarName: assessmentPackage.Assessment.SelectedCalendar.$selected.Title};
                        //     }
                        //     else if (assessmentPackage.Assessment.SelectedCalendar.$selected.MarkingPeriodKey) {
                        //       assessmentPackage.Assessment.MarkingPeriod = {Name: assessmentPackage.Assessment.SelectedCalendar.$selected.Title};
                        //     }
                        //     assessmentService.currentDistrictAssessments.push(assessmentPackage.Assessment);
                        //     notificationService.showNotification("Success saving assessment", "success");
                        //     // show success!
                        //     if (assessmentPackage.ShouldPublish) {
                        //       console.log("Going to assessment view");
                        //       // go to assessment view
                        //     }
                        //   }
                        //   else {
                        //     notificationService.showNotification("Error saving assessment", "error");
                        //     // show error!
                        //   }
                        // });
                    });
                }
            };
            // $scope.setHeadingDropdownWidth = function(){
            //   $timeout(function () {
            //     let dropdowns = $(".table-heading-dropdown");
            //     for ( let i = 0; i < dropdowns.length; i++) {
            //       $($(dropdowns[i])).css({ "width": "" });
            //       if ($(dropdowns[i]).width() < $(dropdowns[i]).parent("th").outerWidth()) {
            //         $(dropdowns[i]).width($(dropdowns[i]).parent("th").outerWidth());
            //       }
            //     }
            //   });
            // };
            //
            // // toggle if search input is open
            // $scope.toggleSearchOpen = function () {
            //   $scope.searchOpen = !$scope.searchOpen;
            //   if ($scope.searchOpen) {
            //     // focus("studentSearchInput");
            //   }
            // };
            // // open table heading filtration
            // $scope.openHeading = function (heading) {
            //   $scope.closeHeadings();
            //   heading.open = true;
            //   $scope.justOpenedHeading = true;
            // };
            //
            // // close all table heading filters
            // $scope.closeHeadings = function () {
            //   $scope.headingOpen = false;
            //   angular.forEach($scope.headingOptions, function (value, key) {
            //     value.open = false;
            //   });
            // };
            //
            // // select table heading filter option
            // $scope.selectHeadingOption = function (heading: HeadingOption, option: FilterOption) {
            //   if (option.Key !== "All") {
            //     heading.selected = option;
            //   } else {
            //     heading.selected = { Key: "", Value: "" };
            //   }
            //
            //   $scope.checkFilters();
            //   $scope.closeHeadings();
            // };
            //
            // $scope.checkFilters = function () {
            //   $scope.areOptionsSelected = false;
            //   angular.forEach($scope.headingOptions, function (value, key) {
            //     if (value.selected !== undefined) {
            //       if (value.selected.Value !== "") {
            //         $scope.areOptionsSelected = true;
            //         return;
            //       }
            //     }
            //   });
            // };
            //
            // $scope.clearFilters = function (input) {
            //   angular.forEach($scope.headingOptions, function (value, key) {
            //     value.selected = { Key: "", Value: "" };
            //   });
            //
            //   $scope.areOptionsSelected = false;
            //   $scope.closeHeadings();
            // };
            //
            // $scope.headingSortValue = function (item) {
            //   if (item.Key === "All") {
            //     return -1;
            //   }
            //   return item;
            // };
        }
        DataEntryScoreViewController.$inject = ["$scope", "$timeout", "$location", "$uibModal", "mainService", "dataEntryService", "uiGridValidateService", "$window"];
        return DataEntryScoreViewController;
    }(BaseController.Controller));
    INGAApp.DataEntryScoreViewController = DataEntryScoreViewController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=DataEntryScoreViewController.js.map