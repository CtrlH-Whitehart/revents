export const sampleData = [
    {
        id: '1',
        title: 'Trip to Empire State building',
        date: new Date('2018-03-21'),
        category: 'culture',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
        city: 'NY, USA',
        venue: 'Empire State Building, 5th Avenue, New York, NY, USA',
        hostedBy: 'Bob',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
        attendees: [
            {
                id: 'a',
                displayName: 'Bob',
                photoURL: 'https://randomuser.me/api/portraits/men/30.jpg'
            },
            {
                id: 'b',
                displayName: 'Tom',
                photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
            }
        ]
    },
    {
        id: '2',
        title: 'Trip to Punch and Judy Pub',
        date: new Date('2018-03-18'),
        category: 'drinks',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
        city: 'London, UK',
        venue: 'Punch & Judy, Henrietta Street, London, UK',
        hostedBy: 'Tom',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
        attendees: [
            {
                id: 'a',
                displayName: 'Bob',
                photoURL: 'https://randomuser.me/api/portraits/men/18.jpg'
            },
            {
                id: 'b',
                displayName: 'Tom',
                photoURL: 'https://randomuser.me/api/portraits/men/14.jpg'
            },
            {
                id: 'c',
                displayName: 'Reggie',
                photoURL: 'https://randomuser.me/api/portraits/men/5.jpg'
            }
        ]
    }
];
