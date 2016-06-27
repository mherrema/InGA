///<reference path="../typings/angularjs/angular.d.ts"/>
///<reference path="../typings/angularjs/angular-route.d.ts"/>
///<reference path="../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts"/>
///<reference path="../typings/ui-grid/ui-grid.d.ts"/>
///<reference path="../typings/lodash/lodash.d.ts"/>

namespace INGA {
  export class Module {
    app: ng.IModule;

    constructor(name: string, modules: Array<string>) {
      this.app = angular.module(name, modules);
      this.app.config(function ($routeProvider) {
        $routeProvider.otherwise({ redirectTo: "/assessments" });
      });
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

namespace INGAApp {
  let myApp = new INGA.Module("IngaApp", ["ngRoute", "ngAnimate", "ngSanitize",  "ui.bootstrap", "ui.select", "ui.sortable", "ui.grid", "ui.grid.edit", "ui.grid.cellNav", "ui.grid.pinning", "ui.grid.validate", "angular-loading-bar"]);
  myApp.addController("MainINGAController", MainController);
  myApp.addController("AssessmentsController", AssessmentsController);
  myApp.addController("NewAssessmentModalController", NewAssessmentModalController);
  myApp.addController("EditAssessmentModalController", EditAssessmentModalController);
  myApp.addController("ViewAssessmentModalController", ViewAssessmentModalController);
  myApp.addController("AssessmentAssignmentController", AssessmentAssignmentController);
  myApp.addController("NewAssessmentItemModalController", NewAssessmentItemModalController);
  myApp.addController("ViewAssessmentTemplateModalController", ViewAssessmentTemplateModalController);
  myApp.addController("EditAssessmentTemplateModalController", EditAssessmentTemplateModalController);
  myApp.addController("NewAssessmentTemplateModalController", NewAssessmentTemplateModalController);
  myApp.addController("NewAssessmentTemplateItemModalController", NewAssessmentTemplateItemModalController);
  myApp.addController("DataEntryAssessmentListController", DataEntryAssessmentListController);
  myApp.addController("DataEntryScoreViewController", DataEntryScoreViewController);
  myApp.addController("ValidateStudentsModalController", ValidateStudentsModalController);
  myApp.addController("ConfirmationModalController", ConfirmationModalController);

  myApp.addService("mainService", MainService);
  myApp.addService("assessmentService", AssessmentService);
  myApp.addService("dataEntryService", DataEntryService);
  myApp.addService("filterService", FilterService);
  myApp.addService("notificationService", NotificationService);
  myApp.addRoute("/assessments/assign", "partials/assessmentAssignment.html", "AssessmentAssignmentController");
  myApp.addRoute("/assessments", "partials/assessments.html", "AssessmentsController");
  myApp.addRoute("/dataEntry/score", "partials/score_view.html", "DataEntryScoreViewController");
  myApp.addRoute("/dataEntry", "partials/data_entry.html", "DataEntryAssessmentListController");
  myApp.app.config(function($animateProvider) {
    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
  });
  myApp.app.config(["cfpLoadingBarProvider", function (cfpLoadingBarProvider) {
                cfpLoadingBarProvider.includeSpinner = false;
                cfpLoadingBarProvider.parentSelector = "#inga";
            }]);
  myApp.app.directive("noclick", [function() {
    return {
      restrict: "A",
      link: function link(scope, element, attrs) {
        element.bind("click", function(e) {
            e.stopPropagation();
        });
      }
    };
}])
.directive("uiTreeSelect", [
  "mainService",
  "$timeout",
  function (mainService: MainService, $timeout) {
    return {
      restrict: "E",
      scope: { model: "=" },
      link: function (scope, el) {
        scope.breadcrumbs  = [{Key: 0, Title: "All"}];
        scope.groups = [];
        // var test = myApp;
        mainService.getCalendarOptions(0).then(function(res){
          scope.groups = res;
        });

        scope.loadChildGroupsOf = function(group, $select) {
          $select.search = "";

          scope.breadcrumbs.push(group);
          scope.groups = [];
          // scope.groups = groupFactory.load(group.id);
          mainService.getCalendarOptions(group.Key).then(function(res){
            scope.groups = res;
            scope.$broadcast("uiSelectFocus");
          });
        };

        scope.navigateBackTo = function (crumb, $select) {
          $select.search = "";
          let index = _.findIndex(scope.breadcrumbs, {Key: crumb.Key});

          scope.breadcrumbs.splice(index + 1, scope.breadcrumbs.length);
          scope.groups = [];
          mainService.getCalendarOptions(_.last(<Array<BreadCrumb>>scope.breadcrumbs).Key).then(function(res){
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

// Couldn"t get on-focus to work, so wrote my own
.directive("uiSelectFocuser", function ($timeout) {
  return {
    restrict: "A",
    require: "^uiSelect",
    link: function (scope, elem, attrs, uiSelect: UISelect) {
      scope.$on("uiSelectFocus", function () {
        $timeout(uiSelect.activate);
      });
    }
  };
})

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
  //       // JavaScript"s apply() method, except using a
  //       // set of named variables instead of an array.
  //       var invoker = $parse(scopeExpression);
  //       // Bind to the document click event.
  //       $document.on(
  //         "click",
  //         function (event) {
  //           // When the click event is fired, we need
  //           // to invoke the AngularJS context again.
  //           // As such, let"s use the $apply() to make
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
