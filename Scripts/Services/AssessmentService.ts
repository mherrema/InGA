module INGAApp {
  export class AssessmentService extends INGA.Service
  {
    static $inject = ['$http'];

    currentAssessments: Array<DistrictAssessment>;

    constructor($http: ng.IHttpService) {
      super();

      this.currentAssessments =  [{Title: "Kindergarten - Universal Screener - Spring",
      GradeLevel: {GradeLevelName:"K", GradeLevelKey: 1}, Subject:
      {SubjectName: "Reading"}, Term: "Winter", SchoolYear: {SchoolYearNameShort:
        "2015-2016"}, AssessmentTemplate: { AssessmentTemplateKey: 0, Title: "None"}},
        {Title: "Kindergarten - Universal Screener - Spring", GradeLevel:
        {GradeLevelName:"K", GradeLevelKey: 1}, Subject: {SubjectName: "Reading"}, Term:
        "Winter", SchoolYear: {SchoolYearNameShort: "2015-2016"}, AssessmentTemplate: {
          AssessmentTemplateKey: 0, Title: "None"}}, {Title: "Kindergarten - Universal Screener - Spring",
          GradeLevel: {GradeLevelName:"K", GradeLevelKey: 1}, Subject:
          {SubjectName: "Reading"}, Term: "Winter", SchoolYear: {SchoolYearNameShort:
            "2015-2016"}, AssessmentTemplate: { AssessmentTemplateKey: 0, Title: "None"}} ];
    }

    getAssessments(): Array<DistrictAssessment>{
      console.log("Getting Assessments From Service");

      return this.currentAssessments;
    }

    saveAssessment(assessmentPackage: AssessmentPackage): boolean{
      console.log("Saving Assessment In Service");
      if(assessmentPackage.ShouldPublish){
        assessmentPackage.Assessment.IsPublished = true;
        console.log("Published Assessment");
      }
      if(!assessmentPackage.ShouldRefresh){
        this.currentAssessments.push(assessmentPackage.Assessment);
      }
      else{
        console.log("Reloading Assessments");
        //RELOAD ASSESSMENTS
      }
      return true;
    }

  }
}
