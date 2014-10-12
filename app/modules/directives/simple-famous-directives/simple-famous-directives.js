'use strict';

angular.module('famousApp')
    .directive('transformDirective', function($famous, $compile, appOptions) {

        var Transform       = $famous["famous/core/Transform"];
        var Transitionable  = $famous["famous/transitions/Transitionable"];

        return {
            replace : true,
            scope : false,
            restrict: 'A',
            link: function($scope, $element, $attr) {
                $scope.transform = new Transitionable(
                    Transform.multiply(
                        Transform.translate(150, 100, 0),
                        Transform.rotateZ(Math.PI / 4)
                    ));

                $scope.opacity = new Transitionable(0.5);

            }
        }
    })

    // Full Famo.us directive, based on <fa-view> : https://github.com/Famous/famous-angular/blob/master/src/scripts/directives/fa-view.js

    .directive('renderableDirective', function ($famous, $famousDecorator) {
        return {
            template: '<div></div>',
            transclude: true,
            scope: true,
            restrict: 'EA',
            compile: function(tElement, tAttrs, transclude){

                var View = $famous['famous/core/View'];
                var Surface = $famous['famous/core/Surface'];
                var Transform       = $famous["famous/core/Transform"];
                var StateModifier = $famous["famous/modifiers/StateModifier"];

                return {
                    pre: function(scope, element, attrs){
                        // pre: executed before child elements are linked
                        // NOT safe to do DOM transformations here

                        // start Famo.us vanilla code here...
                        // 'view' will be attached to the directive

                        var view = new View({
                            // read attribute fa-size !
                            size: scope.$eval(attrs.faSize) || [undefined, undefined]
                        });

                        var surface = new Surface({
                            size : [100, 100],
                            properties : {background : 'green'}
                        });


                        var stateModifier = new StateModifier({
                            transform: Transform.multiply(
                                Transform.translate(150, 280, 0),
                                Transform.rotateZ(Math.PI / 4)
                            )
                        });

                        view
                            .add(stateModifier)
                            .add(surface);

                        // end of Famo.us vanilla code

                        // $famousDecorator:
                        // http://famo.us/integrations/angular/docs/unstable/api/service/$famousDecorator/index.html
                        //
                        // .ensureIsolate() checks the passed in scope for an existing isolate property.
                        // If scope.isolate does not already exist, create it.
                        var isolate = $famousDecorator.ensureIsolate(scope);

                        isolate.children = [];

                        isolate.renderNode = view;
                        $famousDecorator.addRole('renderable',isolate);

                        isolate.show();

                        // Attach a listener for registerChild events.
                        $famousDecorator.sequenceWith(scope, function(data) {
                            isolate.renderNode.add(data.renderGate);
                            isolate.children.push(data);
                        });

                    },
                    post: function(scope, element, attrs){
                        // post: executed after the child elements are linked
                        // IS safe to do DOM transformations here

                        var isolate = $famousDecorator.ensureIsolate(scope);

                        transclude(scope, function(clone) {
                            element.find('div').append(clone);
                        });

                        // Register a child isolate's renderNode to the nearest parent that can sequence it,
                        // and set up an event listener to remove it when the associated element is destroyed by Angular.
                        $famousDecorator.registerChild(scope, element, isolate);
                    }
                };
            }
        };
    });

// whats transclude
