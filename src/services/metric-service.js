class MetricService {
    constructor ({metricRepository}) {
        this.metricRepository = metricRepository;
    }
    async getMetricValues ({metric, from, to}) {
        return this.metricRepository.getMetricValues({metric, from, to});
    }
}
module.exports = MetricService;
