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
        MainService.prototype.getGradeOptions = function () {
            return [{ gradeKey: 1, gradeName: "K" },
                { gradeKey: 2, gradeName: "1" }];
        };
        MainService.$inject = ['$http'];
        return MainService;
    }(INGA.Service));
    INGAApp.MainService = MainService;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=MainService.js.map