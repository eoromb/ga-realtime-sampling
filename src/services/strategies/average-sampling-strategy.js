class AverageSamplingStrategy {
    constructor () {
        this.beginSampling();
    }
    beginSampling () {
        this.avgSample = 0;
        this.samplesCount = 1;
    }
    addSample (sample) {
        if (Number.isNaN(sample)) {
            return;
        }
        this.avgSample += (sample - this.avgSample) / this.samplesCount;
        this.samplesCount++;
    }
    endSampling () {
        return this.avgSample;
    }
}
module.exports = AverageSamplingStrategy;
