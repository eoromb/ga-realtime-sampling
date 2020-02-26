const express = require('express');
const metric = require('./metric');

module.exports = ({metricController}) => {
    const router = express.Router();
    router.use('/metric', metric({metricController}));

    return router;
};
