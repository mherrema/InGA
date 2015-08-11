angular.module('app', [])

.controller('MyController', function ($scope, focus) {
        $scope.open = "";
        $scope.heading1 = "";
        $scope.heading2 = "";
        $scope.heading3 = "";
        $scope.heading4 = "";
        $scope.view = "";
        $scope.toggleOpen = function () {
            if ($scope.open == "") {
                $scope.open = "open";
                focus("input1");
            } else {
                $scope.open = "";
            }
        }

        $scope.toggleHeading1 = function () {
            if ($scope.heading1 == "") {
                $scope.heading1 = "open";
                $scope.heading2 = "";
                $scope.heading3 = "";
                $scope.heading4 = "";
            } else {
                $scope.heading1 = "";
            }
        };
        $scope.toggleHeading2 = function () {
            if ($scope.heading2 == "") {
                $scope.heading2 = "open";
                $scope.heading1 = "";
                $scope.heading3 = "";
                $scope.heading4 = "";
            } else {
                $scope.heading2 = "";
            }
        };
        $scope.toggleHeading3 = function () {
            if ($scope.heading3 == "") {
                $scope.heading3 = "open";
                $scope.heading1 = "";
                $scope.heading2 = "";
                $scope.heading4 = "";
            } else {
                $scope.heading3 = "";
            }
        };
        $scope.toggleHeading4 = function () {
            if ($scope.heading4 == "") {
                $scope.heading4 = "open";
                $scope.heading1 = "";
                $scope.heading2 = "";
                $scope.heading3 = "";
            } else {
                $scope.heading4 = "";
            }
        }
        $scope.closeDropdowns = function () {
            $scope.heading1 = "";
            $scope.heading2 = "";
            $scope.heading3 = "";
            $scope.heading4 = "";
        }
        $scope.toggleViewDropdown = function(){
            $scope.view = "open";
        }
    })
    .factory('focus', function ($timeout, $window) {
        return function (id) {
            // timeout makes sure that it is invoked after any other event has been triggered.
            // e.g. click events that need to run before the focus or
            // inputs elements that are in a disabled state but are enabled when those events
            // are triggered.
            $timeout(function () {
                var element = $window.document.getElementById(id);
                if (element)
                    element.focus();
            });
        };
    })
    .directive('eventFocus', function (focus) {
        return function (scope, elem, attr) {
            elem.on(attr.eventFocus, function () {
                focus(attr.eventFocusId);
            });

            // Removes bound events in the element itself
            // when the scope is destroyed
            scope.$on('$destroy', function () {
                elem.off(attr.eventFocus);
            });
        };
    });