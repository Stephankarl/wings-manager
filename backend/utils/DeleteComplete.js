const Contract = require('../models/Contracts')

const deleteComplete = async () => {
    const c = await Contract.updateMany({}, { $unset: { complete: 1 }})
    console.log(c)
}

module.exports = deleteComplete