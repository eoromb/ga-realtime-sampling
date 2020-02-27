/**
 * Maps metric from domain metric object to http one
 */
class MetricDataMapper {
    static fromDomain (object) {
        const {metric, value, timestamp} = object;
        return {metric, value, timestamp};
    }
}
module.exports = MetricDataMapper;
