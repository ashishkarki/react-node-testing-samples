const utils = require('../utils')

const getPercentage = () => {
  const { dailyStats, totalStats } = utils.getStats()

  const result = (dailyStats / totalStats) * 100

  if (result < 100) {
    return result
  } else {
    throw new Error('Daily stats are more than 100%')
  }
}

module.exports = {
  getPercentage,
}
