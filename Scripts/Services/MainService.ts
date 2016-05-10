module INGAApp {
  export class MainService extends INGA.Service
  {
    static $inject = ['$http'];

    constructor($http: ng.IHttpService) {
      super();
    }

    getCalendarOptions(): Array<Calendar>{
      return [{CalendarKey: 1, CalendarName: "Calendar 1"},
              {CalendarKey: 2, CalendarName: "Calendar 2"}];
    }

    getGradeOptions(): Array<GradeLevel>{
      return [{GradeLevelKey: 1, GradeLevelName: "K"},
              {GradeLevelKey: 2, GradeLevelName: "1"}];
    }

    getSubjectOptions(): Array<Subject>{
      return [{SubjectKey: 1, SubjectName: "Reading"},
              {SubjectKey: 2, SubjectName: "Math"}];
    }

    getSchoolYearOptions(): Array<SchoolYear>{
      return [{SchoolYearKey: 1, SchoolYearNameShort: "2015-2016"},
              {SchoolYearKey: 2, SchoolYearNameShort: "2016-2017"}];
    }

    getStandardTypeOptions(): Array<StandardType>{
      return [{StandardTypeKey: 1, Name: "District"},
              {StandardTypeKey: 2, Name: "GLSCE"}];
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
