const rateLimit = require("express-rate-limit")

const rateLimiter = rateLimit({
    windowMs: 60*1000,
    max: 10,
    message: "trop de requete"
})

module.exports = { rateLimiter }