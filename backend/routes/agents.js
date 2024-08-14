const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

//IMPORT FILES
const Agent = require('../models/Agent')
const controllers = require('../controllers/agentControllers')

// ***********************************************************

//LOAD ALL AGENTS FOR SPECIFIC USER
router
    .route('/')
    .get(controllers.getAgents)
    .post(controllers.addAgent)

// LOAD AGENT
router
    .route('/:id')
    .get(controllers.getAgent)
    .patch(controllers.updateAgent)
    .delete(controllers.deleteAgent)

router
    .route('/:id/contact')
    .post(controllers.addContact)

router
    .route('/:id/contact/:contactId')
    .patch(controllers.updateContact)
    .delete(controllers.deleteContact)

// ***********************************************************

//ADDING A NEW AGENT
router.post('/', (req, res) => {
    const { contacts } = req.body
    let agent = {
        ...req.body,
        contacts: []
    }

    for(let contact of contacts) {
        contact = {
            ...contact,
            _id: new ObjectId()
        }
        agent.contacts.push(contact)
    }

    new Agent(agent).save((err, newAgent) => {
        if (err) throw err
        res.send(newAgent)
    })
})

router.patch('/:id', (req, res) => {
    let agent = req.body
    // const { contacts } = req.body
    for (let contact of agent.contacts) {
        if (!contact._id) {
            contact._id = new ObjectId()
        }
    }
    Agent.findByIdAndUpdate(req.params.id, (agent), { new: true }, (err, updatedAgent) => {
        if (err) throw err
        res.send({
            agentId: req.params.id,
            agent: updatedAgent
        })
    })
})

module.exports = router