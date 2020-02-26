const {google} = require('googleapis');
class MetricProvider {
    constructor ({configService}) {
        this.configService = configService;
        const {clientEmail, privateKey} = this.configService.getMetricProviderConfig();
        this.jwt = new google.auth.JWT(
            clientEmail,
            null,
            privateKey,
            'https://www.googleapis.com/auth/analytics.readonly'
        );
    }
    static mapResultToMetric (result, metric) {
        return result.data.totalsForAllResults[metric];
    }
    async getMetric (viewId, metric) {
        return new Promise((resolve, reject) => {
            google.analytics('v3').data.realtime.get({
                auth: this.jwt,
                ids: `ga: ${viewId}`,
                metrics: metric
            }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(MetricProvider.mapResultToMetric(result));
            });
        });
    }
}
module.exports = MetricProvider;
