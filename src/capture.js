'use strict';

module.exports = function (url) {

    let fs = require('fs'),
        http = require('http'),
        file = fs.createWriteStream('./capture/' + Date.now() + '.jpg');

    http.get(url, function (res) {
        res.on('data', function (data) {
            file.write(data);
        }).on('end', function () {
            file.end();
        });
    });

}