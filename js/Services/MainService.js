var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var MainService = (function (_super) {
        __extends(MainService, _super);
        function MainService($http) {
            _super.call(this);
            this.$http = $http;
            // this.apiRoot = "http://win-iq115hn5k0f:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
            this.apiRoot = "http://172.21.255.55:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
        }
        MainService.prototype.setPageTitles = function (pageTitle, pageTypeTitle) {
            this.pageTitle = pageTitle;
            this.pageTypeTitle = pageTypeTitle;
            if (pageTitle.toLowerCase() == "assessment management") {
                this.inAssessmentManagement = true;
            }
            else {
                this.inAssessmentManagement = false;
            }
            if (pageTypeTitle.toLowerCase() == "assessment class score view") {
                this.inScoreEntry = true;
            }
            else {
                this.inScoreEntry = false;
            }
            if (pageTypeTitle.toLowerCase() == "assessment assignment") {
                this.inAssessmentAssignment = true;
            }
            else {
                this.inAssessmentAssignment = false;
            }
        };
        MainService.prototype.getCalendarOptions = function () {
            var self = this;
            var promise = this.$http.get(this.apiRoot + 'Options/Calendar/')
                .then(function (response) {
                self.calendarOptions = response.data;
                return response.data;
            });
            return promise;
        };
        MainService.prototype.getGradeOptions = function () {
            var self = this;
            var promise = this.$http.get(this.apiRoot + 'Options/GradeLevel/')
                .then(function (response) {
                self.gradeOptions = response.data;
                return response.data;
            });
            return promise;
        };
        MainService.prototype.getSubjectOptions = function () {
            var self = this;
            var promise = this.$http.get(this.apiRoot + 'Options/Subject/')
                .then(function (response) {
                self.subjectOptions = response.data;
                return response.data;
            });
            return promise;
        };
        MainService.prototype.getSchoolYearOptions = function () {
            var self = this;
            var promise = this.$http.get(this.apiRoot + 'Options/SchoolYear/')
                .then(function (response) {
                self.schoolYearOptions = response.data;
                return response.data;
            });
            return promise;
        };
        MainService.prototype.getStandardTypeOptions = function () {
            var self = this;
            var promise = this.$http.get(this.apiRoot + 'Options/StandardType/')
                .then(function (response) {
                self.standardTypeOptions = response.data;
                return response.data;
            });
            return promise;
        };
        MainService.prototype.getTemplateOptions = function () {
            return [{ Title: "None", AssessmentTemplateKey: 0, CalendarKey: 0, SubjectKey: 0, StandardTypeKey: 0 },
                { Title: "Template 1", AssessmentTemplateKey: 1, Calendar: { CalendarKey: 1, CalendarName: "Calendar 1" }, Subject: { SubjectKey: 1, SubjectName: "Test Subject" }, StandardTypeKey: 1, GradeLevelKey: 1 },
                { Title: "Template 2", AssessmentTemplateKey: 2, CalendarKey: 2, SubjectKey: 2, StandardTypeKey: 2, GradeLevelKey: 2 }];
        };
        MainService.prototype.getItemTypeOptions = function () {
            return [{ ItemTypeKey: 1, TypeName: "Multiple Choice" }, { ItemTypeKey: 2, TypeName: "Constructed Response" }];
        };
        MainService.$inject = ['$http'];
        return MainService;
    }(INGA.Service));
    INGAApp.MainService = MainService;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=MainService.js.map