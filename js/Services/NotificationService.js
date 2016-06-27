var INGAApp;
(function (INGAApp) {
    var NotificationService = (function () {
        function NotificationService($timeout) {
            this.$timeout = $timeout;
            this.currentNotification = { NotificationText: "", Success: false, Error: false, Active: false };
        }
        NotificationService.prototype.showNotification = function (text, type) {
            this.currentNotification.NotificationText = text;
            if (type === "success") {
                this.currentNotification.Success = true;
                this.currentNotification.Error = false;
            }
            else if (type === "error") {
                this.currentNotification.Success = false;
                this.currentNotification.Error = true;
            }
            this.currentNotification.Active = true;
            var self = this;
            this.$timeout(function () {
                self.currentNotification.Active = false;
                self.$timeout(function () {
                    self.currentNotification = { NotificationText: "", Success: false, Error: false, Active: false };
                }, 1000);
            }, 5000);
        };
        return NotificationService;
    }());
    INGAApp.NotificationService = NotificationService;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=NotificationService.js.map