const moment = require('moment')

const buildContract = (data, userId) => {
    const { startDate, endDate, rate, retainer } = data

    //Calculate amount of days
    const totalDays = moment(endDate).diff(moment(startDate), 'days') + 1
    
    //Calculate Total Income
    let totalIncome = totalDays * rate
    if (retainer)
        totalIncome = rate

    //Build a contract
    const updatedContract = {
        ...data,
        totalDays,
        totalIncome,
        userId
    }
    return updatedContract
}

module.exports = buildContract