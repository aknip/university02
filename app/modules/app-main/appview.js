'use strict';

angular.module('famousApp')

    .controller('appviewCtrl', function ($scope, $famous, $state, appOptions, appData, menuData) {
        var View = $famous['famous/core/View'];
        var Modifier = $famous['famous/core/Modifier'];
        var Surface = $famous['famous/core/Surface'];
        var Transform = $famous['famous/core/Transform'];
        var Transitionable = $famous['famous/transitions/Transitionable'];
        var Easing = $famous['famous/transitions/Easing'];
        var EventHandler = $famous['famous/core/EventHandler'];
        var Engine = $famous['famous/core/Engine'];

        $scope.appOptions = appOptions;

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

        $scope.sideNavElements = menuData;

        $scope.navigateMainMenu = function (navigateTo) {
            $state.go("app.navid", {navid: navigateTo});
            //window.location = "http://localhost:9000/#/app/list/";

        };




        // Positioning of detailview
        $scope.animateDetail = new Transitionable([35,600,5]);


        // TEST

        $scope.menu3 = new Transitionable([0,600,2]);
        $scope.menu4 = new Transitionable([0,600,2]);

        // TEST END


        // Animation of detailview


        $scope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {

                $scope.detailID = toParams.detail;

                console.log(toParams);

                if (toParams.detail > 0) {
                    $scope.animateDetail.set([35, 80, 5], {duration: 1000, curve: Easing.outElastic});
                } else {
                    $scope.animateDetail.set([35, 600, 5], {duration: 300, curve: Easing.inOutQuad});
                }

                // move back sidenav to left
                $scope.sideTransitionable1.set([0, 0, 0], {duration: 200, curve: 'easeInOut'});
                $scope.sideTransitionable3.set([0, -Math.PI/2.5, 0], {duration: 200, curve: 'easeInOut'});

                // animate to screen

                switch (toParams.navid) {
                    case "1":
                        $scope.menu3.set(
                            [0, 600, 1],
                            {duration: 300, curve: Easing.inOutQuad}, function() {
                                $scope.menu4.set(
                                    [0, 0, 1],
                                    {duration: 1000, curve: Easing.outElastic}
                                );
                            }
                        );

                        break;

                    case "2":
                        $scope.menu4.set(
                            [0, 600, 1],
                            {duration: 300, curve: Easing.inOutQuad}, function() {
                                $scope.menu3.set(
                                    [0, 0, 1],
                                    {duration: 1000, curve: Easing.outElastic}
                                );
                            }
                        );

                        break;

                    default:
                        $scope.menu3.set(
                            [0, 600, 2],
                            {duration: 300, curve: Easing.inOutQuad}
                        );
                        $scope.menu4.set(
                            [0, 600, 2],
                            {duration: 300, curve: Easing.inOutQuad}
                        );
                }



                // Prevent this state from completing
                // evt.preventDefault();

            });


    });





