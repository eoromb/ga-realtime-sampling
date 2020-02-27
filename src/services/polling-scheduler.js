/**
 * Scheduler which uses setTimeout as scheduling mechanism
 */
class PollingScheduler {
    constructor ({configService}) {
        this.pollingTimeout = configService.getPollingTimeout();
        this.isStarted = false;
        this.scheduleFn = null;
        this.timerId = null;
        this.consecutiveErrorsCount = 0;
    }
    /**
     * Gets polling timeout. Use Exponential Backoff strategy in case of errors
     * @private
     */
    getPollingTimeout () {
        return Math.pow(2, Math.min(this.consecutiveErrorsCount, 4)) * this.pollingTimeout;
    }
    /**
     * Schedule next step
     * @param {*} timeout
     * @private
     */
    scheduleNextStep (timeout) {
        if (this.isStarted) {
            this.timerId = setTimeout(async () => {
                try {
                    await this.scheduleFn();
                    this.consecutiveErrorsCount = 0;
                } catch (error) {
                    this.consecutiveErrorsCount++;
                } finally {
                    this.scheduleNextStep(this.getPollingTimeout());
                }
            }, timeout, true);
        }
    }
    /**
     * Start scheduling of specified function
     * @param {*} scheduleFn
     */
    start (scheduleFn) {
        if (!this.isStarted) {
            this.scheduleFn = scheduleFn;
            this.isStarted = true;
            this.scheduleNextStep(0);
        }
    }

    /**
     * Stop scheduling
     */
    stop () {
        this.isStarted = false;
        if (this.timerId != null) {
            clearTimeout(this.timerId);
            this.timerId = null;
            this.scheduleFn = null;
        }
    }
}
module.exports = PollingScheduler;
