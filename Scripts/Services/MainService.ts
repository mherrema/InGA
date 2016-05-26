module INGAApp {
  export class MainService extends INGA.Service
  {
    static $inject = ['$http'];

    pageTitle: string;
    pageTypeTitle: string;
    inAssessmentManagement: boolean;
    inScoreEntry: boolean;
    inAssessmentAssignment: boolean;
    $http: ng.IHttpService;
    calendarOptions: Array<Calendar>;
    gradeOptions: Array<GradeLevel>;
    schoolYearOptions: Array<SchoolYear>;
    subjectOptions: Array<Subject>;
    standardTypeOptions: Array<StandardType>;
    assessmentTemplateOptions: Array<AssessmentTemplate>;
    districtOptions: Array<District>;
    apiRoot: string;

    constructor($http: ng.IHttpService) {
      super();
      this.$http = $http;
      // this.apiRoot = "http://win-iq115hn5k0f:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
      this.apiRoot = "http://172.21.255.57:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
    }

    setPageTitles(pageTitle: string, pageTypeTitle: string): void{
      this.pageTitle = pageTitle;
      this.pageTypeTitle = pageTypeTitle;

      if(pageTitle.toLowerCase() == "assessment management"){
        this.inAssessmentManagement = true;
      }
      else{
        this.inAssessmentManagement = false;
      }

      if(pageTypeTitle.toLowerCase() == "assessment class score view"){
        this.inScoreEntry = true;
      }
      else{
        this.inScoreEntry = false;
      }

      if(pageTypeTitle.toLowerCase() == "assessment assignment"){
        this.inAssessmentAssignment = true;
      }
      else{
        this.inAssessmentAssignment = false;
      }
    }

    getCalendarOptions(): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      var self:MainService = this;
      var promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> = this.$http.get(this.apiRoot + 'Options/Calendar/')
      .then(function(response){
        self.calendarOptions = <Array<Calendar>>response.data;
        return response.data;
      });

      return promise;
    }

    getDistrictOptions(): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      var self:MainService = this;
      var promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> = this.$http.get(this.apiRoot + 'Options/District/')
      .then(function(response){
        self.districtOptions = <Array<District>>response.data;
        return response.data;
      });

      return promise;
    }

    getGradeOptions(): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      var self:MainService = this;
      var promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> = this.$http.get(this.apiRoot + 'Options/GradeLevel/')
      .then(function(response){
        self.gradeOptions = <Array<GradeLevel>>response.data;
        return response.data;
      });

      return promise;
    }

    getSubjectOptions(): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      var self:MainService = this;
      var promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> = this.$http.get(this.apiRoot + 'Options/Subject/')
      .then(function(response){
        self.subjectOptions = <Array<Subject>>response.data;
        return response.data;
      });

      return promise;
    }

    getSchoolYearOptions(): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      var self:MainService = this;
      var promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> = this.$http.get(this.apiRoot + 'Options/SchoolYear/')
      .then(function(response){
        self.schoolYearOptions = <Array<SchoolYear>>response.data;
        return response.data;
      });

      return promise;
    }

    getStandardTypeOptions(): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      var self:MainService = this;
      var promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> = this.$http.get(this.apiRoot + 'Options/StandardType/')
      .then(function(response){
        self.standardTypeOptions = <Array<StandardType>>response.data;
        return response.data;
      });

      return promise;
    }

    getAssessmentTemplateOptions(): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      var self:MainService = this;
      var promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> = this.$http.get(this.apiRoot + 'Options/AssessmentTemplate/')
      .then(function(response){
        self.assessmentTemplateOptions = <Array<AssessmentTemplate>>response.data;
        return response.data;
      });

      return promise;
    }

    getItemTypeOptions(): Array<ItemType>{
      return [{ItemTypeKey: 1, TypeName: "Multiple Choice"},{ItemTypeKey: 2, TypeName: "Constructed Response"}];
    }
  }
}
