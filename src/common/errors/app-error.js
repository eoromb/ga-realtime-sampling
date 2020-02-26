/**
 * Application level error
 */
class AppError extends Error {
    constructor (code) {
        super();
        this._code = code;
    }

    get code () {
        return this._code;
    }

    getCode () {
        return this._code;
    }

    toJSON () {
        return {code: this._code};
    }
}

module.exports = AppError;
