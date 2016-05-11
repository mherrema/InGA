var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var AssessmentService = (function (_super) {
        __extends(AssessmentService, _super);
        function AssessmentService($http) {
            _super.call(this);
            this.currentAssessments = [{ Title: "Kindergarten - Universal Screener - Spring",
                    GradeLevel: { GradeLevelName: "K", GradeLevelKey: 1 }, Subject: { SubjectName: "Reading" }, Term: "Winter", SchoolYear: { SchoolYearNameShort: "2015-2016" }, AssessmentTemplate: { AssessmentTemplateKey: 0, Title: "None" } },
                { Title: "Kindergarten - Universal Screener - Spring", GradeLevel: { GradeLevelName: "K", GradeLevelKey: 1 }, Subject: { SubjectName: "Reading" }, Term: "Winter", SchoolYear: { SchoolYearNameShort: "2015-2016" }, AssessmentTemplate: {
                        AssessmentTemplateKey: 0, Title: "None" } }, { Title: "Kindergarten - Universal Screener - Spring",
                    GradeLevel: { GradeLevelName: "K", GradeLevelKey: 1 }, Subject: { SubjectName: "Reading" }, Term: "Winter", SchoolYear: { SchoolYearNameShort: "2015-2016" }, AssessmentTemplate: { AssessmentTemplateKey: 0, Title: "None" } }];
            this.currentClassroomAssessments = [{ Title: "Kindergarten - Universal Screener - Spring" },
                { Title: "Kindergarten - Universal Screener - Spring" }, { Title: "Kindergarten - Universal Screener - Spring" }];
        }
        AssessmentService.prototype.getAssessments = function () {
            console.log("Getting Assessments From Service");
            return this.currentAssessments;
        };
        AssessmentService.prototype.saveAssessment = function (assessmentPackage) {
            console.log("Saving Assessment In Service");
            if (assessmentPackage.ShouldPublish) {
                assessmentPackage.Assessment.IsPublished = true;
                console.log("Published Assessment");
            }
            if (!assessmentPackage.ShouldRefresh) {
                this.currentAssessments.push(assessmentPackage.Assessment);
            }
            else {
                console.log("Reloading Assessments");
            }
            return true;
        };
        AssessmentService.$inject = ['$http'];
        return AssessmentService;
    }(INGA.Service));
    INGAApp.AssessmentService = AssessmentService;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=AssessmentService.js.map