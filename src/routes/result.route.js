const express = require("express")
const router = express.Router()

// Pour accéder à la base de données
const resultController = require("../controllers/result.controller")

// Pour la validation des champs requis pour la soumission
const validateResult = require("../middlewares/result.middleware")

// protection login
const auth = require("../middlewares/auth.middleware")


// Méthode pour la soumission d'un test
router.post("/submit_test", validateResult, resultController.submit)

// Méthode pour récupérer tous les résultats
router.get("/get_all_result", auth, resultController.getAll)

// Méthode pour récupérer un seul résultat
router.get("/get_one_result/:id", auth,resultController.getOne)

module.exports = router
