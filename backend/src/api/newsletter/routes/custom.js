module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/custom',
            handler: 'newsletter.customAction',
            config: {
                auth: false,
            }
        }
    ]
}