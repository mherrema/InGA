module INGAApp
{

  export interface IMainScope extends BaseController.IScope
  {
    init: Function,
    test: string,
    pageTypeTitle: string,
    pageTitle: string,
    openNewAssessmentModal: Function,
    items: Array<string>,
    openNewMasterTemplateModal: Function,
    inAssessmentManagement: boolean,
    inAssessmentAssignment: boolean,
    inScoreEntry: boolean,
    goToDataEntry: Function,
    subjectOptions: Array<Subject>,
    assessmentOptions: Array<DistrictAssessment>,
    currentNotification: Notification,
    assessmentToAssign: DistrictAssessment,
    selectAssessment: Function
  }

  export class MainController extends BaseController.Controller
  {
    scope: IMainScope;
    static $inject = ['$scope', '$location', '$log', '$uibModal', 'mainService', 'assessmentService', 'notificationService'];

    constructor( $scope: IMainScope, $location: ng.ILocationService, $log: ng.ILogService, $uibModal: ng.ui.bootstrap.IModalService, mainService: MainService, assessmentService: AssessmentService, notificationService: NotificationService)
    {
      super( $scope );
      var controller = this;

      $scope.init = function(){
        $scope.currentNotification = {
              NotificationText: "",
              Success: false,
              Error: false,
              Active: false
          }

        $scope.$watch(() => mainService.pageTitle,
        (newValue: string, oldValue: string) => {
          $scope.pageTitle = newValue;
        });

        $scope.$watch(() => mainService.pageTypeTitle,
        (newValue: string, oldValue: string) => {
          $scope.pageTypeTitle = newValue;
        });

        $scope.$watch(() => mainService.inAssessmentManagement,
        (newValue: boolean, oldValue: boolean) => {
          $scope.inAssessmentManagement = newValue;
        });

        $scope.$watch(() => mainService.inScoreEntry,
        (newValue: boolean, oldValue: boolean) => {
          $scope.inScoreEntry = newValue;
        });

        $scope.$watch(() => mainService.inAssessmentAssignment,
        (newValue: boolean, oldValue: boolean) => {
          $scope.inAssessmentAssignment = newValue;
          if(newValue){
            assessmentService.getPublishedDistrictAssessments().then(function(d: Array<DistrictAssessment>){
              $scope.assessmentOptions = d;
              if(assessmentService.currentSelectedDistrictAssessment == undefined){
              $scope.assessmentToAssign = $scope.assessmentOptions[0];
              $scope.selectAssessment();
            }
            });
            $scope.assessmentToAssign = assessmentService.currentSelectedDistrictAssessment;
          }
        });

        $scope.$watch(() => notificationService.currentNotification,
          (newValue: Notification, oldValue: Notification) => {
              $scope.currentNotification = newValue;
          });
      }

      $scope.selectAssessment = function(){
        assessmentService.currentSelectedDistrictAssessment = $scope.assessmentToAssign;
      }

      $scope.openNewAssessmentModal = function (size) {

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'partials/modals/newAssessmentModal.html',
          controller: 'NewAssessmentModalController',
          size: "lg",
          resolve: {
            assessment: function () {
              return {};
            }
          }
        });

        modalInstance.result.then(function (assessmentPackage: AssessmentPackage) {
          console.log(assessmentPackage.Assessment);
          assessmentService.saveAssessment(assessmentPackage).then(function(res: ReturnPackage){
            if(res.Success){
              assessmentPackage.Assessment.DistrictAssessmentKey = res.Key;
              assessmentService.currentDistrictAssessments.push(assessmentPackage.Assessment);
              notificationService.showNotification("Success saving assessment", "success");
              //show success!
              if(assessmentPackage.ShouldPublish){
                console.log("Going to assessment view");
                //go to assessment view
              }
            }
            else{
              notificationService.showNotification("Error saving assessment", "error");
              //show error!
            }
          });

        });
      };

      $scope.openNewMasterTemplateModal = function () {

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'partials/modals/newAssessmentTemplateModal.html',
          controller: 'NewAssessmentTemplateModalController',
          size: "lg",
          resolve: {
            assessment: function () {
              return {};
            }
          }
        });

        modalInstance.result.then(function (assessmentTemplatePackage: AssessmentTemplatePackage) {
          if(assessmentTemplatePackage.ShouldMakeAvailableToUsers){
            assessmentTemplatePackage.AssessmentTemplate.AvailableToUsers = true;
          }
          else{
            assessmentTemplatePackage.AssessmentTemplate.AvailableToUsers = false;
          }
          assessmentService.saveAssessmentTemplate(assessmentTemplatePackage).then(function(res: ReturnPackage){
            if(res.Success){
              assessmentTemplatePackage.AssessmentTemplate.AssessmentTemplateKey = res.Key;

              if(assessmentService.currentAssessmentTemplates.length == 0){
                assessmentService.needToReloadTemplates = true;
              }
              assessmentService.currentAssessmentTemplates.push(assessmentTemplatePackage.AssessmentTemplate);

              notificationService.showNotification("Success saving assessment template", "success");
              //show success!
              if(assessmentTemplatePackage.ShouldMakeAvailableToUsers){
                console.log("Going to assessment template view");
                //go to assessment view
              }
            }
            else{
              notificationService.showNotification("Error saving assessment template", "error");
              //show error!
            }
          });

        });
      };

      $scope.goToDataEntry = function(){
        $location.path("/dataEntry");
      }
    }
  }
}
