const MetricProvider = require('./metric-provider');
const SamplingService = require('./sampling-service');
const MetricService = require('./metric-service');
module.exports = ({common, persistence}) => {
    const {configService, logService} = common;
    const {metricRepository} = persistence;
    const metricProvider = new MetricProvider(configService);
    return {
        metricService: new MetricService({metricRepository}),
        samplingService: new SamplingService({metricProvider, configService, logService, metricRepository}),
        metricProvider
    };
};
