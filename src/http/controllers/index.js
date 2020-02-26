const MetricController = require('./metric-controller');
module.exports = ({services}) => {
    const {metricService} = services;
    return {
        metricController: new MetricController({metricService})
    };
};
