var BaseController;
(function (BaseController) {
    var Controller = (function () {
        function Controller($scope) {
            this.scope = $scope;
            this.scope.events = this;
        }
        return Controller;
    }());
    BaseController.Controller = Controller;
})(BaseController || (BaseController = {}));
//# sourceMappingURL=BaseController.js.map