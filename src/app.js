require('dotenv').config()
const cors = require('cors')
const express = require(`express`)
const adminRoutes = require('./routes/admin.route')

// Route pour les candidats
const candidateRoutes = require("./routes/candidate.route")

// Route pour les offres
const offerRoutes = require("./routes/offer.route")



const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/admin', adminRoutes)



// Route pour les candidats
app.use("/api/candidate", candidateRoutes)

// Route pour les offres
app.use("/api/offer", offerRoutes)


module.exports = app