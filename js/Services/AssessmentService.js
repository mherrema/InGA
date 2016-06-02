var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var AssessmentService = (function (_super) {
        __extends(AssessmentService, _super);
        function AssessmentService($http, $q, mainService) {
            _super.call(this);
            this.$http = $http;
            this.$q = $q;
            this.mainService = mainService;
            // this.apiRoot = "http://win-iq115hn5k0f:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
            this.apiRoot = "http://172.21.255.58:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
            this.assessmentSearchCanceler = $q.defer();
            this.currentDistrictAssessments = [];
            this.currentAssessmentTemplates = [];
            this.needToReloadTemplates = true;
        }
        AssessmentService.prototype.getDistrictAssessments = function (filterString) {
            console.log("Getting Assessments From Service");
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
            if (assessmentPackage.Assessment.AssessmentTemplate != null) {
                assessmentPackage.Assessment.AssessmentTemplateKey = assessmentPackage.Assessment.AssessmentTemplate.AssessmentTemplateKey;
            }
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
                return response.data;
            })
                .catch(function (response) {
                return response.data;
            });
            return this.promise;
        };
        AssessmentService.prototype.updateAssessment = function (assessmentPackage) {
            console.log("Updating Assessment In Service");
            assessmentPackage.Assessment.GradeLevelKey = assessmentPackage.Assessment.GradeLevel.GradeLevelKey;
            assessmentPackage.Assessment.StandardTypeKey = assessmentPackage.Assessment.StandardType.StandardTypeKey;
            assessmentPackage.Assessment.CalendarKey = assessmentPackage.Assessment.Calendar.CalendarKey;
            assessmentPackage.Assessment.SubjectKey = assessmentPackage.Assessment.Subject.SubjectKey;
            assessmentPackage.Assessment.SchoolYearKey = assessmentPackage.Assessment.SchoolYear.SchoolYearKey;
            if (assessmentPackage.ShouldPublish) {
                assessmentPackage.Assessment.IsPublished = true;
                console.log("Published Assessment");
            }
            assessmentPackage.Assessment.DateCreated = null;
            this.promise = this.$http.put(this.apiRoot + 'DistrictAssessment/', assessmentPackage.Assessment)
                .then(function (response) {
                return response.data;
            })
                .catch(function (response) {
                return response.data;
            });
            return this.promise;
        };
        AssessmentService.prototype.archiveAssessment = function (assessmentKey) {
            console.log("Archiving assessment");
            this.promise = this.$http.post(this.apiRoot + 'DistrictAssessment/Archive/' + assessmentKey + "/", {})
                .then(function (response) {
                return response.data;
            })
                .catch(function (response) {
                return response.data;
            });
            return this.promise;
        };
        AssessmentService.prototype.deleteAssessment = function (assessmentKey) {
            console.log("Deleting assessment");
            this.promise = this.$http.delete(this.apiRoot + 'DistrictAssessment/' + assessmentKey + "/")
                .then(function (response) {
                return response.data;
            })
                .catch(function (response) {
                return response.data;
            });
            return this.promise;
        };
        AssessmentService.prototype.getPublishedDistrictAssessments = function () {
            console.log("Getting Assessments From Service");
            var self = this;
            this.promise = this.$http.get(this.apiRoot + 'DistrictAssessment/?Published=true', { timeout: this.assessmentSearchCanceler.promise })
                .then(function (response) {
                self.currentPublishedDistrictAssessments = response.data;
                return response.data;
            });
            return this.promise;
        };
        AssessmentService.prototype.getClassrooms = function (filterString) {
            console.log("Getting Classroom Assessments From Service");
            this.promise = this.$http.get(this.apiRoot + 'Classroom/' + filterString, { timeout: this.assessmentSearchCanceler.promise })
                .then(function (response) {
                // if(filterString == ""){
                //   this.nonFilteredDistrictAssessments = response.data;
                // }
                return response.data;
            });
            return this.promise;
        };
        AssessmentService.prototype.getClassroomAssessments = function (filterString) {
            console.log("Getting Classroom Assessments From Service");
            this.promise = this.$http.get(this.apiRoot + 'ClassroomAssessment/' + filterString, { timeout: this.assessmentSearchCanceler.promise })
                .then(function (response) {
                if (filterString == "") {
                    this.nonFilteredDistrictAssessments = response.data;
                }
                return response.data;
            });
            return this.promise;
        };
        AssessmentService.prototype.getAssessmentTemplates = function (filterString) {
            console.log("Getting Assessments From Service");
            var self = this;
            this.promise = this.$http.get(this.apiRoot + 'AssessmentTemplate/' + filterString, { timeout: this.assessmentSearchCanceler.promise })
                .then(function (response) {
                // if(filterString == ""){
                //   this.nonFilteredDistrictAssessments = response.data;
                // }
                self.currentAssessmentTemplates = response.data;
                return response.data;
            });
            return this.promise;
        };
        AssessmentService.prototype.saveAssessmentTemplate = function (assessmentPackage) {
            console.log("Saving Assessment Template In Service");
            assessmentPackage.AssessmentTemplate.GradeLevelKey = assessmentPackage.AssessmentTemplate.GradeLevel.GradeLevelKey;
            assessmentPackage.AssessmentTemplate.StandardTypeKey = assessmentPackage.AssessmentTemplate.StandardType.StandardTypeKey;
            assessmentPackage.AssessmentTemplate.CalendarKey = assessmentPackage.AssessmentTemplate.Calendar.CalendarKey;
            assessmentPackage.AssessmentTemplate.SubjectKey = assessmentPackage.AssessmentTemplate.Subject.SubjectKey;
            assessmentPackage.AssessmentTemplate.DistrictKey = assessmentPackage.AssessmentTemplate.District.DistrictKey;
            var self = this;
            this.promise = this.$http.post(this.apiRoot + 'AssessmentTemplate/', assessmentPackage.AssessmentTemplate)
                .then(function (response) {
                self.mainService.assessmentTemplateOptions = new Array();
                return response.data;
            })
                .catch(function (response) {
                return response.data;
            });
            return this.promise;
        };
        AssessmentService.prototype.updateAssessmentTemplate = function (assessmentTemplatePackage) {
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
            var self = this;
            this.promise = this.$http.put(this.apiRoot + 'AssessmentTemplate/', assessmentTemplatePackage.AssessmentTemplate)
                .then(function (response) {
                self.mainService.assessmentTemplateOptions = new Array();
                return response.data;
            })
                .catch(function () {
                return false;
            });
            return this.promise;
        };
        AssessmentService.prototype.archiveAssessmentTemplate = function (assessmentTemplateKey) {
            console.log("Archiving assessment template");
            this.promise = this.$http.post(this.apiRoot + 'AssessmentTemplate/Archive/' + assessmentTemplateKey + "/", {})
                .then(function (response) {
                return response.data;
            })
                .catch(function (response) {
                return response.data;
            });
            return this.promise;
        };
        AssessmentService.prototype.deleteAssessmentTemplate = function (assessmentTemplateKey) {
            console.log("Deleting assessment template");
            this.promise = this.$http.delete(this.apiRoot + 'AssessmentTemplate/' + assessmentTemplateKey + "/")
                .then(function (response) {
                return response.data;
            })
                .catch(function (response) {
                return response.data;
            });
            return this.promise;
        };
        AssessmentService.prototype.makeAssessmentTemplateAvailable = function (key) {
            var self = this;
            this.promise = this.$http.put(this.apiRoot + 'AssessmentTemplate/MakeAvailable/' + key + '/', {})
                .then(function (response) {
                self.mainService.assessmentTemplateOptions = new Array();
                return response.data;
            })
                .catch(function (response) {
                return response.data;
            });
            return this.promise;
        };
        AssessmentService.$inject = ['$http', '$q', 'mainService'];
        return AssessmentService;
    }(INGA.Service));
    INGAApp.AssessmentService = AssessmentService;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=AssessmentService.js.map