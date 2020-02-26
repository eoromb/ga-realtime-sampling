const AppError = require('../../common/errors/app-error');
const defaultError = {
    code: 500,
    message: 'Internal server error'
};
/**
 * Process application level errors: maps to transport level and logs
 */
module.exports = ({logService, errorMapper}) => (error, req, res, next) => {
    if (error) {
        const mappedError = errorMapper.mapError(error);
        const defaultErrorToSend = defaultError;
        logService.error(`${mappedError}`);
        res.status(mappedError instanceof AppError ? mappedError.code : defaultErrorToSend.code);
        const result = mappedError instanceof AppError ? mappedError : defaultErrorToSend;
        return res.json(result);
    }
    next();
};
