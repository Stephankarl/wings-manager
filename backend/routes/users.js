const express = require('express')
const router = express.Router()

//IMPORT FILES
const controllers = require('../controllers/userControllers')
const { authenticateToken } = require('../middleware/authenticateToken')

router
    .route('/')
    .get(authenticateToken, controllers.getUserInfo)

router
    .route('/:id')

module.exports = router