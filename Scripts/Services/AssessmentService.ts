module INGAApp {
  export class AssessmentService extends INGA.Service
  {
    static $inject = ['$http', '$q', 'mainService'];

    currentDistrictAssessments: Array<DistrictAssessment>;
    currentAssessmentTemplates: Array<AssessmentTemplate>;
    nonFilteredDistrictAssessments: Array<DistrictAssessment>;
    currentClassroomAssessments: Array<ClassroomAssessment>;
    promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>;
    $http: ng.IHttpService;
    apiRoot: string;
    $q: ng.IQService;
    mainService: MainService;
    assessmentSearchCanceler :ng.IDeferred<ng.IHttpPromiseCallbackArg<{}>>;
    currentSelectedDistrictAssessment: DistrictAssessment;
    currentSelectedAssessmentTemplate: AssessmentTemplate;

    constructor($http: ng.IHttpService, $q: ng.IQService, mainService: MainService) {
      super();

      this.$http = $http;
      this.$q = $q;
      this.mainService = mainService;
      // this.apiRoot = "http://win-iq115hn5k0f:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
      this.apiRoot = "http://172.21.255.57:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
      this.assessmentSearchCanceler = $q.defer();
      this.currentDistrictAssessments = [];
      this.currentAssessmentTemplates = [];
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
          return response.data;
      })
      .catch(function(response){
        return response.data;
      });

      return this.promise;
    }

    updateAssessment(assessmentPackage: AssessmentPackage): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      console.log("Updating Assessment In Service");
      assessmentPackage.Assessment.GradeLevelKey = assessmentPackage.Assessment.GradeLevel.GradeLevelKey;
      assessmentPackage.Assessment.StandardTypeKey = assessmentPackage.Assessment.StandardType.StandardTypeKey;
      assessmentPackage.Assessment.CalendarKey = assessmentPackage.Assessment.Calendar.CalendarKey;
      assessmentPackage.Assessment.SubjectKey = assessmentPackage.Assessment.Subject.SubjectKey;
      assessmentPackage.Assessment.SchoolYearKey = assessmentPackage.Assessment.SchoolYear.SchoolYearKey;
      if(assessmentPackage.ShouldPublish){
        assessmentPackage.Assessment.IsPublished = true;
        console.log("Published Assessment");
      }
      assessmentPackage.Assessment.DateCreated = null;
      this.promise = this.$http.put(this.apiRoot + 'DistrictAssessment/',
      assessmentPackage.Assessment)
      .then(function(response){
          return true;
      })
      .catch(function(){
        return false;
      });

      return this.promise;
    }

    deleteAssessment(assessmentKey: number): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      console.log("Deleting assessment");
      this.promise = this.$http.delete(this.apiRoot + 'DistrictAssessment/' + assessmentKey + "/")
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



    getAssessmentTemplates(): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      console.log("Getting Assessments From Service");
      var filterString = "";

      var self = this;
      this.promise = this.$http.get(this.apiRoot + 'AssessmentTemplate/' + filterString,
      {timeout : this.assessmentSearchCanceler.promise})
      .then(function(response){
        // if(filterString == ""){
        //   this.nonFilteredDistrictAssessments = response.data;
        // }

        self.currentAssessmentTemplates = <Array<AssessmentTemplate>>response.data;
        return response.data;
      });

      return this.promise;
    }

    saveAssessmentTemplate(assessmentPackage: AssessmentTemplatePackage): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      console.log("Saving Assessment Template In Service");
      assessmentPackage.AssessmentTemplate.GradeLevelKey = assessmentPackage.AssessmentTemplate.GradeLevel.GradeLevelKey;
      assessmentPackage.AssessmentTemplate.StandardTypeKey = assessmentPackage.AssessmentTemplate.StandardType.StandardTypeKey;
      assessmentPackage.AssessmentTemplate.CalendarKey = assessmentPackage.AssessmentTemplate.Calendar.CalendarKey;
      assessmentPackage.AssessmentTemplate.SubjectKey = assessmentPackage.AssessmentTemplate.Subject.SubjectKey;
      assessmentPackage.AssessmentTemplate.DistrictKey = assessmentPackage.AssessmentTemplate.District.DistrictKey;
      var self = this;
      this.promise = this.$http.post(this.apiRoot + 'AssessmentTemplate/',
      assessmentPackage.AssessmentTemplate)
      .then(function(response){
        self.mainService.assessmentTemplateOptions = new Array<AssessmentTemplate>();
          return response.data;
      })
      .catch(function(response){
        return response.data;
      });

      return this.promise;
    }

    updateAssessmentTemplate(assessmentTemplatePackage: AssessmentTemplatePackage): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      console.log("Updating Assessment In Service");
      // assessmentPackage.Assessment.GradeLevelKey = assessmentPackage.Assessment.GradeLevel.GradeLevelKey;
      // assessmentPackage.Assessment.StandardTypeKey = assessmentPackage.Assessment.StandardType.StandardTypeKey;
      // assessmentPackage.Assessment.CalendarKey = assessmentPackage.Assessment.Calendar.CalendarKey;
      // assessmentPackage.Assessment.SubjectKey = assessmentPackage.Assessment.Subject.SubjectKey;
      // assessmentPackage.Assessment.SchoolYearKey = assessmentPackage.Assessment.SchoolYear.SchoolYearKey;
      if(assessmentTemplatePackage.ShouldMakeAvailableToUsers){
        assessmentTemplatePackage.AssessmentTemplate.AvailableToUsers = true;
      }
      // assessmentPackage.Assessment.DateCreated = null;
      var self = this;
      this.promise = this.$http.put(this.apiRoot + 'AssessmentTemplate/',
      assessmentTemplatePackage.AssessmentTemplate)
      .then(function(response){
        self.mainService.assessmentTemplateOptions = new Array<AssessmentTemplate>();
          return true;
      })
      .catch(function(){
        return false;
      });

      return this.promise;
    }

    deleteAssessmentTemplate(assessmentTemplateKey: number): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      console.log("Deleting assessment template");
      this.promise = this.$http.delete(this.apiRoot + 'AssessmentTemplate/' + assessmentTemplateKey + "/")
      .then(function(response){
          return true;
      })
      .catch(function(){
        return false;
      });

      return this.promise;
    }

    makeAssessmentTemplateAvailable(key:number): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      var self = this;
      this.promise = this.$http.put(this.apiRoot + 'AssessmentTemplate/MakeAvailable/' + key + '/', {})
      .then(function(response){
          self.mainService.assessmentTemplateOptions = new Array<AssessmentTemplate>();
          return true;
      })
      .catch(function(){
        return false;
      });

      return this.promise;
    }

  }
}
