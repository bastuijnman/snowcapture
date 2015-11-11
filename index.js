(function () {
    'use strict';

    let fs = require('fs'),
        http = require('http'),
        url = 'http://portal.live-panorama.com/webcam_schmitten_schmitten2_hd.jpg',
        file = fs.createWriteStream('./capture/' + Date.now() + '.jpg');

    http.get(url, function (res) {
        res.on('data', function (data) {
            file.write(data);
        }).on('end', function () {
            file.end();
        })
    });

}());