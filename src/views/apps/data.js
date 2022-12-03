const chatData = [
    {
        id: 1,
        image: require('@/assets/images/users/avatar-2.jpg'),
        name: 'Laura Van Zyl',
        message: 'Hey! there I\'m available',
        time: '',
        color: 'secondary'  
    },
    {
        id: 2,
        image: require('@/assets/images/users/avatar-3.jpg'),
        name: 'Alex Raubitschek',
        message: 'I\'ve finished it! See you so',
        time: '5',
        color: 'success'
    },
    {
        id: 3,
        name: 'Keith Gonzales',
        message: 'This theme is awesome!',
        time: '2',
        color: 'success'
    },
    {
        id: 4,
        image: require('@/assets/images/users/avatar-5.jpg'),
        name: 'Jo Vickery',
        message: 'Nice to meet you',
        time: '',
        color: 'warning'
    },
    {
        id: 5,
        name: 'Mitchel Givens',
        message: 'Hey! there I\'m available',
        time: '',
        color: 'secondary'
    },
    {
        id: 6,
        image: require('@/assets/images/users/avatar-4.jpg'),
        name: 'Stevie Hadley',
        message: 'I\'ve finished it! See you so',
        time: '7',
        color: 'success'
    },
    {
        id: 7,
        image: require('@/assets/images/users/avatar-6.jpg'),
        name: 'Leord Joseph',
        message: 'This theme is awesome!',
        time: '',
        color: 'success'
    },
];

const chatMessagesData = [
    {
        name: 'Laura Van Zyl',
        message: 'Hello!',
        time: '10:00'
    },
    {
        align: 'right',
        name: 'Henry Wells',
        message: 'Hi, How are you? What about our next meeting?',
        time: '10:02'
    },
    {
        name: 'Laura Van Zyl',
        message: 'Yeah everything is fine',
        time: '10:06'
    },
    {
        name: 'Laura Van Zyl',
        message: '& Next meeting tomorrow 10.00AM',
        time: '10:06'
    },
    {
        align: 'right',
        name: 'Henry Wells',
        message: 'Wow that\'s great',
        time: '10:07'
    }
];

export { chatData, chatMessagesData };