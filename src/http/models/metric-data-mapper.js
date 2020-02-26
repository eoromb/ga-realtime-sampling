class MetricDataMapper {
    static fromDomain (metric) {
        const {items, status, id, customerId, address} = metric;
        return {items, status, id, customerId, address};
    }
}
module.exports = MetricDataMapper;
