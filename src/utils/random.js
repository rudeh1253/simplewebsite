class Random {

    /**
     * Return a series of [len] digits each of which is generated randomly.
     * 
     * @param {number} len length of the series.
     * @returns A series of random digits. It is formatted as a string.
     */
    generateDigitSeries(len) {
        let r = Math.random();
        if (r * 10 < 1) {
            r += 0.1;
        }

        const coefficient = Math.pow(10, len);
        const series = Math.floor(r * coefficient).toString();
        return series == '0' ? '' : series;
    }
}

// Singleton
var random;
if (random == null) {
    random = new Random();
}

module.exports = random;