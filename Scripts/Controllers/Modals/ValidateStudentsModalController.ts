namespace INGAApp {

  interface IValidateStudentsModalScope extends BaseController.IScope {
    assessment: DistrictAssessment;
    ok: Function;
    cancel: Function;
    openNewAssessmentModal: Function;
    newAssessmentItem: Item;
    itemTypeOptions: Array<ItemType>;
    validationPackage: StudentValidationPackage;
    init: Function;
  }


  export class ValidateStudentsModalController extends BaseController.Controller {
    scope: IValidateStudentsModalScope;
    static $inject = ["$scope", "$uibModalInstance", "$uibModal", "mainService", "notificationService", "classroomAssessmentKey", "dataEntryService", "markingPeriodKey"];

    constructor( $scope: IValidateStudentsModalScope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
      $uibModal: ng.ui.bootstrap.IModalService, mainService: MainService, notificationService: NotificationService, classroomAssessmentKey: number,
    dataEntryService: DataEntryService, markingPeriodKey: number) {
      super( $scope );
      let controller = this;

      // $scope.assessment = assessment;
      $scope.newAssessmentItem = {};
      $scope.newAssessmentItem.PointsMin = 0;
      $scope.newAssessmentItem.PointsMax = 10;
      $scope.newAssessmentItem.PointsStep = 1.0;
      $scope.newAssessmentItem.ItemType = {ItemTypeKey: 1, TypeName: "Multiple Choice"};

      $scope.itemTypeOptions = mainService.getItemTypeOptions();

      $scope.init = function(){
        dataEntryService.validateStudents(classroomAssessmentKey, markingPeriodKey).then(function(res: StudentValidationPackage){
          $scope.validationPackage = res;
          console.log(res);
        });
      };

      $scope.ok = function () {
        let totalCount = $scope.validationPackage.StudentsToAdd.length + $scope.validationPackage.StudentsToRemove.length;
        let currentCount = 0;
        let allSuccesses = true;
        angular.forEach($scope.validationPackage.StudentsToAdd, function(student){
          dataEntryService.addStudent(student.DistrictStudentKey, classroomAssessmentKey, markingPeriodKey).then(function(res: ReturnPackage){
            if (!res.Success) {
              allSuccesses = false;
            }
            currentCount++;
            if (currentCount === totalCount) {
              if (allSuccesses) {
                notificationService.showNotification("Success syncing students", "success");
                $uibModalInstance.close(true);
              }
              else {
                notificationService.showNotification("Error syncing students", "error");
                $uibModalInstance.close(false);
              }
            }
          });
        });

        angular.forEach($scope.validationPackage.StudentsToRemove, function(student){
          dataEntryService.removeStudent(student.DistrictStudentKey, classroomAssessmentKey, markingPeriodKey).then(function(res: ReturnPackage){
            if (!res.Success) {
              allSuccesses = false;
            }
            currentCount++;
            if (currentCount === totalCount) {
              if (allSuccesses) {
                notificationService.showNotification("Success syncing students", "success");
                $uibModalInstance.close(true);
              }
              else {
                notificationService.showNotification("Error syncing students", "error");
                $uibModalInstance.close(false);
              }
            }
          });
        });
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss("cancel");
      };

    }


  }
}
