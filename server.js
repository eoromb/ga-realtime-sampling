const express = require('express');
const bodyParser = require('body-parser');
const common = require('./src/common')();
const persistence = require('./src/persistence')({common});
const services = require('./src/services')({persistence, common});
const controllers = require('./src/http/controllers')({services});
const errorHandler = require('./src/http/middlewares/error-handler');
const setupRoutes = require('./src/http/routes');
const {configService, logService} = common;

const app = express();
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb'}));
setupRoutes({app, controllers, common});

const port = configService.getServerPort();

process.on('uncaughtException', err => {
    logService.error(`Unhandled Exception: ${err}`);
});
process.on('unhandledRejection', (reason, p) => {
    logService.error(`Unhandled Rejection at: ${p}. reason: ${reason}`);
});
app.use(errorHandler);
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.disable('etag').disable('x-powered-by');
app.enable('trust proxy');
app.set('port', port);

const server = app.listen(port, function () {
    const host = server.address().address;
    const port = server.address().port;
    logService.info(`${Date(Date.now())}: Node server started on ${host}:${port} ...`);
    services.samplingService.startSampling();
});

module.exports = server;
