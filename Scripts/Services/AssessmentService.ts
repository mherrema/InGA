namespace INGAApp {
  export class AssessmentService extends INGA.Service {
    static $inject = ["$http", "$q", "mainService"];

    currentDistrictAssessments: Array<DistrictAssessment>;
    currentAssessmentTemplates: Array<AssessmentTemplate>;
    currentPublishedDistrictAssessments: Array<DistrictAssessment>;
    nonFilteredDistrictAssessments: Array<DistrictAssessment>;
    currentClassroomAssessments: Array<ClassroomAssessment>;
    promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>;
    $http: ng.IHttpService;
    apiRoot: string;
    $q: ng.IQService;
    mainService: MainService;
    assessmentSearchCanceler: ng.IDeferred<ng.IHttpPromiseCallbackArg<{}>>;
    classroomSearchCanceler: ng.IDeferred<ng.IHttpPromiseCallbackArg<{}>>;
    currentSelectedDistrictAssessment: DistrictAssessment;
    currentSelectedAssessmentTemplate: AssessmentTemplate;
    needToReloadTemplates: boolean;

    constructor($http: ng.IHttpService, $q: ng.IQService, mainService: MainService) {
      super();

      this.$http = $http;
      this.$q = $q;
      this.mainService = mainService;
      this.apiRoot = "http://win-iq115hn5k0f:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
      // this.apiRoot = "http://172.21.255.64:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
      this.assessmentSearchCanceler = $q.defer();
      this.classroomSearchCanceler = $q.defer();
      this.currentDistrictAssessments = [];
      this.currentAssessmentTemplates = [];
      this.needToReloadTemplates = true;
    }

    getDistrictAssessments(filterString): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      this.assessmentSearchCanceler.resolve();
      this.assessmentSearchCanceler = this.$q.defer();
      let self = this;
      this.promise = this.$http.get(this.apiRoot + "DistrictAssessment/" + filterString,
      {timeout : this.assessmentSearchCanceler.promise})
      .then(function(response){
        if (filterString === "") {
          this.nonFilteredDistrictAssessments = response.data;
        }
        angular.forEach(response.data, function(assessment){
          if (assessment.IsArchived) {
            assessment.Status = "Archived";
          }
          else if (assessment.IsPublished) {
            assessment.Status = "Published";
          }
        });
        self.currentDistrictAssessments = <Array<DistrictAssessment>>response.data;
        return response.data;
      });

      return this.promise;
    }

    saveAssessment(assessmentPackage: AssessmentPackage): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      console.log("Saving Assessment In Service");
      if (assessmentPackage.Assessment.AssessmentTemplate != null) {
      assessmentPackage.Assessment.AssessmentTemplateKey = assessmentPackage.Assessment.AssessmentTemplate.AssessmentTemplateKey;
    }
      assessmentPackage.Assessment.GradeLevelKey = assessmentPackage.Assessment.GradeLevel.GradeLevelKey;
      assessmentPackage.Assessment.StandardTypeKey = assessmentPackage.Assessment.StandardType.StandardTypeKey;
      assessmentPackage.Assessment.SubjectKey = assessmentPackage.Assessment.Subject.SubjectKey;
      assessmentPackage.Assessment.SchoolYearKey = assessmentPackage.Assessment.SchoolYear.SchoolYearKey;
      assessmentPackage.Assessment.CalendarKey = assessmentPackage.Assessment.SelectedCalendar.$selected.CalendarKey;
      assessmentPackage.Assessment.MarkingPeriodKey = assessmentPackage.Assessment.SelectedCalendar.$selected.MarkingPeriodKey;
      if (assessmentPackage.ShouldPublish) {
        assessmentPackage.Assessment.IsPublished = true;
        console.log("Published Assessment");
      }
      this.promise = this.$http.post(this.apiRoot + "DistrictAssessment/",
      assessmentPackage.Assessment)
      .then(function(response){
          return response.data;
      })
      .catch(function(response){
        return response.data;
      });

      return this.promise;
    }

    updateAssessment(assessmentPackage: AssessmentPackage): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      console.log("Updating Assessment In Service");
      assessmentPackage.Assessment.GradeLevelKey = assessmentPackage.Assessment.GradeLevel.GradeLevelKey;
      assessmentPackage.Assessment.StandardTypeKey = assessmentPackage.Assessment.StandardType.StandardTypeKey;
      if (assessmentPackage.Assessment.SelectedCalendar !== undefined) {
        if (assessmentPackage.Assessment.SelectedCalendar.$selected !== undefined) {
        assessmentPackage.Assessment.CalendarKey = assessmentPackage.Assessment.SelectedCalendar.$selected.CalendarKey;
        assessmentPackage.Assessment.MarkingPeriodKey = assessmentPackage.Assessment.SelectedCalendar.$selected.MarkingPeriodKey;
      }
      }
      assessmentPackage.Assessment.SubjectKey = assessmentPackage.Assessment.Subject.SubjectKey;
      assessmentPackage.Assessment.SchoolYearKey = assessmentPackage.Assessment.SchoolYear.SchoolYearKey;

      if (assessmentPackage.ShouldPublish) {
        assessmentPackage.Assessment.IsPublished = true;
        console.log("Published Assessment");
      }
      assessmentPackage.Assessment.DateCreated = null;
      this.promise = this.$http.put(this.apiRoot + "DistrictAssessment/",
      assessmentPackage.Assessment)
      .then(function(response){
          return response.data;
      })
      .catch(function(response){
        return response.data;
      });

      return this.promise;
    }

    archiveAssessment(assessmentKey: number): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      this.promise = this.$http.post(this.apiRoot + "DistrictAssessment/Archive/" + assessmentKey + "/", {})
      .then(function(response){
          return response.data;
      })
      .catch(function(response){
        return response.data;
      });

      return this.promise;
    }

    unarchiveAssessment(assessmentKey: number): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      this.promise = this.$http.post(this.apiRoot + "DistrictAssessment/Unarchive/" + assessmentKey + "/", {})
      .then(function(response){
          return response.data;
      })
      .catch(function(response){
        return response.data;
      });

      return this.promise;
    }

    deleteAssessment(assessmentKey: number): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      console.log("Deleting assessment");
      this.promise = this.$http.delete(this.apiRoot + "DistrictAssessment/" + assessmentKey + "/")
      .then(function(response){
          return response.data;
      })
      .catch(function(response){
        return response.data;
      });

      return this.promise;
    }

    getPublishedDistrictAssessments(): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      console.log("Getting Assessments From Service");

      let self = this;
      this.promise = this.$http.get(this.apiRoot + "DistrictAssessment/?Published=true",
      {timeout : this.assessmentSearchCanceler.promise})
      .then(function(response){
        self.currentPublishedDistrictAssessments = <Array<DistrictAssessment>>response.data;
        return response.data;
      });

      return this.promise;
    }

    getClassrooms(filterString): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      console.log("Getting Classroom Assessments From Service");
      this.classroomSearchCanceler.resolve();
      this.classroomSearchCanceler = this.$q.defer();
      this.promise = this.$http.get(this.apiRoot + "Classroom/" + filterString,
      {timeout : this.classroomSearchCanceler.promise})
      .then(function(response){
        // if(filterString == ""){
        //   this.nonFilteredDistrictAssessments = response.data;
        // }
        return response.data;
      });

      return this.promise;
    }

    getClassroomAssessments(filterString): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      console.log("Getting Classroom Assessments From Service");

      this.promise = this.$http.get(this.apiRoot + "ClassroomAssessment/" + filterString,
      {timeout : this.assessmentSearchCanceler.promise})
      .then(function(response){
        if (filterString === "") {
          this.nonFilteredDistrictAssessments = response.data;
        }
        return response.data;
      });

      return this.promise;
    }

    assignAssessment(classroomKey: number): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      console.log("Assigning assessment");
      this.promise = this.$http.post(this.apiRoot + "ClassroomAssessment/Assign/", { DistrictAssessmentKey : this.currentSelectedDistrictAssessment.DistrictAssessmentKey, ClassroomKey: classroomKey})
      .then(function(response){
          return response.data;
      })
      .catch(function(response){
        return response.data;
      });

      return this.promise;
    }



    getAssessmentTemplates(filterString): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      console.log("Getting Assessments From Service");

      let self = this;
      this.promise = this.$http.get(this.apiRoot + "AssessmentTemplate/" + filterString,
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

    saveAssessmentTemplate(assessmentPackage: AssessmentTemplatePackage): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      console.log("Saving Assessment Template In Service");
      assessmentPackage.AssessmentTemplate.GradeLevelKey = assessmentPackage.AssessmentTemplate.GradeLevel.GradeLevelKey;
      assessmentPackage.AssessmentTemplate.StandardTypeKey = assessmentPackage.AssessmentTemplate.StandardType.StandardTypeKey;
      assessmentPackage.AssessmentTemplate.CalendarKey = assessmentPackage.AssessmentTemplate.SelectedCalendar.$selected.CalendarKey;
      assessmentPackage.AssessmentTemplate.MarkingPeriodKey = assessmentPackage.AssessmentTemplate.SelectedCalendar.$selected.MarkingPeriodKey;
      assessmentPackage.AssessmentTemplate.SubjectKey = assessmentPackage.AssessmentTemplate.Subject.SubjectKey;
      assessmentPackage.AssessmentTemplate.DistrictKey = assessmentPackage.AssessmentTemplate.District.DistrictKey;
      let self = this;
      this.promise = this.$http.post(this.apiRoot + "AssessmentTemplate/",
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

    updateAssessmentTemplate(assessmentTemplatePackage: AssessmentTemplatePackage): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      console.log("Updating Assessment In Service");
      // assessmentPackage.Assessment.GradeLevelKey = assessmentPackage.Assessment.GradeLevel.GradeLevelKey;
      // assessmentPackage.Assessment.StandardTypeKey = assessmentPackage.Assessment.StandardType.StandardTypeKey;
      // assessmentPackage.Assessment.CalendarKey = assessmentPackage.Assessment.Calendar.CalendarKey;
      // assessmentPackage.Assessment.SubjectKey = assessmentPackage.Assessment.Subject.SubjectKey;
      // assessmentPackage.Assessment.SchoolYearKey = assessmentPackage.Assessment.SchoolYear.SchoolYearKey;
      if (assessmentTemplatePackage.ShouldMakeAvailableToUsers) {
        assessmentTemplatePackage.AssessmentTemplate.AvailableToUsers = true;
      }
      // assessmentPackage.Assessment.DateCreated = null;
      let self = this;
      this.promise = this.$http.put(this.apiRoot + "AssessmentTemplate/",
      assessmentTemplatePackage.AssessmentTemplate)
      .then(function(response){
        self.mainService.assessmentTemplateOptions = new Array<AssessmentTemplate>();
          return response.data;
      })
      .catch(function(){
        return false;
      });

      return this.promise;
    }

    archiveAssessmentTemplate(assessmentTemplateKey: number): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      console.log("Archiving assessment template");
      this.promise = this.$http.post(this.apiRoot + "AssessmentTemplate/Archive/" + assessmentTemplateKey + "/", {})
      .then(function(response){
          return response.data;
      })
      .catch(function(response){
        return response.data;
      });

      return this.promise;
    }

    deleteAssessmentTemplate(assessmentTemplateKey: number): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      console.log("Deleting assessment template");
      this.promise = this.$http.delete(this.apiRoot + "AssessmentTemplate/" + assessmentTemplateKey + "/")
      .then(function(response){
          return response.data;
      })
      .catch(function(response){
        return response.data;
      });

      return this.promise;
    }

    makeAssessmentTemplateAvailable(key: number): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> {
      let self = this;
      this.promise = this.$http.put(this.apiRoot + "AssessmentTemplate/MakeAvailable/" + key + "/", {})
      .then(function(response){
          self.mainService.assessmentTemplateOptions = new Array<AssessmentTemplate>();
          return response.data;
      })
      .catch(function(response){
        return response.data;
      });

      return this.promise;
    }

  }
}
