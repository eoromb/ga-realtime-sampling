const SamplingService = require('../../src/services/sampling-service');
const MetricProvider = require('../../src/services/metric-provider');
const SamplingStrategy = require('../../src/services/strategies/average-sampling-strategy');
const MetricRepository = require('../../src/persistence/repositories/metric-repository');
const LogService = require('../../src/common/log-service');

const configServiceMock = {getSamplingServiceConfig: jest.fn().mockReturnValue({})};
const timestampStrategyMock = {
    getBoundaryTimestamp: jest.fn().mockReturnValue(2),
    getCurrentTimestamp: jest.fn().mockReturnValue(1)
};

jest.mock('../../src/services/metric-provider');
jest.mock('../../src/services/strategies/average-sampling-strategy');
jest.mock('../../src/services/polling-scheduler');
jest.mock('../../src/persistence/repositories/metric-repository');
jest.mock('../../src/common/log-service');

describe('sampling service test', () => {
    let params;
    beforeEach(() => {
        MetricProvider.mockClear();
        MetricRepository.mockClear();
        SamplingStrategy.mockClear();
        LogService.mockClear();
        timestampStrategyMock.getBoundaryTimestamp.mockClear();
        timestampStrategyMock.getCurrentTimestamp.mockClear();
        configServiceMock.getSamplingServiceConfig.mockClear();
        params = {
            metricProvider: new MetricProvider(),
            metricRepository: new MetricRepository(),
            samplingStrategy: new SamplingStrategy(),
            timestampStrategy: timestampStrategyMock,
            scheduler: {},
            configService: configServiceMock,
            logService: new LogService()
        };
    });
    it('should throw error in case of invalid parameters', () => {
        expect(() => new SamplingService({})).toThrow();
    });
    it('should call configService.getSamplingServiceConfig in constructor', () => {
        new SamplingService(params);
        expect(configServiceMock.getSamplingServiceConfig).toHaveBeenCalledTimes(1);
    });
    it('should call samplingStrategy.beginSampling on first samplingStep', async () => {
        const samplingService = new SamplingService(params);
        await samplingService.samplingStep();

        expect(SamplingStrategy.mock.instances[0].beginSampling).toHaveBeenCalledTimes(1);
    });
    it('should call metricProvider.getMetric, timestampStrategy.getBoundaryTimestamp, samplingStrategy.addSample on each sampling step', async () => {
        const samplingService = new SamplingService(params);
        for (let i = 1; i < 5; i++) {
            await samplingService.samplingStep();
            expect(MetricProvider.mock.instances[0].getMetricValue).toHaveBeenCalledTimes(i);
            expect(params.timestampStrategy.getBoundaryTimestamp).toHaveBeenCalledTimes(i);
            expect(SamplingStrategy.mock.instances[0].addSample).toHaveBeenCalledTimes(i);
        }
    });
    it('should call samplingStrategy.endSampling in case of timestamp changing', async () => {
        const timestampStrategy = {
            getBoundaryTimestamp: jest.fn()
                .mockReturnValueOnce(2)
                .mockReturnValueOnce(2)
                .mockReturnValueOnce(4),
            getCurrentTimestamp: jest.fn()
                .mockReturnValueOnce(1)
                .mockReturnValueOnce(1)
                .mockReturnValueOnce(3)
        };
        const samplingService = new SamplingService({...params, timestampStrategy});
        await samplingService.samplingStep();
        expect(SamplingStrategy.mock.instances[0].endSampling).toHaveBeenCalledTimes(0);
        await samplingService.samplingStep();
        expect(SamplingStrategy.mock.instances[0].endSampling).toHaveBeenCalledTimes(0);
        await samplingService.samplingStep();
        expect(SamplingStrategy.mock.instances[0].endSampling).toHaveBeenCalledTimes(1);

        timestampStrategy.getBoundaryTimestamp.mockClear();
        timestampStrategy.getCurrentTimestamp.mockClear();
    });
});
