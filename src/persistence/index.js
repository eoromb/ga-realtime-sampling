const MetricRepository = require('./repositories/metric-repository');
const knexClientInit = require('./database/knex-client');
module.exports = ({common}) => {
    const {configService} = common;
    const knexClient = knexClientInit(configService.getDatabaseConfig());
    const metricRepository = new MetricRepository(knexClient);
    return {
        metricRepository
    };
};
