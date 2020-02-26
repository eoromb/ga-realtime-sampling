const express = require('express');
const orders = require('./metric');
// const orderDeliveries = require('./orders/order-delivery');
// const orderPreparations = require('./orders/order-preparation');

module.exports = ({orderController, deliveryController, preparationController}) => {
    const router = express.Router();
    router.use('/metric', orders({orderController, deliveryController, preparationController}));
    // router.use('/orders/:id/delivery', orderDeliveries(deliveryController));
    // router.use('/orders/:id/preparation', orderPreparations(preparationController));

    return router;
};
