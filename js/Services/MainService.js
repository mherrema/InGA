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
        };
        MainService.prototype.getCalendarOptions = function () {
            return [{ CalendarKey: 1, CalendarName: "Calendar 1" },
                { CalendarKey: 2, CalendarName: "Calendar 2" }];
        };
        MainService.prototype.getGradeOptions = function () {
            return [{ GradeLevelKey: 1, GradeLevelName: "K" },
                { GradeLevelKey: 2, GradeLevelName: "1" }];
        };
        MainService.prototype.getSubjectOptions = function () {
            return [{ SubjectKey: 1, SubjectName: "Reading" },
                { SubjectKey: 2, SubjectName: "Math" }];
        };
        MainService.prototype.getSchoolYearOptions = function () {
            return [{ SchoolYearKey: 1, SchoolYearNameShort: "2015-2016" },
                { SchoolYearKey: 2, SchoolYearNameShort: "2016-2017" }];
        };
        MainService.prototype.getStandardTypeOptions = function () {
            return [{ StandardTypeKey: 1, Name: "District" },
                { StandardTypeKey: 2, Name: "GLSCE" }];
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