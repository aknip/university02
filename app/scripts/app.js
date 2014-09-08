angular.module('famousApp', ['famous.angular', 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state("app", {
                url: "/app",
                controller: "appview",
                abstract: true,
                templateUrl: "partials/appview.html"
            })

            .state("app.list", {
                url: "/list",
                abstract: true,
                views: {
                    "listView": { templateUrl: "partials/listview.html" }
                }
            })

            .state("app.list.detail", {
                url: "/:detail",
                views: {
                    "detailView": { templateUrl: "partials/listview-detail.html" }
                }
            })

        $urlRouterProvider.otherwise("/app/list/0");

    })
