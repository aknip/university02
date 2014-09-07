'use strict';

angular.module('famousApp')
    .directive('appScrollview', function ($famous) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/components/app-scrollview/scrollview.html',
            link:function (scope, element, attr) {
                // Handle scroll event
                var EventHandler = $famous['famous/core/EventHandler'];
                scope.myscrollEventHandler = new EventHandler();
                // Generate data for list
                scope.list = [];
                for(var i = 0; i < 50; i++) {
                    scope.list.push( 
                        {content: ("item "+(i+1)), 
                         color: "'hsl(" + (i * 360 / 8) + ", 60%, 50%)'"}
                         )
                }

            }
        };
    })