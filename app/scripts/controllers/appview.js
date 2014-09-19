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
                // calc positions of category boxes
                var y = 0;
                for(var i = 0; i < j; i++) {
                    y = y + $scope.list[i].entries.length*(appOptions.listview.listItemHeight + appOptions.listview.listItemMargin );
                }
                y = appOptions.listview.margins[0] + y + (j * (appOptions.listview.catItemHeight + appOptions.listview.catItemMargin + appOptions.listview.catBoxMargin));
                //$scope.list[j].initialPos = [appOptions.listview.margins[3],y];
                $scope.list[j].initialPos = [appOptions.listview.margins[3],y];

                // calc size of category boxes
                y = appOptions.listview.catItemHeight + appOptions.listview.catItemMargin ;
                y = y + ($scope.list[j].entries.length)*(appOptions.listview.listItemHeight + appOptions.listview.listItemMargin );
                $scope.list[j].initialSize = [appOptions.appSize[0]-appOptions.listview.margins[1]-appOptions.listview.margins[3], y ];

                // loop through all entries
                for ( var k = 0; k < $scope.list[j].entries.length; k++) {
                    // calc positions of item boxes
                    y = 0;
                    for(var l = 0; l < j; l++) {
                        y = y + $scope.list[l].entries.length*(appOptions.listview.listItemHeight + appOptions.listview.listItemMargin );
                    }
                    y = appOptions.listview.margins[0] + y + (j * appOptions.listview.catBoxMargin) + ((j+1) * (appOptions.listview.catItemHeight + appOptions.listview.catItemMargin)) + (k * (appOptions.listview.listItemHeight + appOptions.listview.listItemMargin )) ;
                    $scope.list[j].entries[k].initialPos = [appOptions.listview.margins[3],y];

                    // calc of item boxes
                    y = appOptions.listview.listItemHeight;
                    $scope.list[j].entries[k].initialSize = [appOptions.appSize[0]-appOptions.listview.margins[1]-appOptions.listview.margins[3], y ];

                }

            }

            // create transitionables
            for(var i = 0; i < $scope.list.length; i++){
                // category transitionables
                $scope.list[i].transitPos = new Transitionable($scope.list[i].initialPos);
                $scope.list[i].transitSize = new Transitionable($scope.list[i].initialSize);
                // item transitionables
                for(var j = 0; j < $scope.list[i].entries.length; j++){
                    $scope.list[i].entries[j].transitPos = new Transitionable($scope.list[i].entries[j].initialPos);
                    $scope.list[i].entries[j].transitSize = new Transitionable($scope.list[i].entries[j].initialSize);
                }
            }
        };

        // Execute calculations
        $scope.calcListPositions();



        // Parallax event management
        $scope.myflag = false;
        $scope.scrollPos = 0;
        Engine.on('prerender',function(){
            var _scrollView = undefined;
            _scrollView = _scrollView || $famous.find('#scrollview-1')[0].renderNode;
            if(_scrollView && _scrollView._node){
                if ($scope.myflag==false) {
                    // this is called just for one time
                    $scope.myflag=true;
                    _scrollView.sync.on('update',function(e){
                        $scope.scrollPos = (_scrollView._node.index*100 + + _scrollView.getPosition());
                    });
                }
            }
        });

        // Parallax scrolling for NavSubheader
        $scope.getNavSubheaderPos = function () {
            return [0, -1 - $scope.scrollPos/3 ,1]
        };


        var sumArrays = function(array1, array2) {
            var result=[];
            for(var i = 0; i < array1.length; i++){
                result.push(array1[i] + array2[i]);
            }
            return result;
        } ;


        //
        // Animation for detail expand
        //
        $scope.testListAnimation = function(catIndex, entryIndex) {

            if ($scope.list[catIndex].entries[entryIndex].status == 'closed') {

                $scope.list[catIndex].entries[entryIndex].status = 'open';

                var spread = 100;

                // move everything above up
                for(var i = 0; i < catIndex; i++){
                    // move categories
                    $scope.list[i].transitPos.set(
                        sumArrays($scope.list[i].transitPos.get(), [0,-spread]),
                        {duration: 1000, curve: Easing.outElastic}
                    );
                    // move items
                    for(var j = 0; j < $scope.list[i].entries.length; j++){
                        $scope.list[i].entries[j].transitPos.set(
                            sumArrays($scope.list[i].entries[j].transitPos.get(), [0,-spread]),
                            {duration: 1000, curve: Easing.outElastic}
                        );
                    }
                }


                // move items inside selected category
                // move category
                $scope.list[catIndex].transitPos.set(
                    sumArrays($scope.list[i].transitPos.get(), [0,-spread]),
                    {duration: 1000, curve: Easing.outElastic}
                );
                // move items above up
                for(var j = 0; j < entryIndex; j++){
                    $scope.list[catIndex].entries[j].transitPos.set(
                        sumArrays($scope.list[catIndex].entries[j].transitPos.get(), [0,-spread]),
                        {duration: 1000, curve: Easing.outElastic}
                    );
                }
                // move items below down
                for(var j = (entryIndex+1); j < $scope.list[catIndex].entries.length; j++){
                    $scope.list[catIndex].entries[j].transitPos.set(
                        sumArrays($scope.list[catIndex].entries[j].transitPos.get(), [0,+spread]),
                        {duration: 1000, curve: Easing.outElastic}
                    );
                }
                // change size of category box
                $scope.list[catIndex].transitSize.set(
                    sumArrays($scope.list[catIndex].transitSize.get(), [0,2*spread]),
                    {duration: 1000, curve: Easing.outElastic}
                );
                // move detail box up & left
                $scope.list[catIndex].entries[entryIndex].transitPos.set(
                    sumArrays($scope.list[catIndex].entries[entryIndex].transitPos.get(), [-15,-spread]),
                    {duration: 1000, curve: Easing.outElastic}
                );

                // change size of detail box
                $scope.list[catIndex].entries[entryIndex].transitSize.set(
                    sumArrays($scope.list[catIndex].entries[entryIndex].transitSize.get(), [30,2*spread]),
                    {duration: 1000, curve: Easing.outElastic}
                );



                // move everything below down
                for(var i = (catIndex+1); i <= $scope.list.length; i++){
                    // move categories
                    $scope.list[i].transitPos.set(
                        sumArrays($scope.list[i].transitPos.get(), [0,+spread]),
                        {duration: 1000, curve: Easing.outElastic}
                    );
                    // move items
                    for(var j = 0; j < $scope.list[i].entries.length; j++){
                        $scope.list[i].entries[j].transitPos.set(
                            sumArrays($scope.list[i].entries[j].transitPos.get(), [0,+spread]),
                            {duration: 1000, curve: Easing.outElastic}
                        );
                    }
                }

            }

            else {
                // Close everything
                $scope.list[catIndex].entries[entryIndex].status = 'closed';
                //
                for(var i = 0; i < $scope.list.length; i++){
                    // category transitionables
                    $scope.list[i].transitPos.set(
                        $scope.list[i].initialPos,
                        {duration: 1000, curve: Easing.outElastic}
                    );
                    $scope.list[i].transitSize.set(
                        $scope.list[i].initialSize,
                        {duration: 1000, curve: Easing.outElastic}
                    );
                    // item transitionables
                    for(var j = 0; j < $scope.list[i].entries.length; j++){
                        $scope.list[i].entries[j].transitPos.set(
                            $scope.list[i].entries[j].initialPos,
                            {duration: 1000, curve: Easing.outElastic}
                        );
                        $scope.list[i].entries[j].transitSize.set(
                            $scope.list[i].entries[j].initialSize,
                            {duration: 1000, curve: Easing.outElastic}
                        );
                    }
                }
            }

        };


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
        $scope.animateDetail = new Transitionable([35,600,5]);


        // Animation of detailview
        $scope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {

                $scope.detailID = toParams.detail;

                if (toParams.detail > 0) {
                    $scope.animateDetail.set([35, 80, 5], {duration: 1000, curve: Easing.outElastic});
                } else {
                    $scope.animateDetail.set([35, 600, 5], {duration: 300, curve: Easing.inOutQuad});
                }

                // Prevent this state from completing
                // evt.preventDefault();

        });

    });


