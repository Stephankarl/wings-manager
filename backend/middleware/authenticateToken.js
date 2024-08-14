const jwt = require('jsonwebtoken')
const serverResponse = require('../utils/serverResponse')
const messages = require('../config/messages')

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN
    if (token == null) return serverResponse.sendError(res, messages.UNAUTHORIZED)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return serverResponse.sendError(res, messages.FORBIDDEN)
        req.user = user
        next()
    })
}


