var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var ConfirmationModalController = (function (_super) {
        __extends(ConfirmationModalController, _super);
        function ConfirmationModalController($scope, $uibModalInstance, confirmationPackage) {
            _super.call(this, $scope);
            var controller = this;
            $scope.confirmationPackage = confirmationPackage;
            $scope.ok = function () { $uibModalInstance.close(true); };
            $scope.cancel = function () { $uibModalInstance.dismiss("cancel"); };
        }
        ConfirmationModalController.$inject = ["$scope", "$uibModalInstance",
            "confirmationPackage"];
        return ConfirmationModalController;
    }(BaseController.Controller));
    INGAApp.ConfirmationModalController = ConfirmationModalController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=ConfirmationModalController.js.map