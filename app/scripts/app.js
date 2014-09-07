angular.module('famousApp', ['famous.angular', 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {

        
        $stateProvider

            .state("home", {
                controller: "homeview",
                url: "/home",
                templateUrl: "views/homeview.html"
            })
            
            .state("home.list", {
                controller: "homeview",
                url: "/list",
                templateUrl: "views/homeview.html"
            })
            
        $urlRouterProvider.otherwise("/home");    

    }); 