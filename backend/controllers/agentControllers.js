const asyncHandler = require('../middleware/asyncHandler')
const Agent = require('../models/Agent')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.getAgents = asyncHandler( async (req, res, next) => {
    const agents = await Agent.find({ userId: req.query.user })
    res.send(agents)
})

exports.getAgent = asyncHandler( async (req, res, next) => {
    const agent = await Agent.findOne({ _id: req.params.id })
    res.status(200).send(agent)
})

exports.addAgent = asyncHandler( async (req, res, next) => {
    const {  contacts } = req.body
    const agent = {
        ...req.body,
        contacts: (contacts) ? contacts.map(contact => {         
            return {
                ...contact,
                _id: new ObjectId()
            }
        }
        ) : []
    }
    const newAgent = await new Agent(agent).save()
    res.status(201).send(newAgent)
})

exports.updateAgent = asyncHandler( async (req, res, next) => {
    const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).send(agent)
})

exports.deleteAgent = async (req, res) => {
    const agent = await Agent.findOneAndDelete({ _id: req.params.id })
    res.status(202).send(agent._id)
}

exports.addContact = asyncHandler( async (req, res, next) => {
    const newContact = {
        ...req.body,
        _id: new ObjectId()
    }
    const agent = await Agent.findOne({ _id: req.params.id })
    agent.contacts.push(newContact)
    await agent.save()
    res.status(200).send(agent)
})

exports.updateContact = asyncHandler( async (req, res, next) => {
    const agent = await Agent.findOne({ _id: req.params.id })
    const contact = agent.contacts.find(contact => contact._id == req.params.contactId)
    const updatedContact = {
        ...contact,
        ...req.body
    }
    agent.contacts = agent.contacts.map(contact => contact._id == req.params.contactId ? updatedContact : contact)
    await agent.save()
    res.status(200).send(agent)
})

exports.deleteContact = asyncHandler( async (req, res, next) => {
    const agent = await Agent.findOne({ _id: req.params.id })
    const contact = agent.contacts.find(contact => contact._id == req.params.contactId)
    agent.contacts = agent.contacts.filter(contact => contact._id != req.params.contactId)
    await agent.save()
    res.status(200).send(agent)
})