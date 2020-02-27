/**
 * Configuration services
 */
class ConfigService {
    constructor () {
        this.databaseConfig = require('../../knexfile')[process.env.NODE_ENV || 'development'];
    }
    getMetricProviderConfig () {
        return {
            privateKey: process.env.PRIVATE_KEY,
            clientEmail: process.env.CLIENT_EMAIL
        };
    }
    getSamplingServiceConfig () {
        return {
            metric: process.env.SAMPLING_METRIC,
            viewId: process.env.SAMPLING_VIEW_ID
        };
    }
    getPollingTimeout () {
        return +process.env.POLLING_TIMEOUT || 500;
    }
    getSamplingInterval () {
        return +process.env.SAMPLING_INTERVAL || 5;
    }
    getDatabaseConfig () {
        return this.databaseConfig;
    }
    getServerPort () {
        return +process.env.PORT || 3000;
    }
}
module.exports = ConfigService;
