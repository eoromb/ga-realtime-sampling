class MetricService {
    constructor ({metricRepository}) {
        this.metricRepository = metricRepository;
    }
    async getMetric ({metric, from, to}) {
        return this.metricRepository.getMetric({metric, from, to});
    }
}
module.exports = MetricService;
