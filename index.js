(function () {
    'use strict';

    let timelapse = require('./src/timelapse'),
        express = require('express'),
        consolidate = require('consolidate'),
        lowdb = require('lowdb'),
        db = lowdb('db.json', {
            async: false
        }),
        app = express(),
        bodyParser = require('body-parser'),
        crypto = require('crypto'),
        runJobs = require('./src/jobs'),
        server,
        checksum;

    checksum = function (str) {
        return crypto
                    .createHash('sha1')
                    .update(str, 'utf-8')
                    .digest('hex');
    };

    app.engine('html', consolidate.underscore);
    app.set('view engine', 'html');
    app.set('views', './src/views');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.static('./public'));

    app.get('/', function (req, res) {
        res.render('index', {
            captures: db('captures').cloneDeep()
        });
    });

    app.post(/^\/timelapse\/(.*)$/, function (req, res) {
        let checksum = req.params[0],
            fs = require('fs'),
            fps = parseFloat(req.body.fps || 26);

        timelapse(checksum, fps).then(function () {
            let file = './tmp/lapse.mp4',
                stream = fs.createReadStream(file);

            res.setHeader('Content-disposition', 'attachment; filename=timelapse.mp4');
            res.setHeader('Content-type', 'video/mp4');

            stream.pipe(res);
        });
    });

    app.post('/add', function (req, res) {
        let name = req.body.name,
            url = req.body.url,
            time = req.body.time;

        db('captures').push({
            name: name,
            url: url,
            checksum: checksum(name + url),
            hour: time
        });

        runJobs();

        res.redirect('/');
    });

    server = app.listen(process.env.EXPRESS_PORT || 3000, function () {
        runJobs();
    });

}());