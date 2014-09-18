'use strict';

angular.module('famousApp')
    .controller('appview', function ($scope, $famous, $state, appOptions, appData, menuData) {
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


        // Handle scroll event
        $scope.myscrollEventHandler = new EventHandler();
        Engine.pipe($scope.myscrollEventHandler);



        // Generate data for scroll-list

        $scope.list = appData;

        // Calculate all initial positions and sizes of the list items
        // and update list model
        $scope.calcListPositions = function () {
            for(var j = 0; j < $scope.list.length; j++) {
                var y, i, j, k, l;
                // calc positions of category boxes
                y = 0;
                for(i = 0; i < j; i++) {
                    y = y + $scope.list[i].entries.length*(appOptions.listview.listItemHeight + appOptions.listview.listItemMargin );
                }
                y = appOptions.listview.margins[0] + y + (j * (appOptions.listview.catItemHeight + appOptions.listview.catItemMargin + appOptions.listview.catBoxMargin));
                $scope.list[j].initialPos = [appOptions.listview.margins[3],y];

                // calc size of category boxes
                y = appOptions.listview.catItemHeight + appOptions.listview.catItemMargin ;
                y = y + ($scope.list[j].entries.length)*(appOptions.listview.listItemHeight + appOptions.listview.listItemMargin );
                $scope.list[j].initialSize = [appOptions.appSize[0]-appOptions.listview.margins[1]-appOptions.listview.margins[3], y ];

                // loop through all entries
                for ( k = 0; k < $scope.list[j].entries.length; k++) {
                    // calc positions of item boxes
                    y = 0;
                    for(var l = 0; l < j; l++) {
                        y = y + $scope.list[l].entries.length*(appOptions.listview.listItemHeight + appOptions.listview.listItemMargin );
                    }
                    y = appOptions.listview.margins[0] + y + (j * appOptions.listview.catBoxMargin) + ((j+1) * (appOptions.listview.catItemHeight + appOptions.listview.catItemMargin)) + (k * (appOptions.listview.listItemHeight + appOptions.listview.listItemMargin )) ;
                    $scope.list[j].entries[k].initialPos = [appOptions.listview.margins[3],y];

                    // calc of item boxes
                    y = appOptions.listview.listItemHeight;
                    $scope.list[j].entries[k].initialSize =  [appOptions.appSize[0]-appOptions.listview.margins[1]-appOptions.listview.margins[3], y ];

                }

            }
        };

        // Execute calculations
        $scope.calcListPositions();

        // Helper functions to get positions and sizes
        $scope.getCategoryBoxPos = function (catindex) {
            return $scope.list[catindex].initialPos;
        };

        $scope.getItemBoxPos = function (catindex, itemindex) {
            return $scope.list[catindex].entries[itemindex].initialPos;
        };

        $scope.getCategoryBoxSize = function (catindex) {
            return $scope.list[catindex].initialSize;
        };

        $scope.getItemBoxSize = function (catindex, itemindex) {
            return $scope.list[catindex].entries[itemindex].initialSize;
        };

        $scope.getNavSubheaderPos = function () {
            return [0, -1 - $scope.scrollPos/3 ,1]
        }


        $scope.scrollPos = 0;
        // Parallax
        $scope.myflag = false;
        Engine.on('prerender',function(){
            var _scrollView = undefined;
            _scrollView = _scrollView || $famous.find('#scrollview-1')[0].renderNode;
            if(_scrollView && _scrollView._node){
                if ($scope.myflag==false) {
                    $scope.myflag=true;
                    console.log("one time, baby!");
                    _scrollView.sync.on('update',function(e){
                        $scope.scrollPos = (_scrollView._node.index*100 + + _scrollView.getPosition());
                    });
                }
            }
        });


        // Resizing
        Engine.on('resize',function(){
            // Update app-size - only for fullsize device!
            if (appOptions.device=="none") {
                appOptions.appSize = [window.innerWidth, window.innerHeight];

                // Without $apply Famo.us doesn't recognize the change
                // Remember: appOptions is a factory (=singleton)
                // - this means that appOptions and $scope.appOptions are the SAME object!
                // - this is why the new .appWidth value is automatically available in the scope!
                $scope.$apply();

                // Execute calculations
                $scope.calcListPositions();
            }

        });





        //
        // popup detail card
        //

        $scope.navigateToDetail = function (detailID) {
            $state.go('app.list.detail', {detail: detailID})
        };

        $scope.navigateToList = function () {
            $state.go('app.list.detail', {detail: 0})
        };


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


