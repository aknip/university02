'use strict';

angular.module('famousApp')
    .factory('appOptions', function () {
        // remember: factory returns Singleton !
        var configObject = {
            appSize: [window.innerWidth, window.innerHeight],
            device: 'none',
            deviceSizes: {
                iPhone: {screenSize: [320, 568]},
                none: {screenSize: [window.innerWidth, window.innerHeight]}
            },
            listview: {
                margins: [50, 20, 0, 20],
                catItemHeight: 30,
                catItemMargin: 15,
                catBoxMargin: 10,
                listItemHeight: 50,
                listItemMargin: 24
            }
        };
        return configObject;
    })

    .factory('menuData', function () {
        // remember: factory returns Singleton !!
        var menuObject = [
            {
                iconclass: 'icon-layers',
                bgcolor: 'rgba(77, 89, 102, 1)',
                navID: '1'
            },
            {
                iconclass: 'icon-star-2',
                bgcolor: 'rgba(245, 132, 133, 1)',
                navID: '2'
            },
            {
                iconclass: 'icon-plane-paper-1',
                bgcolor: 'rgba(254, 197, 130, 1)'
            },
            {
                iconclass: 'icon-cloud-download',
                bgcolor: 'rgba(202, 152, 236, 1)'
            },
            {
                iconclass: 'icon-delete-2-1',
                bgcolor: 'rgba(69, 227, 189, 1)'
            },
            {
                iconclass: 'icon-setting-gears-2',
                bgcolor: 'rgba(63, 71, 81, 1)'
            }
        ];
        return menuObject;
    });
