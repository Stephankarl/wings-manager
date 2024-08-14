require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()
const db = require('./db')

//Connection to DB
db.connect(app)

//Middleware
app.use(cors())
app.use(express.json())

//INITIALIZING ROUTE FILES
app.use('/api', require('./routes'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contracts', require('./routes/contracts'))
app.use('/api/users', require('./routes/users'))
app.use('/api/agents', require('./routes/agents'))
app.use('/api/documents', require('./routes/documentsRoute'))

app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`))