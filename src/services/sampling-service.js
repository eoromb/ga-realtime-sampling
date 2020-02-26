class SamplingService {
    constructor ({metricProvider, metricRepository, samplingStrategy, timestampStrategy, configService, logService}) {
        this.metricProvider = metricProvider;
        this.metricRepository = metricRepository;
        this.samplingStrategy = samplingStrategy;
        this.timestampStrategy = timestampStrategy;
        this.logService = logService;
        this.config = configService.getSamplingServiceConfig();

        this.timestamp = 0;
        this.consecutiveErrorsCount = 0;
    }
    getPollingTimeout () {
        return Math.pow(2, Math.min(this.consecutiveErrorsCount, 4)) * this.config.pollingTimeout;
    }
    scheduleNextStep (timeout) {
        if (this.isSamplingStarted) {
            this.timerId = setTimeout(this.samplingStep.bind(this), timeout, true);
        }
    }
    async samplingStep () {
        try {
            const metricValue = await this.metricProvider.getMetric(this.config.viewId, this.config.metric);
            const nextTimestamp = this.timestampStrategy.getNextTimestamp();
            if (nextTimestamp !== this.timestamp) {
                if (this.timestamp !== 0) {
                    try {
                        const samplingResult = this.samplingStrategy.endSampling();
                        await this.metricRepository.addMetricValue({metric: this.config.metric, value: samplingResult, timestamp: this.timestamp});
                    } catch (error) {
                        this.logService.error(`Error on adding metric value. Error: ${error}`);
                    }
                }
                this.timestamp = nextTimestamp;
                this.samplingStrategy.beginSampling();
            }
            this.samplingStrategy.addSample(metricValue);
            this.consecutiveErrorsCount = 0;
        } catch (error) {
            this.logService.error(`Error on getting metric value. Error: ${error}`);
            this.consecutiveErrorsCount++;
        } finally {
            this.scheduleNextStep(this.getPollingTimeout());
        }
    }

    static getNextTimestamp (interval) {
        const unixTimestamp = Math.floor(Date.now() / 1000);
        const secondsInInterval = interval * 60;
        return secondsInInterval * Math.ceil(unixTimestamp / secondsInInterval);
    }

    startSampling () {
        if (!this.isSamplingStarted) {
            this.isSamplingStarted = true;
            this.scheduleNextStep(0);
        }
    }

    stopSampling () {
        this.isSamplingStarted = false;
        if (this.timerId != null) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
    }
}
module.exports = SamplingService;
