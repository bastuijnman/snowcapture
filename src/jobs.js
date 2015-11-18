'use strict';

module.exports = function () {
    let capture = require('./capture'),
        lowdb = require('lowdb'),
        db = lowdb('db.json'),
        scheduler = require('node-schedule'),
        schedules = db('captures').cloneDeep(),
        max = schedules.length,
        jobs = scheduler.scheduledJobs,
        schedule;

    // Clear out old running jobs
    for (let job in jobs) {
        scheduler.cancelJob(job);
    }

    // Schedule new jobs
    for (let i = 0; i < max; i++) {
        schedule = schedules[i];
        scheduler.scheduleJob(schedule.minute + ' ' + schedule.hour + ' * * *', function () {
            capture(this.url, this.checksum);
        }.bind(schedule));
    }
};