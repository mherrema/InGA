module INGAApp {
  export class DataEntryService extends INGA.Service
  {
    static $inject = ['$http'];

    currentAssessment: ClassroomAssessment;
    promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>;
    $http: ng.IHttpService;
    apiRoot: string;

    constructor($http: ng.IHttpService) {
      super();
      this.$http = $http;
      this.apiRoot = "http://win-iq115hn5k0f:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
      // this.apiRoot = "http://172.21.255.61:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";

    }

    getStudents(classroomKey): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      //console.log("Getting Classroom Assessments From Service");

      this.promise = this.$http.get(this.apiRoot + 'Student/Classroom/' + classroomKey)
      .then(function(response){
        // if(filterString == ""){
        //   this.nonFilteredDistrictAssessments = response.data;
        // }
        return response.data;
      });

      return this.promise;
    }

    getItems(districtAssessmentKey): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      this.promise = this.$http.get(this.apiRoot + 'DistrictAssessment/Item/' + districtAssessmentKey)
      .then(function(response){
        return response.data;
      });

      return this.promise;
    }

  }
}
