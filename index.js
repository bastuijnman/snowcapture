(function () {
    'use strict';

    let capture = require('./src/capture'),
        timelapse = require('./src/timelapse'),
        express = require('express'),
        consolidate = require('consolidate'),
        lowdb = require('lowdb'),
        db = lowdb('./db.json'),
        app = express(),
        server;

    app.engine('html', consolidate.underscore);
    app.set('view engine', 'html');
    app.set('views', './src/views');

    app.use(express.static('./public'));

    app.get('/', function (req, res) {
        res.render('index', {
            captures: []
        });
    });

    server = app.listen(3000, function () {

        console.log('Running server');

    });

}());