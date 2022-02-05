const getStats = () => {
  const dailyStats = Math.ceil(Math.random() * 10)
  const totalStats = Math.ceil(Math.random() * 10)

  return {
    dailyStats,
    totalStats,
  }
}

module.exports = {
  getStats,
}
