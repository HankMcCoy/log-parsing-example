var _ = require("lodash"),
    Faker = require("Faker");

exports.Log = function () {

    this.last = {
        date : new Date() - 1000 * 60 * 60 * 24 * 365,
        msg  : Faker.Company.catchPhrase()
    };

    this.done = false;

    this.pop = function () {

        this.last = this.random();

        if (this.last.date > Date.now()) {
            this.done = true;
        }

        return this.done ? false : this.last;

    };

    this.popAsync = function (cb) {

        this.last = this.random();

        if (this.last.date > Date.now()) {
            this.done = true;
        }

        _.delay(function (done, num) {
            cb(null, done ? false : num);
        }, 0, this.done, this.last);

    };

    this.popAsyncSlow = function (cb) {

        this.last = this.random();

        if (this.last.date > Date.now()) {
            this.done = true;
        }

        _.delay(function (done, num) {
            cb(null, done ? false : num);
        }, 100, this.done, this.last);

    };

    this.random = function () {
        return {
            date : new Date(+this.last.date + (1000 * 60 * _.random(180))),
            msg  : Faker.Company.catchPhrase()
        }
    };

    return this;

};

exports.Printer = function () {

    this.last = new Date(0);

    this.print = function (log) {
        if (!_.isDate(log.date)) {
            throw new Error(log.date + " is not a date");
        }

        if (log.date >= this.last) {
            console.log(log.date, log.msg);
        } else {
            throw new Error(log.date + " is not greater than " + this.last);
        }

        this.last = log.date;
    }

}