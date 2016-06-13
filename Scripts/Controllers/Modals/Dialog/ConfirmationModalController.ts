module INGAApp
{

  interface IConfirmationModalScope extends BaseController.IScope
  {
    confirmationPackage: ConfirmationPackage,
    ok: Function,
    cancel: Function
  }

  export class ConfirmationModalController extends BaseController.Controller
  {
    scope: IConfirmationModalScope;
    static $inject = ['$scope', '$uibModalInstance', 'confirmationPackage'];

    constructor( $scope: IConfirmationModalScope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, confirmationPackage: ConfirmationPackage)
    {
      super( $scope );
      var controller = this;

      $scope.confirmationPackage = confirmationPackage;

      $scope.ok = function () {
        $uibModalInstance.close(true);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    }
  }
}
