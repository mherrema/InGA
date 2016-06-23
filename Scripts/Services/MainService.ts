namespace INGAApp {
  export class MainService extends INGA.Service
  {
    static $inject = ['$http', '$q'];

    pageTitle: string;
    pageTypeTitle: string;
    inAssessmentManagement: boolean;
    inScoreEntry: boolean;
    inAssessmentAssignment: boolean;
    $http: ng.IHttpService;
    $q: ng.IQService;
    calendarOptions: Array<Calendar>;
    gradeOptions: Array<GradeLevel>;
    schoolYearOptions: Array<SchoolYear>;
    subjectOptions: Array<Subject>;
    standardTypeOptions: Array<StandardType>;
    assessmentTemplateOptions: Array<AssessmentTemplate>;
    districtOptions: Array<District>;
    standardOptions: Array<Standard>;
    apiRoot: string;

    constructor($http: ng.IHttpService, $q: ng.IQService) {
      super();
      this.$http = $http;
      this.$q = $q;
      // this.apiRoot = "http://win-iq115hn5k0f:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
      this.apiRoot = "http://172.21.255.63:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
    }

    setPageTitles(pageTitle: string, pageTypeTitle: string): void {
      this.pageTitle = pageTitle;
      this.pageTypeTitle = pageTypeTitle;

      if (pageTitle.toLowerCase() === "assessment management") {
        this.inAssessmentManagement = true;
      }
      else {
        this.inAssessmentManagement = false;
      }

      if (pageTypeTitle.toLowerCase() === "assessment class score view") {
        this.inScoreEntry = true;
      }
      else {
        this.inScoreEntry = false;
      }

      if (pageTypeTitle.toLowerCase() === "assessment assignment") {
        this.inAssessmentAssignment = true;
      }
      else {
        this.inAssessmentAssignment = false;
      }
    }

    // getCalendarOptions(): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
    //   var self:MainService = this;
    //   var promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> = this.$http.get(this.apiRoot + 'Options/Calendar/')
    //   .then(function(response){
    //     self.calendarOptions = <Array<Calendar>>response.data;
    //     return response.data;
    //   });
    //
    //   return promise;
    // }

    getCalendarOptions(id): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      let self: MainService = this;
      if (!this.calendarOptions) {
        var promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> = this.$http.get(this.apiRoot + "Options/Calendar/")
        .then(function(response){
          self.calendarOptions = <Array<Calendar>>response.data;
          return response.data[id];
        });
      }
      else {
        var deferred = this.$q.defer();

      deferred.resolve(self.calendarOptions[id]);
      var promise = <ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>>deferred.promise;
      }

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

    getStandardOptions(searchString: string): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      var self:MainService = this;
      var promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> = this.$http.get(this.apiRoot + 'Options/Standard/?SearchString=' + searchString)
      .then(function(response){
        self.standardOptions = <Array<Standard>>response.data;
        return response.data;
      });

      return promise;
    }

    getItemTypeOptions(): Array<ItemType>{
      return [{ItemTypeKey: 1, TypeName: "Multiple Choice"},{ItemTypeKey: 2, TypeName: "Constructed Response"}];
    }
  }
}
