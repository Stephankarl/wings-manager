const asyncHandler = require('../middleware/asyncHandler')
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const message = require('../config/messages');
const serverResponse = require('../utils/serverResponse');
const { authToken } = require('../utils/generateToken');

//=======================================================

exports.registerUser = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const user = await User.findOne({ email })
        if (user) return serverResponse.sendError(res, message.USER_ALREADY_EXISTS);
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                email,
                password: hashedPassword,
                firstName,
                lastName
            });
            const savedUser = await newUser.save();
            
            if (savedUser) {
                const token = await authToken(savedUser);
                return serverResponse.sendSuccess(res, message.SUCCESSFUL, token);
            }
        }
    } catch (error) {
        return serverResponse.sendError(res, message.INTERNAL_SERVER_ERROR, error);
    }
};

//=======================================================

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return serverResponse.sendError(res, message.NO_USER_FOUND);

    try {
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) return serverResponse.sendError(res, message.AUTHENTICATION_FAILED);
        if (isMatched) {
            const token = await authToken(user);
            return serverResponse.sendSuccess(res, message.SUCCESSFUL_LOGIN, token);
        }
    } catch (error) {
        return serverResponse.sendError(res, message.INTERNAL_SERVER_ERROR, error);
    }
}

//=======================================================

exports.authenticateUser = async (req, res, next) => {
    const user = req.user;
    try {
        const token = await authToken(user);
        return serverResponse.sendSuccess(res, message.SUCCESSFUL, token);
        
    } catch (error) {
        return serverResponse.sendError(res, message.INTERNAL_SERVER_ERROR, error);
    }
}

exports.logoutUser = async (req, res, next) => {
    return serverResponse.sendSuccess(res, message.SUCCESSFUL);
}