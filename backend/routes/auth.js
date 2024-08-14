const express = require('express')
const router = express.Router()

const controllers = require('../controllers/authControllers')
const { authenticateToken } = require('../middleware/authenticateToken')

router
    .route('/register')
    .post(controllers.registerUser)

router
    .route('/login')
    .post(controllers.loginUser)

router
    .route('/authenticate')
    .get(authenticateToken, controllers.authenticateUser)

router
    .route('/logout')
    .get(controllers.logoutUser)

module.exports = router