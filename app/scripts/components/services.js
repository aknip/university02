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
                catItemMargin: 5,
                catBoxMargin: 10,
                listItemHeight: 50,
                listItemMargin: 5
            }
        };
        return configObject;
    })

    .factory('menuData', function () {
        // remember: factory returns Singleton !
        var menuObject = [
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
        return menuObject;
    })

    .factory('appData', function () {
        // remember: factory returns Singleton !
        var dataObject = [
                {
                    id: '1',
                    title: "Kategorie 1",
                    category: "cat1",
                    color: "'white'",
                    initialPos: [undefined, undefined],
                    initialSize: [undefined, undefined],
                    transitPos: undefined,
                    transitSize: undefined,
                    entries: [
                        {
                            id: '11',
                            title: 'Eintrag 1.1',
                            color: "'#dfdfdf'",
                            initialPos: [undefined, undefined],
                            initialSize: [undefined, undefined],
                            transitPos: undefined,
                            transitSize: undefined,
                            status: 'closed'
                        },
                        {
                            id: '12',
                            title: 'Eintrag 1.2',
                            color: "'#dfdfdf'",
                            initialPos: [undefined, undefined],
                            initialSize: [undefined, undefined],
                            transitPos: undefined,
                            transitSize: undefined,
                            status: 'closed'
                        }
                    ]
                },
                {
                    id: '2',
                    title: "Kategorie 2",
                    category: "cat2",
                    color: "'white'",
                    entries: [
                        {
                            id: '21',
                            title: 'Eintrag 2.1',
                            color: "'#dfdfdf'",
                            initialPos: [undefined, undefined],
                            initialSize: [undefined, undefined],
                            transitPos: undefined,
                            transitSize: undefined,
                            status: 'closed'
                        },
                        {
                            id: '2.2',
                            title: 'Eintrag 2.2',
                            color: "'#dfdfdf'",
                            initialPos: [undefined, undefined],
                            initialSize: [undefined, undefined],
                            transitPos: undefined,
                            transitSize: undefined,
                            status: 'closed'
                        }
                    ]
                },
                {
                    id: '3',
                    title: "Kategorie 3",
                    category: "cat3",
                    color: "'white'",
                    initialPos: [undefined, undefined],
                    initialSize: [undefined, undefined],
                    entries: [
                        {
                            id: '31',
                            title: 'Eintrag 3.1',
                            color: "'#dfdfdf'",
                            initialPos: [undefined, undefined],
                            initialSize: [undefined, undefined],
                            transitPos: undefined,
                            transitSize: undefined,
                            status: 'closed'
                        },
                        {
                            id: '32',
                            title: 'Eintrag 3.2',
                            color: "'#dfdfdf'",
                            initialPos: [undefined, undefined],
                            initialSize: [undefined, undefined],
                            transitPos: undefined,
                            transitSize: undefined,
                            status: 'closed'
                        },
                        {
                            id: '33',
                            title: 'Eintrag 3.3',
                            color: "'#dfdfdf'",
                            initialPos: [undefined, undefined],
                            initialSize: [undefined, undefined],
                            transitPos: undefined,
                            transitSize: undefined,
                            status: 'closed'
                        }
                    ]
                },
                {
                    id: '4',
                    title: "Kategorie 4",
                    category: "cat4",
                    color: "'white'",
                    initialPos: [undefined, undefined],
                    initialSize: [undefined, undefined],
                    transitPos: undefined,
                    transitSize: undefined,
                    entries: [
                        {
                            id: '41',
                            title: 'Eintrag 4.1',
                            color: "'#dfdfdf'",
                            initialPos: [undefined, undefined],
                            initialSize: [undefined, undefined],
                            transitPos: undefined,
                            transitSize: undefined,
                            status: 'closed'
                        },
                        {
                            id: '42',
                            title: 'Eintrag 4.2',
                            color: "'#dfdfdf'",
                            initialPos: [undefined, undefined],
                            initialSize: [undefined, undefined],
                            transitPos: undefined,
                            transitSize: undefined,
                            status: 'closed'
                        },
                        {
                            id: '43',
                            title: 'Eintrag 4.3',
                            color: "'#dfdfdf'",
                            initialPos: [undefined, undefined],
                            initialSize: [undefined, undefined],
                            transitPos: undefined,
                            transitSize: undefined,
                            status: 'closed'
                        },
                        {
                            id: '44',
                            title: 'Eintrag 4.4',
                            color: "'#dfdfdf'",
                            initialPos: [undefined, undefined],
                            initialSize: [undefined, undefined],
                            transitPos: undefined,
                            transitSize: undefined,
                            status: 'closed'
                        }]
                }
            ];
        return dataObject;
    });