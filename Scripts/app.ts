///<reference path="../typings/angularjs/angular.d.ts"/>
///<reference path="../typings/angularjs/angular-route.d.ts"/>
///<reference path="../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts"/>

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
  var myApp = new INGA.Module('IngaApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ui.sortable', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.pinning']);
  myApp.addController('MainINGAController', MainController);
  myApp.addController('AssessmentsController', AssessmentsController);
  myApp.addController('NewAssessmentModalController', NewAssessmentModalController);
  myApp.addController('EditAssessmentModalController', EditAssessmentModalController);
  myApp.addController('ViewAssessmentModalController', ViewAssessmentModalController);
  myApp.addController('AssessmentAssignmentController', AssessmentAssignmentController);
  myApp.addController('NewAssessmentItemModalController', NewAssessmentItemModalController);
  myApp.addController('ViewAssessmentTemplateModalController', ViewAssessmentTemplateModalController);
  myApp.addController('EditAssessmentTemplateModalController', EditAssessmentTemplateModalController);
  myApp.addController('NewAssessmentTemplateModalController', NewAssessmentTemplateModalController);
  myApp.addController('NewAssessmentTemplateItemModalController', NewAssessmentTemplateItemModalController);
  myApp.addController('DataEntryAssessmentListController', DataEntryAssessmentListController);
  myApp.addController('DataEntryScoreViewController', DataEntryScoreViewController);
  myApp.addController('AddStudentModalController', AddStudentModalController);
  myApp.addController('ConfirmationModalController', ConfirmationModalController);

  myApp.addService('mainService', MainService);
  myApp.addService('assessmentService', AssessmentService);
  myApp.addService('dataEntryService', DataEntryService);
  myApp.addService('filterService', FilterService);
  myApp.addService('notificationService', NotificationService);
  myApp.addRoute("/assessments/assign", "partials/assessmentAssignment.html", "AssessmentAssignmentController");
  myApp.addRoute("/assessments", "partials/assessments.html", "AssessmentsController");
  myApp.addRoute("/dataEntry/score", "partials/score_view.html", "DataEntryScoreViewController");
  myApp.addRoute("/dataEntry", "partials/data_entry.html", "DataEntryAssessmentListController");
  myApp.app.config(function($animateProvider) {
    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
  });
  myApp.app.directive('noclick', [function() {
    return {
      restrict: 'A',
      link: function link(scope, element, attrs) {
        element.bind('click', function(e) {
            e.stopPropagation();
        });
      }
    }
}]);
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
