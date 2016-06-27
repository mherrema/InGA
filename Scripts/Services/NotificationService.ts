namespace INGAApp {

  export class NotificationService {
    currentNotification: Notification;
    notificationActive: boolean;
    $timeout: ng.ITimeoutService;

    constructor($timeout: ng.ITimeoutService) {
      this.$timeout = $timeout;
      this.currentNotification = {NotificationText: "", Success: false, Error: false, Active: false};
    }


    showNotification(text: string, type: string): void {
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
      let self = this;
      this.$timeout(function () {
          self.currentNotification.Active = false;
          self.$timeout(function () {
              self.currentNotification = { NotificationText: "", Success: false, Error: false, Active: false };
          }, 1000);
      }, 5000);
    }
  }
}
