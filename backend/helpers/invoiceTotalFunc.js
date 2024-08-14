const invoiceTotalFunc = (totalIncome, expenses) => {
    let totalExpenses = 0
    if(expenses.length > 0) {
        expenses.map(expense => {
            totalExpenses += parseFloat(expense.amount)
        })
    }
    const invoiceTotal = parseFloat(totalIncome) + parseFloat(totalExpenses)
    return invoiceTotal.toFixed(2)
}

module.exports = invoiceTotalFunc