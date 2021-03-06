var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var MainService = (function (_super) {
        __extends(MainService, _super);
        function MainService($http, $q) {
            _super.call(this);
            this.$http = $http;
            this.$q = $q;
            this.apiRoot = "http://win-iq115hn5k0f:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
            // this.apiRoot = "http://172.21.255.64:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
        }
        MainService.prototype.setPageTitles = function (pageTitle, pageTypeTitle) {
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
        };
        // getCalendarOptions(): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
        //   var self:MainService = this;
        //   var promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> = this.$http.get(this.apiRoot + "Options/Calendar/")
        //   .then(function(response){
        //     self.calendarOptions = <Array<Calendar>>response.data;
        //     return response.data;
        //   });
        //
        //   return promise;
        // }
        MainService.prototype.getCalendarOptions = function (id) {
            var self = this;
            if (!this.calendarOptions) {
                var promise = this.$http.get(this.apiRoot + "Options/Calendar/")
                    .then(function (response) {
                    self.calendarOptions = response.data;
                    return response.data[id];
                });
            }
            else {
                var deferred = this.$q.defer();
                deferred.resolve(self.calendarOptions[id]);
                var promise = deferred.promise;
            }
            return promise;
        };
        MainService.prototype.getDistrictOptions = function () {
            var self = this;
            var promise = this.$http.get(this.apiRoot + "Options/District/")
                .then(function (response) {
                self.districtOptions = response.data;
                return response.data;
            });
            return promise;
        };
        MainService.prototype.getGradeOptions = function () {
            var self = this;
            var promise = this.$http.get(this.apiRoot + "Options/GradeLevel/")
                .then(function (response) {
                self.gradeOptions = response.data;
                return response.data;
            });
            return promise;
        };
        MainService.prototype.getSubjectOptions = function () {
            var self = this;
            var promise = this.$http.get(this.apiRoot + "Options/Subject/")
                .then(function (response) {
                self.subjectOptions = response.data;
                return response.data;
            });
            return promise;
        };
        MainService.prototype.getSchoolYearOptions = function () {
            var self = this;
            var promise = this.$http.get(this.apiRoot + "Options/SchoolYear/")
                .then(function (response) {
                self.schoolYearOptions = response.data;
                return response.data;
            });
            return promise;
        };
        MainService.prototype.getStandardTypeOptions = function () {
            var self = this;
            var promise = this.$http.get(this.apiRoot + "Options/StandardType/")
                .then(function (response) {
                self.standardTypeOptions = response.data;
                return response.data;
            });
            return promise;
        };
        MainService.prototype.getAssessmentTemplateOptions = function () {
            var self = this;
            var promise = this.$http.get(this.apiRoot + "Options/AssessmentTemplate/")
                .then(function (response) {
                self.assessmentTemplateOptions = response.data;
                return response.data;
            });
            return promise;
        };
        MainService.prototype.getStandardOptions = function (searchString) {
            var self = this;
            var promise = this.$http.get(this.apiRoot + "Options/Standard/?SearchString=" + searchString)
                .then(function (response) {
                self.standardOptions = response.data;
                return response.data;
            });
            return promise;
        };
        MainService.prototype.getItemTypeOptions = function () {
            return [{ ItemTypeKey: 1, TypeName: "Multiple Choice" }, { ItemTypeKey: 2, TypeName: "Constructed Response" }];
        };
        MainService.$inject = ["$http", "$q"];
        return MainService;
    }(INGA.Service));
    INGAApp.MainService = MainService;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=MainService.js.map