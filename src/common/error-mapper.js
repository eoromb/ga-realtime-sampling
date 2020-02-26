const AppError = require('./errors/app-error');
const HttpError = require('./errors/http-error');
const Errors = require('./errors/errors');

/**
 * Error mapper. Maps application level error to network level
 */
class ErrorMapper {
    mapError (appError) {
        if (appError instanceof AppError) {
            const code = appError.getCode();
            if (Errors.errors.hasOwnProperty(code)) {
                const error = Errors.errors[code];
                return new HttpError(error.message, error.httpCode);
            }
            return new HttpError('Unable to map error', 400);
        }
        return appError;
    }
}
module.exports = ErrorMapper;
