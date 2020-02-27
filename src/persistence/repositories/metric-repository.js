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
            .where(qb => {
                qb.where('metric', metric);
                if (from != null) {
                    qb.andWhere('timestamp', '>', +from);
                }
                if (to != null) {
                    qb.andWhere('timestamp', '<', +to);
                }
            });
    }
}
module.exports = MetricRepository;
