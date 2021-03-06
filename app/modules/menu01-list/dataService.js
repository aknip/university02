'use strict';

angular.module('famousApp')

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
                            title: 'Titel zu Eintrag 1.1',
                            content: 'Content mit einem etwas längeren Text, der auch dann...',
                            img: 'listitem-01.jpg',
                            date: '17.09.14',
                            initialPos: [undefined, undefined],
                            initialSize: [undefined, undefined],
                            transitPos: undefined,
                            transitSize: undefined,
                            status: 'closed'
                        },
                        {
                            id: '12',
                            title: 'Überschrift Eintrag 1.2',
                            content: 'Content mit einem etwas längeren Text, der auch dann...',
                            img: 'listitem-02.jpg',
                            date: '14.09.14',
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
                            title: 'Headline zu Eintrag 2.1',
                            content: 'Content mit einem etwas längeren Text, der auch dann...',
                            img: 'listitem-cat.jpg',
                            date: '04.09.14',
                            initialPos: [undefined, undefined],
                            initialSize: [undefined, undefined],
                            transitPos: undefined,
                            transitSize: undefined,
                            status: 'closed'
                        },
                        {
                            id: '2.2',
                            title: 'Überschrift Eintrag 2.2',
                            content: 'Content mit einem etwas längeren Text, der auch dann...',
                            img: 'listitem-03.jpg',
                            date: '14.09.14',
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
                            title: 'Titel zu Eintrag 3.1',
                            content: 'Content mit einem etwas längeren Text, der auch dann...',
                            img: 'listitem-04.jpg',
                            date: '14.09.14',
                            initialPos: [undefined, undefined],
                            initialSize: [undefined, undefined],
                            transitPos: undefined,
                            transitSize: undefined,
                            status: 'closed'
                        },
                        {
                            id: '32',
                            title: 'Überschrift Eintrag 3.2',
                            content: 'Content mit einem etwas längeren Text, der auch dann...',
                            img: 'listitem-05.jpg',
                            date: '14.09.14',
                            initialPos: [undefined, undefined],
                            initialSize: [undefined, undefined],
                            transitPos: undefined,
                            transitSize: undefined,
                            status: 'closed'
                        },
                        {
                            id: '33',
                            title: 'Headline zu Eintrag 3.3',
                            content: 'Content mit einem etwas längeren Text, der auch dann...',
                            img: 'listitem-06.jpg',
                            date: '14.09.14',
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
                            title: 'Überschrift Eintrag 4.1',
                            content: 'Content mit einem etwas längeren Text, der auch dann...',
                            img: 'listitem-07.jpg',
                            date: '14.09.14',
                            initialPos: [undefined, undefined],
                            initialSize: [undefined, undefined],
                            transitPos: undefined,
                            transitSize: undefined,
                            status: 'closed'
                        },
                        {
                            id: '42',
                            title: 'Überschrift Eintrag 4.2',
                            content: 'Content mit einem etwas längeren Text, der auch dann...',
                            img: 'listitem-08.jpg',
                            date: '14.09.14',
                            initialPos: [undefined, undefined],
                            initialSize: [undefined, undefined],
                            transitPos: undefined,
                            transitSize: undefined,
                            status: 'closed'
                        },
                        {
                            id: '43',
                            title: 'Titel Eintrag 4.3',
                            content: 'Content mit einem etwas längeren Text, der auch dann...',
                            img: 'listitem-02.jpg',
                            date: '14.09.14',
                            initialPos: [undefined, undefined],
                            initialSize: [undefined, undefined],
                            transitPos: undefined,
                            transitSize: undefined,
                            status: 'closed'
                        },
                        {
                            id: '44',
                            title: 'Headline für Eintrag 4.4',
                            content: 'Content mit einem etwas längeren Text, der auch dann...',
                            img: 'listitem-01.jpg',
                            date: '14.09.14',
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