var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var FilterService = (function (_super) {
        __extends(FilterService, _super);
        function FilterService($http) {
            _super.call(this);
            this.$http = $http;
            this.apiRoot = "http://win-iq115hn5k0f:37913/_vti_bin/INGAApplicationService/INGAApplicationService.svc/";
        }
        FilterService.prototype.getDistrictAssessmentFilterOptions = function () {
            console.log("Getting Assessments From Service");
            var filterString = "";
            this.promise = this.$http.get(this.apiRoot + 'Filters/DistrictAssessment/')
                .then(function (response) {
                return response.data;
            });
            return this.promise;
        };
        FilterService.prototype.getDataEntryFilterOptions = function () {
            var filterString = "";
            this.promise = this.$http.get(this.apiRoot + 'Filters/DataEntry/')
                .then(function (response) {
                return response.data;
            });
            return this.promise;
        };
        FilterService.$inject = ['$http'];
        return FilterService;
    }(INGA.Service));
    INGAApp.FilterService = FilterService;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=FilterService.js.map