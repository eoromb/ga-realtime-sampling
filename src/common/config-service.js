class ConfigService {
    getMetricProviderConfig () {
        return {
            privateKey: process.env.PRIVATE_KEY,
            clientEmail: process.env.CLIENT_EMAIL
        };
    }
    getSamplingServiceConfig () {
        return {
            metric: process.env.SAMPLING_METRIC,
            view: process.env.SAMPLING_VIEW,
            interval: process.env.SAMPLING_INTERVAL || 5,
            pollingTimeout: process.env.POLLING_TIMEOUT || 500
        };
    }
    getDatabaseConfig () {
        return {
            client: 'sqlite3',
            connection: {
                filename: './db.sqlite'
            },
            useNullAsDefault: true
        };
    }
    getServerPort () {
        return process.env.PORT || 3000;
    }
}
module.exports = ConfigService;
