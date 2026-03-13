const express = require("express")
const router = express.Router()

const dashboardController = require("../controllers/dashboard.controller")
const { validateStatusUpdate, validateQueryParams } = require("../middlewares/dashboard.middleware")
// protection login
const auth = require("../middlewares/auth.middleware")

// Routes pour la gestion du dashboard des candidats

// Liste complète des candidats avec pagination et filtres
router.get("/candidates", auth, validateQueryParams, dashboardController.getAllCandidates)

// Détails complets d'un candidat
router.get("/candidates/:id", auth, dashboardController.getCandidateDetails)

// Télécharger le CV d'un candidat
router.get("/candidates/:id/download-cv", auth, dashboardController.downloadCV)

// Statistiques du dashboard
router.get("/stats", auth, dashboardController.getDashboardStats)

// Mettre à jour le statut d'un candidat
router.put("/candidates/:id/status", auth, validateStatusUpdate, dashboardController.updateCandidateStatus)

module.exports = router
