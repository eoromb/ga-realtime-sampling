/**
 * Simple logging service
 */
class LogService {
    error (message) {
        // eslint-disable-next-line no-console
        console.log(`${(new Date).toISOString()} Error: ${message}`);
    }
    info (message) {
        // eslint-disable-next-line no-console
        console.log(`${(new Date).toISOString()} Info: ${message}`);
    }
}
module.exports = LogService;
