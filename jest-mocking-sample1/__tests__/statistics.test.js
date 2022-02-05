const statistics = require('../src/statistics')
const utils = require('../utils')

// mock whole utils module
jest.mock('../utils')

describe('Statistics module => ', () => {
  it('should return percentage of daily stats', () => {
    const getPercentageSpy = jest.spyOn(statistics, 'getPercentage')

    const testDailyStats = 100
    const testTotalStats = 200

    utils.getStats = jest.fn(() => ({
      dailyStats: testDailyStats,
      totalStats: testTotalStats,
    }))

    const stats = getPercentageSpy()
    expect(stats).toBe((testDailyStats / testTotalStats) * 100)

    console.log(getPercentageSpy.mock.calls)
    console.log(getPercentageSpy.mock.results)

    expect(getPercentageSpy).toHaveBeenCalledTimes(1)
    expect(getPercentageSpy.mock.results[0].value).toBe(
      (testDailyStats / testTotalStats) * 100,
    )

    // clear the mock
    getPercentageSpy.mockReset()
  })
})
