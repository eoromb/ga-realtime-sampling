const MetricProvider = require('./metric-provider');
const SamplingService = require('./sampling-service');
const MetricService = require('./metric-service');
const SamplingStrategy = require('./strategies/average-sampling-strategy');
const TimestampStrategy = require('./strategies/date-timestamp-strategy');
module.exports = ({common: {configService, logService}, persistence: {metricRepository}}) => {
    const metricProvider = new MetricProvider({configService});
    const samplingStrategy = new SamplingStrategy();
    const timestampStrategy = new TimestampStrategy({configService});
    return {
        metricService: new MetricService({metricRepository}),
        samplingService: new SamplingService({metricProvider, metricRepository, samplingStrategy, timestampStrategy, configService, logService}),
        metricProvider
    };
};
