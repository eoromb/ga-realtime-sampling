class LogService {
    error (message) {
        // eslint-disable-next-line no-console
        console.log(`Error: ${message}`);
    }
    info (message) {
        // eslint-disable-next-line no-console
        console.log(`Info: ${message}`);
    }
}
module.exports = LogService;
