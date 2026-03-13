const express = require("express")
const router = express.Router()

// Pour accéder à la base de données
const answerController = require("../controllers/answer.controller")

// Pour la validation des champs requis pour la création
const validateAnswer = require("../middlewares/answer.middleware")

// Méthode pour la création d'une réponse
router.post("/create_answer", validateAnswer, answerController.create)

// Méthode pour récupérer toutes les réponses
router.get("/get_all_answer", answerController.getAll)

// Méthode pour récupérer une seule réponse
router.get("/get_one_answer/:id", answerController.getOne)

// Méthode pour la mise à jour d'une réponse
router.put("/update_answer/:id", validateAnswer, answerController.update)

// Méthode pour supprimer une réponse
router.delete("/delete_answer/:id", answerController.remove)

module.exports = router
