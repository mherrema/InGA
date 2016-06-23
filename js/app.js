///<reference path="../typings/angularjs/angular.d.ts"/>
///<reference path="../typings/angularjs/angular-route.d.ts"/>
///<reference path="../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts"/>
///<reference path="../typings/ui-grid/ui-grid.d.ts"/>
///<reference path="../typings/lodash/lodash.d.ts"/>
var INGA;
(function (INGA) {
    var Module = (function () {
        function Module(name, modules) {
            this.app = angular.module(name, modules);
            this.app.config(function ($routeProvider) {
                $routeProvider.otherwise({ redirectTo: "/assessments" });
            });
        }
        Module.prototype.addController = function (name, controller) {
            this.app.controller(name, controller);
        };
        Module.prototype.addService = function (name, service) {
            this.app.service(name, service);
        };
        Module.prototype.addFactory = function (name, factory) {
            this.app.factory(name, factory);
        };
        Module.prototype.addRoute = function (url, htmlPath, controller) {
            this.app.config(function ($routeProvider, $animateProvider) {
                $routeProvider.when(url, {
                    templateUrl: htmlPath,
                    controller: controller
                });
            });
        };
        return Module;
    }());
    INGA.Module = Module;
})(INGA || (INGA = {}));
var INGAApp;
(function (INGAApp) {
    var myApp = new INGA.Module("IngaApp", ["ngRoute", "ngAnimate", "ngSanitize", "ui.bootstrap", "ui.select", "ui.sortable", "ui.grid", "ui.grid.edit", "ui.grid.cellNav", "ui.grid.pinning", "ui.grid.validate", "angular-loading-bar"]);
    myApp.addController("MainINGAController", INGAApp.MainController);
    myApp.addController("AssessmentsController", INGAApp.AssessmentsController);
    myApp.addController("NewAssessmentModalController", INGAApp.NewAssessmentModalController);
    myApp.addController("EditAssessmentModalController", INGAApp.EditAssessmentModalController);
    myApp.addController("ViewAssessmentModalController", INGAApp.ViewAssessmentModalController);
    myApp.addController("AssessmentAssignmentController", INGAApp.AssessmentAssignmentController);
    myApp.addController("NewAssessmentItemModalController", INGAApp.NewAssessmentItemModalController);
    myApp.addController("ViewAssessmentTemplateModalController", INGAApp.ViewAssessmentTemplateModalController);
    myApp.addController("EditAssessmentTemplateModalController", INGAApp.EditAssessmentTemplateModalController);
    myApp.addController("NewAssessmentTemplateModalController", INGAApp.NewAssessmentTemplateModalController);
    myApp.addController("NewAssessmentTemplateItemModalController", INGAApp.NewAssessmentTemplateItemModalController);
    myApp.addController("DataEntryAssessmentListController", INGAApp.DataEntryAssessmentListController);
    myApp.addController("DataEntryScoreViewController", INGAApp.DataEntryScoreViewController);
    myApp.addController("AddStudentModalController", INGAApp.AddStudentModalController);
    myApp.addController("ConfirmationModalController", INGAApp.ConfirmationModalController);
    myApp.addService("mainService", INGAApp.MainService);
    myApp.addService("assessmentService", INGAApp.AssessmentService);
    myApp.addService("dataEntryService", INGAApp.DataEntryService);
    myApp.addService("filterService", INGAApp.FilterService);
    myApp.addService("notificationService", INGAApp.NotificationService);
    myApp.addRoute("/assessments/assign", "partials/assessmentAssignment.html", "AssessmentAssignmentController");
    myApp.addRoute("/assessments", "partials/assessments.html", "AssessmentsController");
    myApp.addRoute("/dataEntry/score", "partials/score_view.html", "DataEntryScoreViewController");
    myApp.addRoute("/dataEntry", "partials/data_entry.html", "DataEntryAssessmentListController");
    myApp.app.config(function ($animateProvider) {
        $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
    });
    myApp.app.config(["cfpLoadingBarProvider", function (cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
            cfpLoadingBarProvider.parentSelector = "#inga";
        }]);
    myApp.app.directive("noclick", [function () {
            return {
                restrict: "A",
                link: function link(scope, element, attrs) {
                    element.bind("click", function (e) {
                        e.stopPropagation();
                    });
                }
            };
        }])
        .directive("uiTreeSelect", [
        "groupFactory", "mainService",
        "$timeout",
        function (groupFactory, mainService, $timeout) {
            return {
                restrict: "E",
                scope: { model: "=" },
                link: function (scope, el) {
                    scope.breadcrumbs = [{ Key: 0, Title: "All" }];
                    scope.groups = [];
                    // var test = myApp;
                    mainService.getCalendarOptions(0).then(function (res) {
                        scope.groups = res;
                    });
                    scope.loadChildGroupsOf = function (group, $select) {
                        $select.search = "";
                        scope.breadcrumbs.push(group);
                        scope.groups = [];
                        // scope.groups = groupFactory.load(group.id);
                        mainService.getCalendarOptions(group.Key).then(function (res) {
                            scope.groups = res;
                            scope.$broadcast("uiSelectFocus");
                        });
                    };
                    scope.navigateBackTo = function (crumb, $select) {
                        $select.search = "";
                        var index = _.findIndex(scope.breadcrumbs, { Key: crumb.Key });
                        scope.breadcrumbs.splice(index + 1, scope.breadcrumbs.length);
                        scope.groups = [];
                        mainService.getCalendarOptions(_.last(scope.breadcrumbs).Key).then(function (res) {
                            scope.groups = res;
                            $select.open = false;
                            $select.selected = {};
                            scope.$broadcast("uiSelectFocus");
                        });
                    };
                },
                templateUrl: "/ui-tree-select.html"
            };
        }
    ])
        .directive("uiSelectFocuser", function ($timeout) {
        return {
            restrict: "A",
            require: "^uiSelect",
            link: function (scope, elem, attrs, uiSelect) {
                scope.$on("uiSelectFocus", function () {
                    $timeout(uiSelect.activate);
                });
            }
        };
    })
        .factory("groupFactory", [
        function () {
            var data = {
                0: [{ "id": 1, "title": "Dibels", "size": "3", "parent": true }, { "id": 5, "title": "Semesters", "size": "2", "parent": true }],
                1: [{ "id": 2, "title": "Beginning", "size": "", "parent": false },
                    { "id": 3, "title": "Middle", "size": "", "parent": false },
                    { "id": 4, "title": "End", "size": "", "parent": false }],
                5: [{ "id": 31, "title": "Semester 1", "size": "", "parent": false },
                    { "id": 32, "title": "Semester 2", "size": "", "parent": false }]
            };
            return {
                load: function (id) {
                    return data[id];
                }
            };
        }
    ])
        .run(["$templateCache", function ($templateCache) {
            // Overrides selectize template for group select tree.
            $templateCache.put("selectize/choices.tpl.html", [
                "<div ng-show='$select.open'",
                "  class='ui-select-choices group-tree selectize-dropdown single'>",
                "  <div ng-show='breadcrumbs.length > 1' class='ui-select-breadcrumbs'>",
                "    <span class='ui-breadcrumb' ng-repeat='crumb in breadcrumbs'",
                "       ng-click='navigateBackTo(crumb, $select)'>",
                "       {{crumb.Title}}",
                "    </span>",
                "  </div>",
                "  <div class='ui-select-choices-content selectize-dropdown-content'>",
                "    <div class='ui-select-choices-group optgroup'>",
                "      <div ng-show='$select.isGrouped'",
                "        class='ui-select-choices-group-label optgroup-header'>",
                "        {{$group}}",
                "      </div>",
                "      <div class='ui-select-choices-row'>",
                "        <div class='option ui-select-choices-row-inner'",
                "           data-selectable=''>",
                "        </div>",
                "      </div>",
                "    </div>",
                "  </div>",
                "</div>"
            ].join(""));
        }]);
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=app.js.map