module INGAApp
{

  interface HeadingOption{
    open: boolean,
    heading: string,
    options: Array<FilterOption>,
    selected?: FilterOption
  }

  interface FilterOption{
    key: string,
    value?: string
  }

  interface Assessment{
    title: string,
    gradeLevel: string,
    subjectArea: string,
    term: string,
    schoolYear: string,
    checked?: boolean
  }

  export interface IAssessmentsScope extends BaseController.IScope
  {
    // currentRoute: INavItem,
    // sidebarWidth: number,
    // mobileMenuOpen: boolean,
    // clientSidebarOpen: boolean,
    // mainSidebarOpen: boolean,
    // filtersCollapsed: boolean,
    // loading: boolean,
    // shouldBodyFill: boolean,
    // clientNavItems: Array< MainNavItem >,
    // mainNavItems: Array< INavItem >,
    // families: Array< string >,
    init: Function,
    test: string,
    toggleSearchOpen: Function,
    searchOpen: boolean,
    openHeading: Function,
    closeHeadings: Function,
    headingOpen: boolean,
    selectHeadingOption: Function,
    headingOptions: Array<HeadingOption>,
    justOpenedHeading: boolean,
    setHeadingDropdownWidth: Function,
    checkFilters: Function,
    areOptionsSelected: boolean,
    clearFilters: Function,
    getAssessments: Function,
    currentAssessments: Array<Assessment>,
    toggleAllChecked : Function,
    allChecked : boolean
    // showLoading: Function,
    // hideLoading: Function,
    // setSidebarMenuWidth: Function,
    // toggleClientSidebar: Function,
    // handleClick: Function
  }

  export class AssessmentsController extends BaseController.Controller
  {
    scope: IAssessmentsScope;
    static $inject = ['$scope', '$timeout'];

    // navService: NavigationService;
    // projectService: ProjectService;

    constructor( $scope: IAssessmentsScope, $timeout: ng.ITimeoutService)
    {
      super( $scope );
      // this.navService = navService;
      // this.projectService = projectService;

      var controller = this;

      $scope.init = function(){
        $scope.getAssessments();
        $scope.headingOptions = [{heading: "Grade Level", options: [{key: "K"},{key: "1"}], open: false},
        {heading: "Subject Area", options: [{key: "K"},{key: "1"}], open: false},
        {heading: "Term", options: [{key: "K"},{key: "1"}], open: false},
        {heading: "School Year", options: [{key: "K"},{key: "1"}], open: false}];

        $scope.setHeadingDropdownWidth();

        $scope.allChecked = false;

        window.onclick = function () {
        if ($scope.justOpenedHeading) {
                $scope.headingOpen = true;
                $scope.justOpenedHeading = false;
                $scope.$apply();
        }
        else if ($scope.headingOpen) {
            $scope.closeHeadings();
            $scope.$apply();
        }
    }


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
      }


      $scope.getAssessments = function(){
        $scope.currentAssessments = [
          {title: "Kindergarten - Universal Screener - Spring", gradeLevel: "K", subjectArea: "Reading", term: "Winter", schoolYear: "2015-2016"},
          {title: "1st Grade - Universal Screener - Spring", gradeLevel: "1", subjectArea: "Math", term: "Spring", schoolYear: "2015-2016"},
          {title: "T-1st Grade - Universal Screener - Spring", gradeLevel: "1", subjectArea: "English", term: "Spring", schoolYear: "2015-2016"}
        ];
      }

      $scope.setHeadingDropdownWidth = function(){
        $timeout(function () {
                var dropdowns = $(".table-heading-dropdown");
                for (var i = 0; i < dropdowns.length; i++) {
                    $($(dropdowns[i])).css({ "width": "" });
                    if ($(dropdowns[i]).width() < $(dropdowns[i]).parent("th").outerWidth()) {
                        $(dropdowns[i]).width($(dropdowns[i]).parent("th").outerWidth());
                    }
                }
            });
      }

      $scope.toggleAllChecked = function(){
        angular.forEach($scope.currentAssessments, function (assessment) {
          if(!$scope.allChecked){
            assessment.checked = false;
          }
          else{
            assessment.checked = true;
          }
        });
      }

      //toggle if search input is open
    $scope.toggleSearchOpen = function () {
        // StateService.searchOpen = !StateService.searchOpen;
        $scope.searchOpen = !$scope.searchOpen;
        // if ($scope.status == 'view' && $scope.display == 'card') {
        //     if (StateService.searchOpen) {
        //         StateService.cardFiltrationOpen = true;
        //         StateService.setHeadingDropdownWidth();
        //     }
        //     else {
        //         StateService.cardFiltrationOpen = false;
        //     }
        // }
        if ($scope.searchOpen) {
            // focus("studentSearchInput");
        }
    }

    //open table heading filtration
    $scope.openHeading = function (heading) {
        $scope.closeHeadings();
        heading.open = true;
        $scope.justOpenedHeading = true;
    }

    //close all table heading filters
    $scope.closeHeadings = function () {
        $scope.headingOpen = false;
        angular.forEach($scope.headingOptions, function (value, key) {
            value.open = false;
        });
    }

    //select table heading filter option
    $scope.selectHeadingOption = function (heading: HeadingOption, option: FilterOption) {
        // $scope.loading = true;
        if (option.key != "All") {
            heading.selected = option;
            // FilterService.selectOption(heading, option);
            // FilterService.updateCurrentFilters();
        } else {
            heading.selected = { key: "", value: "" };
            // FilterService.updateCurrentFilters();
        }

        $scope.checkFilters();
        $scope.closeHeadings();
    }

    $scope.checkFilters = function () {
        $scope.areOptionsSelected = false;
        // StateService.filterOptionsSelected = false;
        angular.forEach($scope.headingOptions, function (value, key) {
            if (value.selected.value != "") {
                $scope.areOptionsSelected = true;
                // StateService.filterOptionsSelected = true;
                return;
            }
        });
    }

    $scope.clearFilters = function (input) {
        angular.forEach($scope.headingOptions, function (value, key) {
            value.selected = { key: "", value: "" };
        });

        // SearchService.clearSearchInput();
        // StateService.searchOpen = false;
        // FilterService.currentFilters = "";
        $scope.areOptionsSelected = false;
        // StateService.filterOptionsSelected = false;
        $scope.closeHeadings();

        // if (input) {
        //     if ($scope.status == "view") {
        //         $scope.getCohortStudents();
        //     }
        //     else {
        //         $scope.getAvailableStudents();
        //     }
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


  }
}
