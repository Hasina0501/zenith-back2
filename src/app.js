require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())


const userRoutes = require('./routes/user.route')
const authRoutes = require('./routes/auth.route')

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

module.exports = app