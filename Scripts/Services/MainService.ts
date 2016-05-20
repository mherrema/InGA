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
    apiRoot: string;

    constructor($http: ng.IHttpService) {
      super();
      this.$http = $http;
      // this.apiRoot = "http://win-iq115hn5k0f:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
      this.apiRoot = "http://172.21.255.55:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
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

    getTemplateOptions(): Array<AssessmentTemplate>{
      return [{Title: "None", AssessmentTemplateKey: 0, CalendarKey: 0, SubjectKey: 0, StandardTypeKey: 0},
              {Title: "Template 1", AssessmentTemplateKey: 1, Calendar:{CalendarKey: 1, CalendarName: "Calendar 1"}, Subject:{SubjectKey: 1, SubjectName: "Test Subject"}, StandardTypeKey: 1, GradeLevelKey: 1},
              {Title: "Template 2", AssessmentTemplateKey: 2, CalendarKey: 2, SubjectKey: 2, StandardTypeKey: 2, GradeLevelKey: 2}];
    }

    getItemTypeOptions(): Array<ItemType>{
      return [{ItemTypeKey: 1, TypeName: "Multiple Choice"},{ItemTypeKey: 2, TypeName: "Constructed Response"}];
    }
  }
}
