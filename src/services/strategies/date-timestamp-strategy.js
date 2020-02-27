/**
 * Timestamp strategy. Gets boundary of sampling buckets based of date time.
 */
class DateTimestampStrategy {
    constructor ({configService}) {
        this.interval = configService.getSamplingInterval();
    }
    /**
     * Gets boundary timestamp for current interval
     */
    getBoundaryTimestamp () {
        const unixTimestamp = this.getCurrentTimestamp();
        const secondsInInterval = this.interval * 60;
        return secondsInInterval * Math.ceil(unixTimestamp / secondsInInterval);
    }
    /**
     * Get current timestamp
     */
    getCurrentTimestamp () {
        return Math.floor(Date.now() / 1000);
    }
}
module.exports = DateTimestampStrategy;
