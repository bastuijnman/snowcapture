(function () {
    'use strict';

    let capture = require('./src/capture'),
        timelapse = require('./src/timelapse'),
        express = require('express'),
        app = express(),
        server;

    app.use(express.static('./public'));

    app.get('/', function (req, res) {
        res.sendfile('./src/views/index.html');
    });

    server = app.listen(3000, function () {

        console.log('Running server');

    });

}());