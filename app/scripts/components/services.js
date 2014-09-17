'use strict';

angular.module('famousApp')
    .factory('appOptions', function(){
        // remember: factory returns Singleton !
        var configObject = {
            appSize : [window.innerWidth,window.innerHeight],
            device: 'none',
            deviceSizes: {
                iPhone: {screenSize : [320,568]},
                none: {screenSize : [window.innerWidth,window.innerHeight]}
            }
        };
        return configObject;
    });