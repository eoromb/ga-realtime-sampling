/**
 * Service which orchestrates sampling process
 */
class SamplingService {
    constructor ({metricProvider, metricRepository, samplingStrategy, timestampStrategy, scheduler, configService, logService}) {
        if (metricProvider == null ||
            metricRepository == null ||
            samplingStrategy == null ||
            timestampStrategy == null ||
            scheduler == null ||
            configService == null ||
            logService == null) {
            throw new Error('Invalid parameters for SamplingService constructor');
        }
        this.metricProvider = metricProvider;
        this.metricRepository = metricRepository;
        this.samplingStrategy = samplingStrategy;
        this.timestampStrategy = timestampStrategy;
        this.scheduler = scheduler;
        this.logService = logService;
        this.config = configService.getSamplingServiceConfig();

        this.resetState();
    }
    resetState () {
        this.boundaryTimestamp = 0;
    }
    /**
     * Makes sampling step: get data from metric provider, make sampling using sampling strategy
     */
    async samplingStep () {
        try {
            const metricValue = await this.metricProvider.getMetricValue(this.config.viewId, this.config.metric);
            const newBoundaryTimestamp = this.timestampStrategy.getBoundaryTimestamp();
            this.logService.info(`Sampling service: metricValue: ${metricValue}, currentTimestamp: ${this.timestampStrategy.getCurrentTimestamp()}, boundaryTimestamp: ${this.boundaryTimestamp}, newBoundaryTimestamp: ${newBoundaryTimestamp}.`);
            if (newBoundaryTimestamp > this.boundaryTimestamp) {
                if (this.boundaryTimestamp !== 0) {
                    try {
                        const samplingResult = this.samplingStrategy.endSampling();
                        await this.metricRepository.addMetricValue({metric: this.config.metric, value: samplingResult, timestamp: this.boundaryTimestamp});
                    } catch (error) {
                        this.logService.error(`Error on adding metric value. Error: ${error}`);
                    }
                }
                this.boundaryTimestamp = newBoundaryTimestamp;
                this.samplingStrategy.beginSampling();
            }
            this.samplingStrategy.addSample(metricValue);
        } catch (error) {
            this.logService.error(`Error on getting metric value. Error: ${error}`);
            throw error;
        }
    }
    /**
     * Starts sampling
     */
    startSampling () {
        this.scheduler.start(this.samplingStep.bind(this));
    }
    /**
     * Stop sampling
     */
    stopSampling () {
        this.scheduler.stop();
        this.resetState();
    }
}
module.exports = SamplingService;
