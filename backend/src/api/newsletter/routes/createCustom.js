module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/createCustom',
            handler: 'newsletter.customCreateAction',
            config: {
                auth: false,
            },
            /*headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },*/
        }
    ]
}