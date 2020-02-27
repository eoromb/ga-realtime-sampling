const MetricProvider = require('./metric-provider');
const SamplingService = require('./sampling-service');
const MetricService = require('./metric-service');
const SamplingStrategy = require('./strategies/average-sampling-strategy');
const TimestampStrategy = require('./strategies/date-timestamp-strategy');
const PollingScheduler = require('./polling-scheduler');
/**
 * Composition root for services
 */
module.exports = ({common: {configService, logService}, persistence: {metricRepository}}) => {
    const metricProvider = new MetricProvider({configService});
    const samplingStrategy = new SamplingStrategy();
    const timestampStrategy = new TimestampStrategy({configService});
    const scheduler = new PollingScheduler({configService});
    return {
        metricService: new MetricService({metricRepository}),
        samplingService: new SamplingService({metricProvider, metricRepository, samplingStrategy, timestampStrategy, scheduler, configService, logService}),
        metricProvider
    };
};
