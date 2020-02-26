const express = require('express');
module.exports = ({metricController}) => {
    const router = express.Router();
    router.get('/:metric', metricController.get.bind(metricController));

    return router;
};
