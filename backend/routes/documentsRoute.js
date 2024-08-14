const express = require('express')
const router = express.Router()
const multer = require('multer')

const controllers = require('../controllers/documentControllers')
const { authenticateToken } = require('../middleware/authenticateToken')

const storage = multer.memoryStorage()
const upload = multer({ storage })

router
    .route('/')
    .get(authenticateToken, controllers.getDocuments)
    .post(authenticateToken, upload.single('file'), controllers.uploadDocument)
    .delete(authenticateToken, controllers.deleteDocument)

    // Test Route
router
    .route('/uploadTest')
    .post(upload.single('file'), controllers.uploadTest)

module.exports = router