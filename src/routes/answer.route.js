const express = require("express")
const router = express.Router()

// Pour accéder à la base de données
const answerController = require("../controllers/answer.controller")

// Pour la validation des champs requis pour la création
const validateAnswer = require("../middlewares/answer.middleware")

//protection authentification
const auth = require("../middlewares/auth.middleware")


// Méthode pour la création d'une réponse
router.post("/create_answer", auth, validateAnswer, answerController.create)

// Méthode pour récupérer toutes les réponses
router.get("/get_all_answer", auth, answerController.getAll)

// Méthode pour récupérer une seule réponse
router.get("/get_one_answer/:id", auth, answerController.getOne)

// Méthode pour la mise à jour d'une réponse
router.put("/update_answer/:id", auth, validateAnswer, answerController.update)

// Méthode pour supprimer une réponse
router.delete("/delete_answer/:id", auth, answerController.remove)

module.exports = router
