const jwt = require('jsonwebtoken')

  const authMiddleware = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1]  // recupere le header Authorization
    if (!token) return res.status(403).json({ error: "vous n'etes pas connecter" })

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
      req.user = decoded

      next()
    } catch (err) {
      res.status(401).json({ error: "Token invalide" });
    }
};

module.exports = authMiddleware