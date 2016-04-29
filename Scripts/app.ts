///<reference path="../typings/angularjs/angular.d.ts"/>
///<reference path="../typings/angularjs/angular-route.d.ts"/>

module INGA {
  export class Module {
    app: ng.IModule;

    constructor(name: string, modules: Array<string>) {
      this.app = angular.module(name, modules);
      this.app.config(function ($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/assessments' });
      })
    }

    addController(name: string, controller: Function) {
      this.app.controller(name, controller);
    }

    addService(name: string, service: Function): void {
      this.app.service(name, service);
    }

    addFactory(name: string, factory: Function): void {
      this.app.factory(name, factory);
    }

    addRoute(url: string, htmlPath: string, controller: string): void {
      this.app.config(function ($routeProvider, $animateProvider) {
        $routeProvider.when(url, {
          templateUrl: htmlPath,
          controller: controller
        });
      });
    }
  }
}

module INGAApp {
  var myApp = new INGA.Module('IngaApp', ['ngRoute', 'ngAnimate']);
  myApp.addController('MainINGAController', MainController);
  myApp.addController('AssessmentsController', AssessmentsController);

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
  myApp.app.config(function($animateProvider) {
    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
  });
  // declare var FastClick: CoalesceHelpers.FastClickStatic;
  // myApp.app.run(function () {
  //   FastClick.attach(document.body);
  // });
  // myApp.app.directive(
  //   "bnDocumentClick",
  //   function ($document, $parse) {
  //     // I connect the Angular context to the DOM events.
  //     var linkFunction = function ($scope, $element, $attributes) {
  //       // Get the expression we want to evaluate on the
  //       // scope when the document is clicked.
  //       var scopeExpression = $attributes.bnDocumentClick;
  //       // Compile the scope expression so that we can
  //       // explicitly invoke it with a map of local
  //       // variables. We need this to pass-through the
  //       // click event.
  //       //
  //       // NOTE: I ** think ** this is similar to
  //       // JavaScript's apply() method, except using a
  //       // set of named variables instead of an array.
  //       var invoker = $parse(scopeExpression);
  //       // Bind to the document click event.
  //       $document.on(
  //         "click",
  //         function (event) {
  //           // When the click event is fired, we need
  //           // to invoke the AngularJS context again.
  //           // As such, let's use the $apply() to make
  //           // sure the $digest() method is called
  //           // behind the scenes.
  //           $scope.$apply(
  //             function () {
  //               // Invoke the handler on the scope,
  //               // mapping the jQuery event to the
  //               // $event object.
  //               invoker(
  //                 $scope,
  //                 {
  //                   $event: event
  //                 }
  //               );
  //             }
  //           );
  //         }
  //       );
  //       // TODO: Listen for "$destroy" event to remove
  //       // the event binding when the parent controller
  //       // is removed from the rendered document.
  //     };
  //     // Return the linking function.
  //     return (linkFunction);
  //   }
  // );
}
