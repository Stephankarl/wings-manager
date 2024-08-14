const express = require('express')
const router = express.Router()

//IMPORT FILES
const Contract = require('../models/Contracts')
const controllers = require('../controllers/contractControllers')
const { authenticateToken } = require('../middleware/authenticateToken')

// ******************************************************************** 

router
    .route('/')
    .get(authenticateToken, controllers.getContracts)
    .post(authenticateToken, controllers.addContract)

router
    .route('/:id')
    .post(controllers.editContract)
    .patch(controllers.editContract)
    .delete(controllers.deleteContract)

router
    .route('/:id/confirm')
    .patch(controllers.confirmController)

router
    .route('/:id/cancel')
    .patch(controllers.cancelContract)

router
    .route('/:id/complete')
    .post(controllers.completeController)

router
    .route('/:id/expenses')
    .post(controllers.expenseController)

router
    .route('/:id/payment')
    .post(controllers.paymentController)

router.delete('/:id', (req, res) => {
    Contract.findByIdAndDelete(req.params.id, err => {
        if (err) throw err
        res.send(req.params.id)
    })
})

module.exports = router;