'use strict';

module.exports = function (checksum, fps, duration) {

    return new Promise(function (fulfill, reject) {

        let ffmpeg = require('fluent-ffmpeg');

        ffmpeg()
            .addInput('./capture/' + checksum + '/frame-%010d.jpg')
            .output('./tmp/lapse.mp4')
            .inputFps(fps)
            .on('end', function () {
                fulfill();
            })
            .run();

    });
};