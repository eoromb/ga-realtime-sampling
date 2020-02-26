const Strategy = require('../../src/services/strategies/average-sampling-strategy');
describe('average sampling test', () => {
    let strategy;
    const minDelta = 0.0001;
    beforeEach(() => (strategy = new Strategy()));
    it('should get correct average', () => {
        const data = [];
        strategy.beginSampling();
        for (let i = 0; i < 100; i++) {
            const sample = Math.random() * 100;
            strategy.addSample(sample);
            data.push(sample);
        }
        const sum = data.reduce((a, b) => a + b, 0);
        const avg = (sum / data.length) || 0;
        expect(Math.abs(avg - strategy.endSampling())).toBeLessThan(minDelta);
    });
});
