///<reference path="../typings/angularjs/angular.d.ts"/>
///<reference path="../typings/angularjs/angular-route.d.ts"/>
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
    var myApp = new INGA.Module('IngaApp', ['ngRoute', 'ngAnimate']);
    myApp.addController('MainINGAController', INGAApp.MainController);
    myApp.addController('AssessmentsController', INGAApp.AssessmentsController);
    // myApp.addService('contextService', ContextService);
    // myApp.addService('navigationService', NavigationService);
    // myApp.addService('activityService', ActivityService);
    // myApp.addService('projectsService', ProjectsService);
    // myApp.addService('projectService', ProjectService);
    // myApp.addFactory('navigationFactory', NavigationFactory);
    myApp.addRoute("/assessments", "partials/assessments.html", "AssessmentsController");
    // myApp.addRoute("/projects", "partials/project-list.html", "projectListController");
    // myApp.addRoute("/projects/:projectId", "partials/project.html", "projectController");
    // myApp.addRoute("/lifestyle", "partials/lifestyle.html", "lifestyleController");
    // myApp.addRoute("/trusts", "partials/trusts.html", "trustsController");
    // myApp.addRoute("/entities", "partials/entities.html", "entitiesController");
    // myApp.addRoute("/financials", "partials/financials.html", "financialsController");
    // myApp.addRoute("/settings", "partials/settings/staff.html", "staffSettingsController");
    // myApp.addRoute("/settings/staff", "partials/settings/staff.html", "staffSettingsController");
    // myApp.addRoute("/settings/clients", "partials/settings/clients.html", "clientsSettingsController");
    // myApp.addRoute("/settings/security", "partials/settings/security.html", "securitySettingsController");
    // myApp.addRoute("/settings/trusts", "partials/settings/trusts.html", "trustsSettingsController");
    // myApp.addRoute("/settings/entities", "partials/settings/entities.html", "entitiesSettingsController");
    // myApp.addRoute("/settings/financials", "partials/settings/financials.html", "financialsSettingsController");
    myApp.app.config(function ($animateProvider) {
        $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
    });
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=app.js.map