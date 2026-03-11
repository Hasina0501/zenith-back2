const express = require("express")
const router = express.Router()

// Pour accéder à la base de données
const questionController = require("../controllers/question.controller")

// Pour la validation des champs requis pour la création
const validateQuestion = require("../middlewares/question.middleware")

// Méthode pour la création d'une question
router.post("/create_question", validateQuestion, questionController.create)

// Méthode pour récupérer toutes les questions
router.get("/get_all_question", questionController.getAll)

// Méthode pour récupérer une seule question
router.get("/get_one_question/:id", questionController.getOne)

// Méthode pour la mise à jour d'une question
router.put("/update_question/:id", validateQuestion, questionController.update)

// Méthode pour supprimer une question
router.delete("/delete_question/:id", questionController.remove)

module.exports = router
