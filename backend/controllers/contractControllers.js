
const asyncHandler = require('../middleware/asyncHandler')
const Contract = require('../models/Contracts')
const buildContract = require('../utils/buildContract')
const serverResponse = require('../utils/serverResponse')
const messages = require('../config/messages')

//================================================
//  GET CONTRACTS

exports.getContracts = async (req, res) => {
    const { id } = req.user
    console.log(req.user)
    try {
        const contracts = await Contract.find({ userId: id }).sort({ startDate: 1 })
         return serverResponse.sendSuccess(res, messages.SUCCESSFUL, contracts)
    } catch (error) {
        return serverResponse.sendError(res, messages.INTERNAL_SERVER_ERROR)
    }
}

// *********************************************

exports.addContract = async (req, res) => {
    const { id } = req.user
    try {
        const contract = await Contract.create(buildContract(req.body, id))
        serverResponse.sendSuccess(res, messages.SUCCESSFUL, contract)
    } catch (error) {
        serverResponse.sendError(res, messages.INTERNAL_SERVER_ERROR)
    }
}
    

// **********************************************

exports.editContract = asyncHandler( async (req, res, next) => {
    const updatedContract = buildContract(req.body)
    const contract = await Contract.findByIdAndUpdate(req.params.id, updatedContract, {
        new: true,
        runValidators: true
    })
    res.send(contract)
})

exports.confirmController = asyncHandler( async(req, res, next) => {
    const contract = await Contract.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(contract)
})

exports.completeController = asyncHandler( async(req, res, next) => {
    const contract = await Contract.findById(req.params.id)
    const { invoiceTotal, status, completed } = req.body

    const updateContract = {
        status, completed,
        invoiceDetails: {
            ...contract.invoiceDetails,
            invoiceTotal
        }
    }

    const result = await Contract.findByIdAndUpdate(req.params.id, updateContract, { new: true })
    res.send(result)
})

exports.expenseController = asyncHandler( async (req, res, next) => {
    //Handle Individual Expenses
    console.log(req.body)
})

exports.paymentController = asyncHandler( async (req, res, next) => {
    const { amount, payDate, paymentType } = req.body

    //Push payment to array
    const query = { _id: req.params.id }
    const updateDoc = {
        $push: {
            'payment.paid': { amount: parseFloat(amount), payDate }
        }
    }
    await Contract.updateOne(query, updateDoc)

    const contract = await Contract.findById(req.params.id)
    const { invoiceTotal } = contract.invoice
    let expenseTotal = 0

    contract.payment.paid.forEach(payment => {
        expenseTotal += payment.amount
    })

    if (expenseTotal === invoiceTotal) {
        contract.payment.paymentComplete = true
        contract.save()
        
        res.status(201).json({
            success: true,
            data: contract
        })
    } else {
        console.log('Not done')
        // set invoice Total to what is owed
    }
})

exports.cancelContract = async (req, res) => {
    const { fee } = req.body
    let contractUpdate = {}

    if (!fee || fee === 0) {
        contractUpdate = {
            open: false,
            cancelled: true,
            status: 'Cancelled',
            cancellationFee: 0,
            cancellationDate: Date.now()
        }
    } else {
        contractUpdate = {
            cancelled: true,
            status: 'Cancelled',
            cancellationFee: fee,
            cancellationDate: Date.now()
        }
    }

    const newContract = await Contract.findByIdAndUpdate(req.params.id, contractUpdate, { new: true })
    res.status(201).send(newContract)
}

exports.deleteContract = async (req, res) => {
    const contract = await Contract.findOneAndDelete({ _id: req.params.id })
    res.status(202).send(contract._id)
}