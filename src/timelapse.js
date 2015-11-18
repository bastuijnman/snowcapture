'use strict';

module.exports = function (checksum, fps, duration) {

    let fs = require('fs'),
        ffmpeg = require('fluent-ffmpeg');

    return new Promise(function (fulfill, reject) {
        fs.stat('./tmp', function (err, stat) {

            if (!stat || !stat.isDirectory()) {
                fs.mkdirSync('./tmp');
            }

            ffmpeg()
                .addInput('./capture/' + checksum + '/frame-%010d.jpg')
                .output('./tmp/lapse.mp4')
                .inputFps(fps)
                .on('end', function () {
                    fulfill();
                })
                .run();

        });

    });
};