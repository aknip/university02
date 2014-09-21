angular.module('famousApp', ['famous.angular', 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state("app", {
                url: "/app",
                controller: "appviewCtrl",
                abstract: true,
                templateUrl: "modules/app-main/appview.html"
            })


            .state("app.navid", {
                url: "/:navid",
                views: {
                    "contentView": {
                        templateUrl: "modules/app-main/menuview.html"
                    }
                }
            })

            .state("app.navid.subnavid", {
                url: "/:subnavid"
            });



        $urlRouterProvider.otherwise("/app/1");

    });
