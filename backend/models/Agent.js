const mongoose = require('mongoose')
const { Schema, model } = mongoose

const AgentSchema = new Schema({
    userId: String,
    companyName: String,
    contacts: [Object],
    nickName: String
})

module.exports = new model('Agent', AgentSchema)