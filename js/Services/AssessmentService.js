var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var AssessmentService = (function (_super) {
        __extends(AssessmentService, _super);
        function AssessmentService($http, $q) {
            _super.call(this);
            this.$http = $http;
            this.$q = $q;
            // this.apiRoot = "http://win-iq115hn5k0f:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
            this.apiRoot = "http://172.21.255.55:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
            this.assessmentSearchCanceler = $q.defer();
            this.currentDistrictAssessments = [];
        }
        AssessmentService.prototype.getDistrictAssessments = function () {
            console.log("Getting Assessments From Service");
            var filterString = "";
            var self = this;
            this.promise = this.$http.get(this.apiRoot + 'DistrictAssessment/' + filterString, { timeout: this.assessmentSearchCanceler.promise })
                .then(function (response) {
                if (filterString == "") {
                    this.nonFilteredDistrictAssessments = response.data;
                }
                self.currentDistrictAssessments = response.data;
                return response.data;
            });
            return this.promise;
        };
        AssessmentService.prototype.saveAssessment = function (assessmentPackage) {
            console.log("Saving Assessment In Service");
            assessmentPackage.Assessment.GradeLevelKey = assessmentPackage.Assessment.GradeLevel.GradeLevelKey;
            assessmentPackage.Assessment.StandardTypeKey = assessmentPackage.Assessment.StandardType.StandardTypeKey;
            assessmentPackage.Assessment.CalendarKey = assessmentPackage.Assessment.Calendar.CalendarKey;
            assessmentPackage.Assessment.SubjectKey = assessmentPackage.Assessment.Subject.SubjectKey;
            assessmentPackage.Assessment.SchoolYearKey = assessmentPackage.Assessment.SchoolYear.SchoolYearKey;
            if (assessmentPackage.ShouldPublish) {
                assessmentPackage.Assessment.IsPublished = true;
                console.log("Published Assessment");
            }
            this.promise = this.$http.post(this.apiRoot + 'DistrictAssessment/', assessmentPackage.Assessment)
                .then(function (response) {
                return true;
            })
                .catch(function () {
                return false;
            });
            return this.promise;
        };
        AssessmentService.prototype.getClassroomAssessments = function () {
            console.log("Getting Classroom Assessments From Service");
            var filterString = "";
            this.promise = this.$http.get(this.apiRoot + 'ClassroomAssessment/' + filterString, { timeout: this.assessmentSearchCanceler.promise })
                .then(function (response) {
                if (filterString == "") {
                    this.nonFilteredDistrictAssessments = response.data;
                }
                return response.data;
            });
            return this.promise;
        };
        AssessmentService.$inject = ['$http', '$q'];
        return AssessmentService;
    }(INGA.Service));
    INGAApp.AssessmentService = AssessmentService;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=AssessmentService.js.map