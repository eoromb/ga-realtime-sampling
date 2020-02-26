class DateTimestampStrategy {
    constructor ({configService}) {
        this.interval = configService.getSamplingInterval();
    }
    getNextTimestamp () {
        const unixTimestamp = Math.floor(Date.now() / 1000);
        const secondsInInterval = this.interval * 60;
        return secondsInInterval * Math.ceil(unixTimestamp / secondsInInterval);
    }
}
module.exports = DateTimestampStrategy;
