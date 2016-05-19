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
      this.apiRoot = "http://win-iq115hn5k0f:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
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

    saveAssessment(assessmentPackage: AssessmentPackage): boolean{
      console.log("Saving Assessment In Service");
      if(assessmentPackage.ShouldPublish){
        assessmentPackage.Assessment.IsPublished = true;
        console.log("Published Assessment");
      }
      if(!assessmentPackage.ShouldRefresh){
        this.currentDistrictAssessments.push(assessmentPackage.Assessment);
      }
      else{
        console.log("Reloading Assessments");
        //RELOAD ASSESSMENTS
      }
      return true;
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
