const AppError = require('./app-error');

class HttpError extends AppError {
    constructor (message, code) {
        super(code || 500);
        this._message = message;
    }
    get message () {
        return this._message;
    }

    getMessage () {
        return this._message;
    }

    toJSON () {
        return {...super.toJSON(), message: this._message};
    }
}
module.exports = HttpError;
