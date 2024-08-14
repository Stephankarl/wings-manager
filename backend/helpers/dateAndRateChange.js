const moment = require('moment')

const dateAndRateChange = (contract, newData) => {
    // console.log(contract, newDates)
    let { totalDays, totalIncome } = contract
    const { startDate, endDate, rate, retainer } = newData
    // totalDays
    totalDays = moment(endDate).diff(moment(startDate), 'days') + 1
    // totalIncome
    totalIncome = totalDays * rate
    if (retainer)
        totalIncome = rate
    
    const newInfo = {
        totalDays,
        totalIncome,
    }
    return newInfo
}

module.exports = dateAndRateChange