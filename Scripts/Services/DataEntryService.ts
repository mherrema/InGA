namespace INGAApp {
  export class DataEntryService extends INGA.Service {
    static $inject = ["$http"];

    currentAssessment: ClassroomAssessment;
    promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>;
    $http: ng.IHttpService;
    apiRoot: string;
    shouldSaveAndExit: boolean;

    constructor($http: ng.IHttpService) {
      super();
      this.$http = $http;
      this.apiRoot = "http://win-iq115hn5k0f:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
      // this.apiRoot = "http://172.21.255.64:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
      this.shouldSaveAndExit = false;
    }

    getStudents(classroomKey, markingPeriodKey): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      // console.log("Getting Classroom Assessments From Service");
      if (markingPeriodKey !== -1) {
      this.promise = this.$http.get(this.apiRoot + "Student/Classroom/" + classroomKey + "/" + markingPeriodKey + "/")
      .then(function(response){
        // if(filterString == ""){
        //   this.nonFilteredDistrictAssessments = response.data;
        // }
        return response.data;
      });
    }
    else {
      this.promise = this.$http.get(this.apiRoot + "Student/Classroom/" + classroomKey + "/" )
      .then(function(response){
        // if(filterString == ""){
        //   this.nonFilteredDistrictAssessments = response.data;
        // }
        return response.data;
      });
    }

      return this.promise;
    }

    getItems(districtAssessmentKey): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      this.promise = this.$http.get(this.apiRoot + "DistrictAssessment/Item/" + districtAssessmentKey + "/")
      .then(function(response){
        return response.data;
      });

      return this.promise;
    }

    saveScore(itemKey, score, studentAssessmentKey): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      console.log({ItemKey: itemKey, Score: score, StudentAssessmentKey: studentAssessmentKey});
      this.promise = this.$http.post(this.apiRoot + "StudentAssessment/Score/", {ItemKey: itemKey, Score: score, StudentAssessmentKey: studentAssessmentKey} )
      .then(function(response){
        return response.data;
      });

      return this.promise;
    }

    validateStudents(assessmentKey: number, markingPeriodKey: number): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      this.promise = this.$http.get(this.apiRoot + "ClassroomAssessment/Validate/" + assessmentKey + "/" + markingPeriodKey + "/")
      .then(function(response){
        return response.data;
      });

      return this.promise;
    }

    addStudent(districtStudentKey: number, classroomAssessmentKey: number): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      this.promise = this.$http.post(this.apiRoot + "ClassroomAssessment/Student/", {DistrictStudentKey: districtStudentKey, ClassroomAssessmentKey: classroomAssessmentKey})
      .then(function(response){
        return response.data;
      });

      return this.promise;
    }

  }
}
