'use strict';

angular.module('famousApp')
    .controller('appview', function ($scope, $famous, $state, appOptions) {
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
        $scope.myscrollEventHandler = new EventHandler();
        Engine.pipe($scope.myscrollEventHandler);


        // 3 ways to use scrollview-based animation:


        // use modifier with attribute, eg. opacity
        var _height = 60;
        var _scrollView = undefined;
        $scope.itemOpacity = function(item){
            _scrollView = _scrollView || $famous.find('#scrollview-1')[0].renderNode;
            if(_scrollView && _scrollView._node){
                var page = _scrollView._node.index;
                var absPosition = _height * page + _scrollView.getPosition();
                var heightRange = 550;
                var heightOffset = 0;
                var result = 0;

                result = (item.id*_height - absPosition - heightOffset);
                result = Math.max(Math.min(result, heightRange), -heightRange);
                result = 1-Math.abs(result/heightRange);
                //$scope.list[item.id].content = "item "+ (item.id) + ": " + result;

                return result;
            } else
                return 0;
        };

        $scope.itemPosition = function(item){
            _scrollView = _scrollView || $famous.find('#scrollview-1')[0].renderNode;
            if(_scrollView && _scrollView._node){
                var page = _scrollView._node.index;
                var absPosition = _height * page + _scrollView.getPosition();
                var heightRange = 100;
                var heightOffset = 200;
                var result = 0;

                result = (item.id*_height - absPosition - heightOffset);
                result = Math.max(Math.min(result, heightRange), -heightRange);
                result = (1-Math.abs(result/heightRange))*10;
                //$scope.list[item.id].content = "item "+ (item.id) + ": " + result;

                return [result,0];
            } else
                return [50,0];
        };



        // use scrollview.sync - activated by Engine (strange hack?)
        $scope.myflag = false;
        Engine.on('prerender',function(){
            var _scrollView = undefined;
            _scrollView = _scrollView || $famous.find('#scrollview-1')[0].renderNode;
            if(_scrollView && _scrollView._node){
                if ($scope.myflag==false) {
                    $scope.myflag=true;


                    _scrollView.sync.on('update',function(e){
                        // $apply to show values in list..
                        // $scope.$apply();
                        //console.log(_scrollView._node.index);
                        //console.log(_scrollView._node.index*100 + + _scrollView.getPosition());
                    });
                }
            }

        });

        Engine.on('resize',function(){
            // Update app-size - only for fullsize device!
            if (appOptions.device=="none") {
                appOptions.appSize = [window.innerWidth, window.innerHeight];
            }
            // Without $apply Famo.us doesn't recognize the change
            // Remember: appOptions is a factory (=singleton)
            // - this means that appOptions and $scope.appOptions are the SAME object!
            // - this is why the new .appWidth value is automatically available in the scope!
            $scope.$apply();

        });





        // Generate data for scroll-list
        $scope.list = [];
        for(var i = 0; i < 50; i++) {
            $scope.list.push(
                {   id: (i),
                    content: ("item "+(i)),
                    color: "'hsl(" + (i * 360 / 8) + ", 60%, 50%)'",
                    width: 200,
                    animateEnterScale: new Transitionable([1,1,1])
                }
            )
        }


        $scope.addItem = function (detailID) {

            i = $scope.list.length;
            $scope.list.push(
                {   id: (i),
                    content: ("item "+(i)),
                    color: "'hsl(" + (i * 360 / 8) + ", 60%, 50%)'",
                    width: 200,
                    animateEnterScale: new Transitionable([1,1,1])
                }
            )

        }

        $scope.enterItem = function(item, $done) {
            console.log("ENTER!");
            item.animateEnterScale.set([0.001,0.001,0.001]);
            item.animateEnterScale.set([1,1,1], {duration:1000, curve:"easeOut"}, $done);

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


