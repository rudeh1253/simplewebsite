const random = require('./random');

/**
 * Test for Random.generateDigitSeries method
 * 
 * Test suite:
 *     len: 0
 *     len: 1
 *     len: 15
 */
test('Random.generateDigitSeries', () => {
    for (let i = 0; i < 15; i++) {
        const testCase1 = random.generateDigitSeries(0);
        expect(testCase1.length).toBe(0);
        //expect(parseInt(testCase1) == testCase1).toBe(true);

        const testCase2 = random.generateDigitSeries(1);
        expect(testCase2.length).toBe(1);
        expect(parseInt(testCase2) == testCase2).toBe(true);
        // console.log(testCase2);

        const testCase3 = random.generateDigitSeries(15);
        expect(testCase3.length).toBe(15);
        expect(parseInt(testCase3) == testCase3).toBe(true);
        // console.log(testCase3);

        const testCase4 = random.generateDigitSeries(2);
        expect(testCase4.length).toBe(2);
        expect(parseInt(testCase4) == testCase4).toBe(true);
        // console.log(testCase4);
    }
});