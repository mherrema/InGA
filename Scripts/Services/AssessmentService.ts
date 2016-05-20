module INGAApp {
  export class AssessmentService extends INGA.Service
  {
    static $inject = ['$http', '$q'];

    currentDistrictAssessments: Array<DistrictAssessment>;
    nonFilteredDistrictAssessments: Array<DistrictAssessment>;
    currentClassroomAssessments: Array<ClassroomAssessment>;
    promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>;
    $http: ng.IHttpService;
    apiRoot: string;
    $q: ng.IQService;
    assessmentSearchCanceler :ng.IDeferred<ng.IHttpPromiseCallbackArg<{}>>;
    currentSelectedDistrictAssessment: DistrictAssessment;

    constructor($http: ng.IHttpService, $q: ng.IQService) {
      super();

      this.$http = $http;
      this.$q = $q;
      // this.apiRoot = "http://win-iq115hn5k0f:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
      this.apiRoot = "http://172.21.255.55:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
      this.assessmentSearchCanceler = $q.defer();
      this.currentDistrictAssessments = [];
    }

    getDistrictAssessments(): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      console.log("Getting Assessments From Service");
      var filterString = "";

      var self = this;
      this.promise = this.$http.get(this.apiRoot + 'DistrictAssessment/' + filterString,
      {timeout : this.assessmentSearchCanceler.promise})
      .then(function(response){
        if(filterString == ""){
          this.nonFilteredDistrictAssessments = response.data;
        }
        self.currentDistrictAssessments = <Array<DistrictAssessment>>response.data;
        return response.data;
      });

      return this.promise;
    }

    saveAssessment(assessmentPackage: AssessmentPackage): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      console.log("Saving Assessment In Service");
      assessmentPackage.Assessment.GradeLevelKey = assessmentPackage.Assessment.GradeLevel.GradeLevelKey;
      assessmentPackage.Assessment.StandardTypeKey = assessmentPackage.Assessment.StandardType.StandardTypeKey;
      assessmentPackage.Assessment.CalendarKey = assessmentPackage.Assessment.Calendar.CalendarKey;
      assessmentPackage.Assessment.SubjectKey = assessmentPackage.Assessment.Subject.SubjectKey;
      assessmentPackage.Assessment.SchoolYearKey = assessmentPackage.Assessment.SchoolYear.SchoolYearKey;
      if(assessmentPackage.ShouldPublish){
        assessmentPackage.Assessment.IsPublished = true;
        console.log("Published Assessment");
      }
      this.promise = this.$http.post(this.apiRoot + 'DistrictAssessment/',
      assessmentPackage.Assessment)
      .then(function(response){
          return true;
      })
      .catch(function(){
        return false;
      });

      return this.promise;
    }


    getClassroomAssessments(): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      console.log("Getting Classroom Assessments From Service");
      var filterString = "";
      this.promise = this.$http.get(this.apiRoot + 'ClassroomAssessment/' + filterString,
      {timeout : this.assessmentSearchCanceler.promise})
      .then(function(response){
        if(filterString == ""){
          this.nonFilteredDistrictAssessments = response.data;
        }
        return response.data;
      });

      return this.promise;
    }

  }
}
