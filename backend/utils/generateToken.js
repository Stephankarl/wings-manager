const jwt = require('jsonwebtoken')

const authToken = async (user) => {
    const token = jwt.sign({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
    }, process.env.ACCESS_TOKEN_SECRET, {})
    return token
}

const dataToken = async (user) => {
    const token = jwt.sign({
        address: user.address,
        bankDetails: user.bankDetails,
        defaultRate: user.defaultRate,
        phoneNumber: user.phoneNumber,
        target: user.target
    }, process.env.ACCESS_TOKEN_SECRET, {})
    return token
}

const documentsToken = async (user) => {
    const token = jwt.sign({
        documents: user.documents
    }, process.env.ACCESS_TOKEN_SECRET, {})
    return token
}

module.exports = { authToken, dataToken, documentsToken }