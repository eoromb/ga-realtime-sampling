class MetricRepository {
    constructor (knexClient) {
        this.knexClient = knexClient;
    }
    addMetricValue (value, timestamp) {

    }
    getMetric ({metric, from, to}) {

    }
}
module.exports = MetricRepository;
