const codes = {
    metric: {
        notExist: 1001
    }
};
const errors = {
    [codes.metric.notExist]: {
        message: 'Specified metric does not exist.',
        httpCode: 404
    }
};
module.exports = {
    codes,
    errors
};
