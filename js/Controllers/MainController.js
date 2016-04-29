var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INGAApp;
(function (INGAApp) {
    var MainController = (function (_super) {
        __extends(MainController, _super);
        // navService: NavigationService;
        // projectService: ProjectService;
        function MainController($scope) {
            _super.call(this, $scope);
            // this.navService = navService;
            // this.projectService = projectService;
            var controller = this;
            $scope.init = function () {
                $scope.test = "hello";
                $scope.pageTypeTitle = "INGA";
                $scope.pageTitle = "Assessment Management";
                // $scope.clientNavItems = navService.getClientNavItems();
                // $scope.mainNavItems = navService.getMainNavItems();
                // $scope.mobileMenuOpen = false;
                // $scope.filtersCollapsed = false;
                // $scope.loading = false;
                // $scope.clientSidebarOpen = false
                // $scope.families = [];
                // $scope.setSidebarMenuWidth();
                // if ($scope.currentRoute === null || $scope.currentRoute === undefined) {
                //   $scope.currentRoute = { route: {name: "", url: "" }};
                // }
            };
            // $scope.$watch(() => navService.currentRoute,
            // (newValue: INavItem, oldValue: INavItem) => {
            //   $scope.currentRoute = newValue;
            // });
            //
            // $scope.$watch(() => navService.clientNavItems,
            // (newValue: Array< MainNavItem >, oldValue: Array< MainNavItem >) => {
            //   if($scope.clientNavItems != newValue){
            //     $scope.clientNavItems = newValue;
            //   }
            // });
            //
            // $scope.$watch(() => navService.mobileMenuOpen,
            // (newValue: boolean, oldValue: boolean) => {
            //   $scope.mobileMenuOpen = newValue;
            // });
            //
            // $scope.$watch(() => navService.filtersCollapsed,
            // (newValue: boolean, oldValue: boolean) => {
            //   $scope.filtersCollapsed = newValue;
            // });
            //
            // $scope.$watch(() => navService.clientSidebarOpen,
            // (newValue: boolean, oldValue: boolean) => {
            //   $scope.clientSidebarOpen = newValue;
            // });
            //
            // $scope.$watch(() => navService.families,
            // (newValue: Array< string >, oldValue: Array< string >) => {
            //   $scope.families= newValue;
            // });
            //
            // $scope.$watch(() => navService.mainSidebarOpen,
            // (newValue: boolean, oldValue: boolean) => {
            //   $scope.mainSidebarOpen = newValue;
            // });
            //
            // $scope.$watch(() => navService.shouldBodyFill,
            // (newValue: boolean, oldValue: boolean) => {
            //   $scope.shouldBodyFill = newValue;
            // });
            //
            // $scope.showLoading = function(){
            //   $scope.loading = true;
            // }
            //
            // $scope.hideLoading = function(){
            //   $scope.loading = false;
            // }
            // $scope.setSidebarMenuWidth = function () {
            //   $timeout(function () {
            //     var setToWidth = $("#top-bar-family").outerWidth() + $("#top-bar-family").position().left;
            //     $("#desktop-menu").css({minWidth: setToWidth});
            //     $("#main-menu-sidebar").css({maxWidth: setToWidth, left: -setToWidth});
            //     if(setToWidth > $("#client-sidebar").width() || setToWidth > $("#main-menu-sidebar").width()){
            //       $scope.sidebarWidth = setToWidth;
            //       $("#client-sidebar").css({width: setToWidth, left: -setToWidth});
            //     }
            //     else{
            //       $scope.sidebarWidth = $("#client-sidebar").width();
            //       // $scope.sidebarWidth = $("#main-menu-sidebar").width();
            //     }
            //   });
            // }
            // $scope.handleClick = function( event ){
            //   if(event.pageX > 322){
            //     navService.closeSidebars();
            //   }
            //   if(navService.currentRoute.route.name == "Project" && projectService.projectStatusOptionsOpen){
            //     var options = $("#project-status-options");
            //     var optionsPosition = $("#project-status-options").position();
            //     var top = optionsPosition.top + options.offset().top
            //     var left = optionsPosition.left + options.offset().left;
            //     var right = optionsPosition.left + options.outerWidth() + options.offset().left;
            //     var bottom = optionsPosition.top + options.offset().top + options.outerHeight();
            //     if(event.pageX < left || event.pageX > right || event.pageY < top || event.pageY > bottom){
            //       if(options.hasClass("open")){
            //         projectService.closeOptions();
            //       }
            //     }
            //   }
            // };
        }
        MainController.$inject = ['$scope'];
        return MainController;
    }(BaseController.Controller));
    INGAApp.MainController = MainController;
})(INGAApp || (INGAApp = {}));
//# sourceMappingURL=MainController.js.map