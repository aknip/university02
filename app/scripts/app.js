angular.module('famousApp', ['famous.angular', 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/homeview");
        $stateProvider

            .state("homeview", {
                controller: "homeview",
                url: "/homeview",
                templateUrl: "views/homeview.html"
            })

    }); 