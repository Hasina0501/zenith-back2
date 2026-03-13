// Validation pour la mise à jour du statut d'un candidat
const validateStatusUpdate = (req, res, next) => {
  const { status } = req.body
  
  const validStatuses = ['PENDING', 'REVIEWING', 'ACCEPTED', 'REJECTED']
  
  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Le statut est requis"
    })
  }
  
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Statut invalide. Valeurs acceptées: ${validStatuses.join(', ')}`
    })
  }
  
  next()
}

// Validation pour les paramètres de pagination et de recherche
const validateQueryParams = (req, res, next) => {
  const { page, limit, status } = req.query
  
  // Validation de la page
  if (page && (isNaN(page) || parseInt(page) < 1)) {
    return res.status(400).json({
      success: false,
      message: "Le paramètre page doit être un nombre positif"
    })
  }
  
  // Validation de la limite
  if (limit && (isNaN(limit) || parseInt(limit) < 1 || parseInt(limit) > 100)) {
    return res.status(400).json({
      success: false,
      message: "Le paramètre limit doit être un nombre entre 1 et 100"
    })
  }
  
  // Validation du statut si fourni
  if (status) {
    const validStatuses = ['PENDING', 'REVIEWING', 'ACCEPTED', 'REJECTED']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Statut invalide. Valeurs acceptées: ${validStatuses.join(', ')}`
      })
    }
  }
  
  next()
}

module.exports = {
  validateStatusUpdate,
  validateQueryParams
}
