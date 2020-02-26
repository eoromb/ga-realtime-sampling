const ConfigService = require('./config-service');
const LogService = require('./log-service');
const ErrorMapper = require('./error-mapper');

module.exports = () => {
    return {
        configService: new ConfigService(),
        logService: new LogService(),
        errorMapper: new ErrorMapper()
    };
};
