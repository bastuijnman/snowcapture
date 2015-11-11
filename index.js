(function () {
    'use strict';

    let capture = require('./src/capture'),
        timelapse = require('./src/timelapse'),
        express = require('express'),
        app = express(),
        server;

    app.use(express.static('./public'));

    app.get('/', function (req, res) {
        capture('http://portal.live-panorama.com/webcam_schmitten_schmitten2_hd.jpg');
        res.send('ok');
    });

    server = app.listen(3000, function () {

        console.log('Running server');

    });

}());