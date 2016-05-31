///<reference path="../typings/angularjs/angular.d.ts"/>
///<reference path="../typings/angularjs/angular-route.d.ts"/>
///<reference path="../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts"/>
var INGA;
(function (INGA) {
    var Module = (function () {
        function Module(name, modules) {
            this.app = angular.module(name, modules);
            this.app.config(function ($routeProvider) {
                $routeProvider.otherwise({ redirectTo: '/assessments' });
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
    var myApp = new INGA.Module('IngaApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ui.sortable', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.pinning', 'angular-loading-bar']);
    myApp.addController('MainINGAController', INGAApp.MainController);
    myApp.addController('AssessmentsController', INGAApp.AssessmentsController);
    myApp.addController('NewAssessmentModalController', INGAApp.NewAssessmentModalController);
    myApp.addController('EditAssessmentModalController', INGAApp.EditAssessmentModalController);
    myApp.addController('ViewAssessmentModalController', INGAApp.ViewAssessmentModalController);
    myApp.addController('AssessmentAssignmentController', INGAApp.AssessmentAssignmentController);
    myApp.addController('NewAssessmentItemModalController', INGAApp.NewAssessmentItemModalController);
    myApp.addController('ViewAssessmentTemplateModalController', INGAApp.ViewAssessmentTemplateModalController);
    myApp.addController('EditAssessmentTemplateModalController', INGAApp.EditAssessmentTemplateModalController);
    myApp.addController('NewAssessmentTemplateModalController', INGAApp.NewAssessmentTemplateModalController);
    myApp.addController('NewAssessmentTemplateItemModalController', INGAApp.NewAssessmentTemplateItemModalController);
    myApp.addController('DataEntryAssessmentListController', INGAApp.DataEntryAssessmentListController);
    myApp.addController('DataEntryScoreViewController', INGAApp.DataEntryScoreViewController);
    myApp.addController('AddStudentModalController', INGAApp.AddStudentModalController);
    myApp.addController('ConfirmationModalController', INGAApp.ConfirmationModalController);
    myApp.addService('mainService', INGAApp.MainService);
    myApp.addService('assessmentService', INGAApp.AssessmentService);
    myApp.addService('dataEntryService', INGAApp.DataEntryService);
    myApp.addService('filterService', INGAApp.FilterService);
    myApp.addService('notificationService', INGAApp.NotificationService);
    myApp.addRoute("/assessments/assign", "partials/assessmentAssignment.html", "AssessmentAssignmentController");
    myApp.addRoute("/assessments", "partials/assessments.html", "AssessmentsController");
    myApp.addRoute("/dataEntry/score", "partials/score_view.html", "DataEntryScoreViewController");
    myApp.addRoute("/dataEntry", "partials/data_entry.html", "DataEntryAssessmentListController");
    myApp.app.config(function ($animateProvider) {
        $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
    });
    myApp.app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
            cfpLoadingBarProvider.parentSelector = '#inga';
        }]);
    myApp.app.directive('noclick', [function () {
            return {
                restrict: 'A',
                link: function link(scope, element, attrs) {
                    element.bind('click', function (e) {
                        e.stopPropagation();
                    });
                }
            };
        }]);
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=app.js.map