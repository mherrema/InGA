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
        }
        DataEntryService.$inject = ['$http'];
        return DataEntryService;
    }(INGA.Service));
    INGAApp.DataEntryService = DataEntryService;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=DataEntryService.js.map