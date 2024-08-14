const mongoose = require('mongoose')
const { Schema, model } = mongoose

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: [true, `This email already exist.`] },
    password: { type: String, required: true },
    base: String,
    companyName: { type: String, default: 'Private' },
    bankDetails: {
        bankName: { type: String, default: ''},
        accountName: { type: String, default: '' },
        accountNumber: { type: Number, default: 0 },
        routingNumber: { type: Number, default: 0 },
        accountType: { type: String, default: '' }
    },
    address: {
        apartment: { type: String, default: ''},
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        zip: { type: String, default: '' }
    },
    phoneNumber: {
        countryCode: { type: Number, default: 0 },
        number: { type: Number, default: 0 }
    },
    target: { type: Number, default: 300000 },
    defaultRate: { type: Number, default: 2000 },
    documents: Array,
})

module.exports = new model('User', UserSchema)