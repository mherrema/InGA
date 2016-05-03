module INGAApp {
  export class MainService extends INGA.Service
  {
    static $inject = ['$http'];

    constructor($http: ng.IHttpService) {
      super();
    }

    getGradeOptions(): Array<Grade>{
      return [{gradeKey: 1, gradeName: "K"},
              {gradeKey: 2, gradeName: "1"}];
    }

    // getActivityItems(): Array<Coalesce.IActivityItem> {
    //   return this.contextService.currentContext.ActivityFeed.getFeed();
    // }
  }
}
