const {google} = require('googleapis');
class MetricProvider {
    constructor ({configService}) {
        const {clientEmail, privateKey} = configService.getMetricProviderConfig();
        this.jwt = new google.auth.JWT(
            clientEmail,
            null,
            privateKey,
            'https://www.googleapis.com/auth/analytics.readonly'
        );
    }
    static mapResultToMetric (result, metric) {
        return +result.data.totalsForAllResults[metric];
    }
    static hasCorrectFormat (result) {
        return result != null && result.data != null && result.data.totalsForAllResults != null;
    }
    async getMetric (viewId, metric) {
        return new Promise((resolve, reject) => {
            const metricFullName = `rt:${metric}`;
            const viewFullId = `ga:${viewId}`;
            google.analytics('v3').data.realtime.get({
                auth: this.jwt,
                ids: viewFullId,
                metrics: metricFullName
            }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                if (!MetricProvider.hasCorrectFormat(result)) {
                    return reject(new Error('Invalid response format from google api'));
                }
                resolve(MetricProvider.mapResultToMetric(result, metricFullName));
            });
        });
    }
}
module.exports = MetricProvider;
