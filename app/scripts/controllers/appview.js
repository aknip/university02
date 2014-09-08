'use strict';

angular.module('famousApp')
    .controller('appview', function ($scope, $famous, $state) {
        var View = $famous['famous/core/View'];
        var Modifier = $famous['famous/core/Modifier'];
        var Surface = $famous['famous/core/Surface'];
        var Transform = $famous['famous/core/Transform'];
        var Transitionable = $famous['famous/transitions/Transitionable'];
        var Easing = $famous['famous/transitions/Easing'];


        // side navigation
        $scope.menuToggleStatus = true;

        $scope.sideTransitionable1 = new Transitionable([0, 0, 0]);

        $scope.sideTransitionable2 = new Transitionable([-50, 0, 1]);

        $scope.sideTransitionable3 = new Transitionable([0, -Math.PI/2.5, 0]);

        $scope.menuToggle = function($event){
            if ($scope.menuToggleStatus)  {
                $scope.sideTransitionable1.set([50, 0, 0], {duration: 500, curve: 'easeInOut'});
                $scope.sideTransitionable3.set([0, 0, 0], {duration: 500, curve: 'easeInOut'});

            } else {
                $scope.sideTransitionable1.set([0, 0, 0], {duration: 500, curve: 'easeInOut'});
                $scope.sideTransitionable3.set([0, -Math.PI/2.5, 0], {duration: 500, curve: 'easeInOut'});
            }
            $scope.menuToggleStatus = ! $scope.menuToggleStatus;

        };

        $scope.sideNavElements = [
            {
                iconclass: 'fa-css3',
                bgcolor: 'rgba(77, 89, 102, 1)'
            },
            {
                iconclass: 'fa-globe',
                bgcolor: 'rgba(245, 132, 133, 1)'
            },
            {
                iconclass: 'fa-cloud-upload',
                bgcolor: 'rgba(254, 197, 130, 1)'
            },
            {
                iconclass: 'fa-dashboard',
                bgcolor: 'rgba(202, 152, 236, 1)'
            },
            {
                iconclass: 'fa-mobile-phone',
                bgcolor: 'rgba(69, 227, 189, 1)'
            },
            {
                iconclass: 'fa-cogs',
                bgcolor: 'rgba(63, 71, 81, 1)'
            }
        ];


        // Handle scroll event
        var EventHandler = $famous['famous/core/EventHandler'];
        $scope.myscrollEventHandler = new EventHandler();


        // Generate data for scroll-list
        $scope.list = [];
        for(var i = 0; i < 50; i++) {
            $scope.list.push(
                {   id: (i+1),
                    content: ("item "+(i+1)),
                    color: "'hsl(" + (i * 360 / 8) + ", 60%, 50%)'"}
            )
        }


        $scope.navigateToDetail = function (detailID) {
            $state.go('app.list.detail', {detail: detailID})
        }

        $scope.navigateToList = function () {
            $state.go('app.list.detail', {detail: 0})
        }


        // Positioning of detailview
        $scope.animateDetail = new Transitionable([20,600,5]);


        // Animation of detailview
        $scope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {

                $scope.detailID = toParams.detail;

                if (toParams.detail > 0) {
                    $scope.animateDetail.set([20, 20, 5], {duration: 1000, curve: Easing.outElastic});
                } else {
                    $scope.animateDetail.set([20, 600, 5], {duration: 300, curve: Easing.inOutQuad});
                }

                // Prevent this state from completing
                // evt.preventDefault();


        });


    });


