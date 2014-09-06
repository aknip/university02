'use strict';

angular.module('famousApp')
    .controller('homeview', function ($scope, $famous) {
        var View = $famous['famous/core/View'];
        var Modifier = $famous['famous/core/Modifier'];
        var Surface = $famous['famous/core/Surface'];
        var Transform = $famous['famous/core/Transform'];
        var Transitionable = $famous['famous/transitions/Transitionable'];

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

        }

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
        ]




    });