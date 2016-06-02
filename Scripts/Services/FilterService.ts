module INGAApp {
  export class FilterService extends INGA.Service
  {
    static $inject = ['$http'];

    currentDistrictAssessmentFilterOptions: Array<HeadingOption>;
    currentClassroomAssessments: Array<ClassroomAssessment>;
    promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>;
    $http: ng.IHttpService;
    apiRoot: string;

    constructor($http: ng.IHttpService) {
      super();

      this.$http = $http;
      // this.apiRoot = "http://win-iq115hn5k0f:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
      this.apiRoot = "http://172.21.255.58:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
    }

    getDistrictAssessmentFilterOptions(): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      console.log("Getting Assessments From Service");
      var filterString = "";

        this.promise = this.$http.get(this.apiRoot + 'Filters/DistrictAssessment/')
        .then(function(response){
          return response.data;
        });

        return this.promise;
    }

    getDataEntryFilterOptions(): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      var filterString = "";

        this.promise = this.$http.get(this.apiRoot + 'Filters/DataEntry/')
        .then(function(response){
          return response.data;
        });

        return this.promise;
    }

    getClassroomFilterOptions(): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      var filterString = "";

        this.promise = this.$http.get(this.apiRoot + 'Filters/Classroom/')
        .then(function(response){
          return response.data;
        });

        return this.promise;
    }

  }
}
