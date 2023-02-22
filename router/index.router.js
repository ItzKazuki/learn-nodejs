module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.get('/api', (req, res) => {
        res.send('it\'s work!, run at port: ' + req.app.settings.port);
        // res.json({
        //     code: 200,
        //     message: 'This API worked!'
        // });
    });

    
};