const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ContractSchema = new Schema({
    createdDate: {
        type: Date,
        default: Date.now()
    },
    open: { type: Boolean, default: true },
    confirmed: { type: Boolean, default: false },
    userId: String,
    agent: String,
    rate: {
        type: Number,
        required: [true, `Contract rate is required.`]
    },
    retainer: { type: Boolean, default: false },
    startDate: {
        type: Date,
        required: [true, `Start Date is required.`]
    },
    endDate: {
        type: Date,
        required: [true, `End Date is required.`]
    },
    totalDays: Number,
    totalIncome: Number,
    totalExpense: { type: Number, default: 0 },
    expenses: Array,
    perDiem: { type: Boolean, default: true },
    perDiemRate: { type: Number, default: 150 },

    completed: { type: Boolean, default: false },
    cancelled: { type: Boolean, default: false },
    cancellationFee: Number,
    cancellationDate: Date,

    //Combine Invoice into Object
    invoiceDetails: {
        invoiced: { type: Boolean, default: false },
        invoiceDate: Date,
        invoiceTotal: Number,
        invoiceNumber: String,
        invoiceAddress: {
            type: Object,
            default: {
                street: '',
                apartmentNumber: '',
                city: '',
                state: '',
                zip: ''
            }
        },
        invoiceReference: String,
        contactPerson: String,
        invoiceCreated: { type: Boolean, default: false }
    },

    //Paid Combine into an object
    payment: {
        paid: [{
            _id: Schema.Types.ObjectId,
            amount: Number,
            payDate: Date
        }],
        taxWithholding: { type: Number, default: 0 },
        paymentType: { type: String, default: '1099'},
        paymentComplete: { type: Boolean, default: false }
    },
    airplane: String,
    outstanding: Number,
    status: { type: String, default: 'Not Confirmed'}
})

module.exports = new model('Contract', ContractSchema)