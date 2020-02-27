const MetricDataMapper = require('../models/metric-data-mapper');
/**
 * Controller for metric requests
 */
class MetricController {
    constructor ({metricService}) {
        if (metricService == null) {
            throw new Error('Invalid parameter for MetricController constructor');
        }
        this.metricService = metricService;
    }
    async get (req, res, next) {
        try {
            const {params: {metric}, query: {from, to}} = req;
            const metricValues = await this.metricService.getMetricValues({metric, from, to});
            res.json(metricValues.map(MetricDataMapper.fromDomain));
        } catch (error) {
            next(error);
        }
    }
}
module.exports = MetricController;
