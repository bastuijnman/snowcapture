'use strict';

let fs = require('fs'),
    getMaxFrameNumber,
    getPaddedNumber;

getMaxFrameNumber = function (dir) {
    return new Promise(function (fulfill, reject) {
        fs.readdir(dir, function (err, files) {
            if (err !== null) {
                reject(err);
            } else {
                files = files.map(function (item) {
                    return parseInt(
                        item
                            .replace('frame-', '')
                            .replace('.jpg', '')
                    );
                });

                fulfill(Math.max.apply(null, [0].concat(files)) + 1);
            }
        })
    });
};

getPaddedNumber = function (number, size) {
    let str = number + '';
    while (str.length < size) {
        str = '0' + str;
    }
    return str;
};

module.exports = function (url, path) {

    let dir = './capture/' + path,
        http = require('http'),
        file;

    fs.mkdirSync('./capture');
    fs.stat('./capture/' + path, function (err, stat) {
        if (!stat || !stat.isDirectory()) {
            fs.mkdirSync('./capture/' + path);
        }
        getMaxFrameNumber(dir).then(function (num) {
            num = getPaddedNumber(num, 10);
            file = fs.createWriteStream(dir + '/frame-' + num + '.jpg');
            http.get(url, function (res) {
                res.on('data', function (data) {
                    file.write(data);
                }).on('end', function () {
                    file.end();
                });
            });
        });
    });

}