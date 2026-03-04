require('dotenv').config()
const cors = require('cors')
const express = require(`express`)
const adminRoutes = require('./routes/admin.route')



const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/admin', adminRoutes)

module.exports = app