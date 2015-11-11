'use strict';

module.exports = function () {

    let ffmpeg = require('fluent-ffmpeg');

    ffmpeg()
        .addInput('./capture/*.jpg')
        .output('./tmp/lapse.mp4');

};