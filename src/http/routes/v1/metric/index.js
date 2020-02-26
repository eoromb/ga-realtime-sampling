const express = require('express');
module.exports = ({metricController}) => {
    const router = express.Router();
    router.get('/:id', metricController.get.bind(metricController));

    return router;
};
