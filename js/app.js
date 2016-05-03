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
    var myApp = new INGA.Module('IngaApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);
    myApp.addController('MainINGAController', INGAApp.MainController);
    myApp.addController('AssessmentsController', INGAApp.AssessmentsController);
    myApp.addController('NewAssessmentController', INGAApp.NewAssessmentController);
    myApp.addController('AssessmentViewController', INGAApp.AssessmentViewController);
    myApp.addController('NewAssessmentItemController', INGAApp.NewAssessmentItemController);
    myApp.addService('mainService', INGAApp.MainService);
    myApp.addRoute("/assessments", "partials/assessments.html", "AssessmentsController");
    myApp.app.config(function ($animateProvider) {
        $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
    });
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=app.js.map