const User = require('../models/User')

const asyncHandler = require('../middleware/asyncHandler')
const serverResponse = require('../utils/serverResponse')
const messages = require('../config/messages')
const { dataToken } = require('../utils/generateToken')

exports.getUserInfo = asyncHandler( async (req, res, next) => {
    const { id } = req.user
    try {
        const user = await User.findById(id)
        const token = await dataToken(user)
        return serverResponse.sendSuccess(res, messages.SUCCESSFUL, token)
        
    } catch (error) {
        return serverResponse.sendError(res, messages.NOT_FOUND)
    }
})

exports.updateUser = asyncHandler( async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    const token = await getToken(user)
})