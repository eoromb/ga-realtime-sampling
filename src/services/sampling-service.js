class SamplingService {
    constructor ({metricProvider, configService, logService, metricRepository}) {
        this.metricProvider = metricProvider;
        this.logService = logService;
        this.config = configService.getSamplingServiceConfig();
        this.metricRepository = metricRepository;
        this.metricAvg = 0;
        this.samplesCount = 1;
        this.timestamp = 0;
        this.consecutiveErrorsCount = 0;
    }
    async saveMetric (value, timestamp) {
        await this.metricRepository.addMetricValue(value, timestamp);
    }
    getPollingTimeout () {
        return Math.pow(2, Math.min(this.consecutiveErrorsCount, 4)) * this.config.pollingTimeout;
    }
    async samplingStep () {
        try {
            const metricValue = await this.metricProvider.getMetric(this.config.viewId, this.config.metric);
            const nextTimestamp = SamplingService.getNextTimestamp(this.config.interval);
            if (nextTimestamp !== this.timestamp && this.timestamp !== 0) {
                try {
                    await this.saveMetric(this.metricAvg, this.timestamp);
                } catch (error) {
                    this.logService.warn(`Error on adding metric value. Error: ${error}`);
                }
                this.timestamp = nextTimestamp;
                this.metricAvg = 0;
                this.samplesCount = 1;
            } else if (this.timestamp === 0) {
                this.timestamp = nextTimestamp;
            }
            this.metricAvg += (metricValue - this.metricAvg) / this.samplesCount;
            this.samplesCount++;
            this.consecutiveErrorsCount = 0;
        } catch (error) {
            this.logService.warn(`Error on getting metric value. Error: ${error}`);
            this.consecutiveErrorsCount++;
        }
        this.scheduleNextStep(this.getPollingTimeout());
    }

    static getNextTimestamp (interval) {
        const unixTimestamp = Math.floor(Date.now() / 1000);
        const secondsInInterval = interval * 60;
        return secondsInInterval * Math.ceil(unixTimestamp / secondsInInterval);
    }
    scheduleNextStep (timeout) {
        if (this.autoRescheduling) {
            this.timerId = setTimeout(this.samplingStep.bind(this), timeout, true);
        }
    }

    startSampling () {
        if (!this.autoRescheduling) {
            this.autoRescheduling = true;
            this.scheduleNextStep(0);
        }
    }

    stopSampling () {
        this.autoRescheduling = false;
        if (this.timerId != null) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
    }
}
module.exports = SamplingService;
