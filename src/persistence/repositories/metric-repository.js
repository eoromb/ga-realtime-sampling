/**
 * Metric repository
 */
class MetricRepository {
    constructor (knexClient) {
        this.knexClient = knexClient;
    }
    async addMetricValue ({metric, value, timestamp}) {
        return this.knexClient('metric').insert({metric, value, timestamp});
    }
    async getMetricValues ({metric, from, to}) {
        return this.knexClient
            .select()
            .from('metric')
            .where('metric', metric)
            .andWhere(function () {
                // eslint-disable-next-line no-invalid-this
                this.where('timestamp', '>', +from).andWhere('timestamp', '<', +to);
            });
    }
}
module.exports = MetricRepository;
