angular.module('famousApp', ['famous.angular', 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state("app", {
                url: "/app",
                controller: "appview",
                abstract: true,
                templateUrl: "views/appview.html"
            })

            .state("app.list", {
                url: "/list",
                abstract: true,
                views: {
                    "listView": { templateUrl: "views/listview.html" }
                }
            })

            .state("app.list.detail", {
                url: "/:detail",
                views: {
                    "detailView": { templateUrl: "views/listview-detail.html" }
                }
            })

        $urlRouterProvider.otherwise("/app/list/0");

    })
