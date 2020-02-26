const MetricDataMapper = require('../models/metric-data-mapper');
class MetricController {
    constructor ({metricService}) {
        this.metricService = metricService;
    }
    async get (req, res, next) {
        try {
            const {params: {metric}, query: {from, to}} = req;
            const metricValues = await this.metricService.getMetric({metric, from, to});
            res.json(metricValues.map(MetricDataMapper.fromDomain));
        } catch (error) {
            next(error);
        }
    }
}
module.exports = MetricController;
