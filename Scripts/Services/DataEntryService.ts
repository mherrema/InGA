module INGAApp {
  export class DataEntryService extends INGA.Service
  {
    static $inject = ['$http'];

    currentAssessment: ClassroomAssessment;

    constructor($http: ng.IHttpService) {
      super();
    }


  }
}
