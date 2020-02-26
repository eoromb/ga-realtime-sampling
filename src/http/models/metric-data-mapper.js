class MetricDataMapper {
    static fromDomain (object) {
        const {metric, value, timestamp} = object;
        return {metric, value, timestamp};
    }
}
module.exports = MetricDataMapper;
