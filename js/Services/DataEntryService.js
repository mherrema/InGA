var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var DataEntryService = (function (_super) {
        __extends(DataEntryService, _super);
        function DataEntryService($http) {
            _super.call(this);
            this.$http = $http;
            this.apiRoot = "http://win-iq115hn5k0f:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
            // this.apiRoot = "http://172.21.255.61:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
        }
        DataEntryService.prototype.getStudents = function (classroomKey) {
            //console.log("Getting Classroom Assessments From Service");
            this.promise = this.$http.get(this.apiRoot + 'Student/Classroom/' + classroomKey)
                .then(function (response) {
                // if(filterString == ""){
                //   this.nonFilteredDistrictAssessments = response.data;
                // }
                return response.data;
            });
            return this.promise;
        };
        DataEntryService.prototype.getItems = function (districtAssessmentKey) {
            this.promise = this.$http.get(this.apiRoot + 'DistrictAssessment/Item/' + districtAssessmentKey)
                .then(function (response) {
                return response.data;
            });
            return this.promise;
        };
        DataEntryService.$inject = ['$http'];
        return DataEntryService;
    }(INGA.Service));
    INGAApp.DataEntryService = DataEntryService;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=DataEntryService.js.map