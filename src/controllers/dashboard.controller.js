const dashboardService = require("../services/dashboard.service")
const path = require("path")
const fs = require("fs")
const asyncHandler = require("../utils/asyncHandler")

// Pour récupérer la liste complète des candidats avec pagination et filtres
const getAllCandidates = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, search } = req.query
  
  const candidates = await dashboardService.getAllCandidatesWithFilters({
    page: parseInt(page),
    limit: parseInt(limit),
    status,
    search
  })
  
  res.json({
    success: true,
    data: candidates.candidates,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: candidates.total,
      pages: Math.ceil(candidates.total / parseInt(limit))
    }
  })
})

// Pour récupérer les détails complets d'un candidat
const getCandidateDetails = asyncHandler(async (req, res) => {
  const { id } = req.params
  
  const candidate = await dashboardService.getCandidateFullDetails(id)
  
  if (!candidate) {
    return res.status(404).json({
      success: false,
      message: "Candidat introuvable"
    })
  }
  
  res.json({
    success: true,
    data: candidate
  })
})

// Pour télécharger le CV d'un candidat
const downloadCV = asyncHandler(async (req, res) => {
  const { id } = req.params
  
  const candidate = await dashboardService.getCandidateById(id)
  
  if (!candidate) {
    return res.status(404).json({
      success: false,
      message: "Candidat introuvable"
    })
  }
  
  if (!candidate.cv) {
    return res.status(404).json({
      success: false,
      message: "CV non disponible pour ce candidat"
    })
  }
  
  // Construire le chemin du fichier CV
  const cvPath = path.join(__dirname, "../uploads/cv", candidate.cv)
  
  // Vérifier si le fichier existe
  if (!fs.existsSync(cvPath)) {
    return res.status(404).json({
      success: false,
      message: "Fichier CV introuvable"
    })
  }
  
  // Télécharger le fichier
  res.download(cvPath, candidate.cv, (err) => {
    if (err) {
      console.error("Erreur lors du téléchargement du CV:", err)
      res.status(500).json({
        success: false,
        message: "Erreur lors du téléchargement du CV"
      })
    }
  })
})

// Pour récupérer les statistiques du dashboard
const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getDashboardStatistics()
  
  res.json({
    success: true,
    data: stats
  })
})

// Pour mettre à jour le statut d'un candidat
const updateCandidateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  
  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Le statut est requis"
    })
  }
  
  const candidate = await dashboardService.updateCandidateStatus(id, status)
  
  if (!candidate) {
    return res.status(404).json({
      success: false,
      message: "Candidat introuvable"
    })
  }
  
  res.json({
    success: true,
    data: candidate,
    message: "Statut du candidat mis à jour avec succès"
  })
})

module.exports = {
  getAllCandidates,
  getCandidateDetails,
  downloadCV,
  getDashboardStats,
  updateCandidateStatus
}
