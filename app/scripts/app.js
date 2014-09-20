angular.module('famousApp', ['famous.angular', 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state("app", {
                url: "/app",
                controller: "appviewCtrl",
                abstract: true,
                templateUrl: "views/appview.html"
            })

            .state("app.list", {
                url: "/list",
                abstract: true,
                views: {
                    "listView": {
                        templateUrl: "views/listview.html",
                        controller: "listviewCtrl"
                    }
                }
            })

            .state("app.list.detail", {
                url: "/:detail",
                views: {
                    "detailView": {
                        templateUrl: "views/listview-detail.html"
                    }
                }
            })

            .state("app.news", {
                url: "/news",
                views: {
                    "listView": {
                        templateUrl: "views/newsview.html"
                    }
                }
            })

            .state("app.home", {
                url: "/home",
                views: {
                    "listView": {
                        templateUrl: "views/homeview.html"
                    }
                }
            });

        $urlRouterProvider.otherwise("/app/home");

    });
